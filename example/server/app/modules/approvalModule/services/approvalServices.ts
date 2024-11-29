// services/approvalService.ts

import ApprovalRequest from '../repository/approvalRepository';
import { getUserFunctionRoles , getUserRolePermissions } from '../../../../controllers/roleController'; // Assume this is a helper to get user roles and permissions
import { Request, Response } from 'express';
const APPROVAL_REQUEST_PERMISSION = 'can_request_approval'
class ApprovalService {
  // Check if user can request approval based on their role and permissions
  async canRequestApproval(userId: string, userFunctionId: string): Promise<any>{
    const permissions = await getUserRolePermissions(userId); // Check if user has permission to request

    if(!permissions){
      return false
    }
    const userRoleByFunction =  await getUserFunctionRoles(userId, userFunctionId)
    if(!userRoleByFunction){
      return false
    }
    const canRequestAproval = permissions.includes(APPROVAL_REQUEST_PERMISSION)  && userRoleByFunction 
    return canRequestAproval

  }
   async  getAllApprovals(req: Request, res: Response): Promise<any>{
  
      const success  = await ApprovalRequest.find()
      if (!success) throw new Error('No Records found');
      return success;
    
   }

   async getApprovalById(req: Request, res: Response): Promise<any>{
    const { id } = req.params;

    const success = await ApprovalRequest.findById(id)
    if (!success) throw new Error('Record not found');
    return success;
    
   }
  // Create a new approval request
  async createApprovalRequest(userId: string, userFunctionId: string, 
    requestUrl: string, payload: any, approvers: string[]): Promise<any> {
    const approvalRequest = new ApprovalRequest({
      requestUrl,
      payload,
      initiatorId: userId,
      userFunctionId,
      approvers: approvers.map((approver) => ({
        approverId: approver,
        status: 'pending',
      })),
      totalLevels: approvers.length,
    });

    await approvalRequest.save();
    return approvalRequest;
  }

  // Handle approval decision
  async handleApprovalDecision(requestId: string, approverId: string, action: 'approve' | 'reject', comment: string): Promise<any> {
    const approvalRequest = await ApprovalRequest.findById(requestId);
    if (!approvalRequest) throw new Error('Approval request not found');

    if (approvalRequest.status === 'cancelled') throw new Error('Request has been cancelled');

    const currentApprover = approvalRequest.approvers[approvalRequest.currentLevel];
    if (currentApprover.approverId !== approverId) throw new Error('It is not your turn to approve this request');

    if (action === 'approve') {
      currentApprover.status = 'approved';
      currentApprover.approvedAt = new Date();
    } else {
      currentApprover.status = 'rejected';
    }

    // Move to next approver
    if (approvalRequest.currentLevel + 1 < approvalRequest.totalLevels) {
      approvalRequest.currentLevel++;
      approvalRequest.status = 'awaiting_next_approver';
    } else {
      approvalRequest.status = action === 'approve' ? 'approved' : 'rejected';
      this.executeRequest(approvalRequest);
    }

    approvalRequest.save();
    return approvalRequest;
  }

  // Execute request after all approvals are complete
  async executeRequest(approvalRequest: any): Promise<void> {
    if (approvalRequest.status === 'approved') {
      // Call the saved URL and payload to execute the action
      // For example, we can make a HTTP request to the stored requestUrl here
      // Example: await makeApiCall(approvalRequest.requestUrl, approvalRequest.payload);
    }
  }

  // Cancel the request by the initiator if no approval has been made
  async cancelRequest(requestId: string, userId: string): Promise<any> {
    const approvalRequest = await ApprovalRequest.findById(requestId);
    if (!approvalRequest) throw new Error('Approval request not found');

    if (approvalRequest.initiatorId !== userId) throw new Error('You are not authorized to cancel this request');

    if (approvalRequest.approvers.some((approver) => approver.status !== 'pending')) {
      throw new Error('Cannot cancel request, as approval has already been made');
    }

    approvalRequest.status = 'cancelled';
    await approvalRequest.save();
    return approvalRequest;
  }
}

export default new ApprovalService();
