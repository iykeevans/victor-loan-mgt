// controllers/approvalController.ts

import { Request, Response } from 'express';
import ApprovalService from '../services/approvalServices';
import ApprovalConfigurationService from '../services/approvalConfigServices';
import { IApprover } from '../repository/approvalConfigRepository';

class ApprovalConfigurationController {
  // Request approval for a new record
  async createApprovalConfiguration(req: Request, res: Response):Promise<any> {
    try {
      const { userFunctionId, approvers }: { userFunctionId: string, approvers: IApprover[] } = req.body;
      const approvalConfig = await ApprovalConfigurationService.createApprovalConfiguration(userFunctionId, approvers);
      res.status(201).json(approvalConfig);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Handle approval decision
  async handleUpdateApprovalConfig(req: Request, res: Response):Promise<any> {
    try {
      const { approvers }: { approvers: IApprover[] } = req.body;
      const updatedConfig = await ApprovalConfigurationService.updateApprovalConfiguration(req.params.id, approvers);
      res.status(200).json(updatedConfig);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Cancel the approval request
  async addApproverToConfiguration(req: Request, res: Response) :Promise<any>{
    try {
      const { approver }: { approver: IApprover } = req.body;
      const updatedConfig = await ApprovalConfigurationService.addApproverToConfiguration(req.params.id, approver);
      res.status(200).json(updatedConfig);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }


  // Retrieve all approval requests
  removeApproverFromConfiguration = async (req: Request, res: Response):Promise<any> => {
  try {
    const updatedConfig = await ApprovalConfigurationService.removeApproverFromConfiguration(req.params.id, req.params.approverId);
    res.status(200).json(updatedConfig);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
  };
  
  // Retrieve a single approval request by ID
  deleteApprovalConfiguration = async (req: Request, res: Response):Promise<any> => {
    
  try {
    const success = await ApprovalConfigurationService.deleteApprovalConfiguration(req.params.id);
    res.status(200).json({ success });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
  };
}

export default new ApprovalConfigurationController();
