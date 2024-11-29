// controllers/approvalController.ts

import { Request, Response } from 'express';
import ApprovalService from '../services/approvalServices';

class ApprovalController {
  // Request approval for a new record
  async requestApproval(req: Request, res: Response):Promise<any> {
    const { userId, userFunctionId, requestUrl, payload, approvers } = req.body;

    const canRequestApproval = await ApprovalService.canRequestApproval(userId, userFunctionId);
    if (!canRequestApproval) {
      return res.status(403).json({ message: 'You do not have permission to request approval' });
    }

    const approvalRequest = await ApprovalService.createApprovalRequest(userId, userFunctionId, requestUrl, payload, approvers);
    return res.status(201).json(approvalRequest);
  }

  // Handle approval decision
  async handleApproval(req: Request, res: Response):Promise<any> {
    const { requestId, approverId, action, comment } = req.body;

    try {
      const approvalRequest = await ApprovalService.handleApprovalDecision(requestId, approverId, action, comment);
      return res.status(200).json(approvalRequest);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  // Cancel the approval request
  async cancelRequest(req: Request, res: Response) :Promise<any>{
    const { requestId, userId } = req.body;

    try {
      const approvalRequest = await ApprovalService.cancelRequest(requestId, userId);
      return res.status(200).json(approvalRequest);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }


  // Retrieve all approval requests
 getApprovalRequests = async (req: Request, res: Response):Promise<any> => {
    try {
      const approvalRequests = await ApprovalService.getAllApprovals(req, res);
      res.status(200).json(approvalRequests);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching approval requests.', error });
    }
  };
  
  // Retrieve a single approval request by ID
    getApprovalRequestById = async (req: Request, res: Response):Promise<any> => {
   
  
    try {
      const approvalRequest = await ApprovalService.getApprovalById(req, res);
      if (!approvalRequest) {
        return res.status(404).json({ message: 'Approval request not found.' });
      }
      res.status(200).json(approvalRequest);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching approval request.', error });
    }
  };
}

export default new ApprovalController();
