// services/ApprovalConfigurationService.ts

import ApprovalConfiguration from '../repository/approvalConfigRepository';
import User from '../../../../models/userModel';
import UserFunction from '../../userFunctionModule/repository/userFunctionRepository';
import { IApprover, IApprovalConfiguration } from '../repository/approvalConfigRepository';

class ApprovalConfigurationService {
  // Create a new approval configuration
  static async createApprovalConfiguration(userFunctionId: string, approvers: IApprover[]): Promise<IApprovalConfiguration> {
    const userFunction = await UserFunction.findById(userFunctionId);
    if (!userFunction) throw new Error('User function not found');
    
    // Validate approvers
    const levelCounts = new Array(6).fill(0);
    approvers.forEach(approver => {
      if (approver.level < 1 || approver.level > 6) {
        throw new Error('Approver level must be between 1 and 6');
      }
      levelCounts[approver.level - 1]++;
    });

    // If any level has more than the limit of approvers, throw error
    if (levelCounts.some(count => count > 1)) {
      throw new Error('Each level can have at most one approver');
    }

    // Create the approval configuration
    const approvalConfig = await ApprovalConfiguration.create({
      userFunction: userFunctionId,
      approvers,
    });

    return approvalConfig;
  }

  // Update an existing approval configuration by adding or removing approvers
  static async updateApprovalConfiguration(id: string, approvers: IApprover[]): Promise<IApprovalConfiguration> {
    const config = await ApprovalConfiguration.findById(id);
    if (!config) throw new Error('Approval configuration not found');
    
    // Validate approvers and their levels
    const levelCounts = new Array(6).fill(0);
    approvers.forEach(approver => {
      if (approver.level < 1 || approver.level > 6) {
        throw new Error('Approver level must be between 1 and 6');
      }
      levelCounts[approver.level - 1]++;
    });

    // Ensure each level has at most one approver
    if (levelCounts.some(count => count > 1)) {
      throw new Error('Each level can have at most one approver');
    }

    // Update the approval configuration
    config.approvers = approvers;
    await config.save();

    return config;
  }

  // Delete an approval configuration
  static async deleteApprovalConfiguration(id: string): Promise<boolean> {
    const config = await ApprovalConfiguration.findByIdAndDelete(id);
    if (!config) throw new Error('Approval configuration not found');
    
    return true;
  }

  // Add an approver to an existing approval configuration
  static async addApproverToConfiguration(id: string, approver: IApprover): Promise<IApprovalConfiguration> {
    const config = await ApprovalConfiguration.findById(id);
    if (!config) throw new Error('Approval configuration not found');
    
    if (approver.level < 1 || approver.level > 6) {
      throw new Error('Approver level must be between 1 and 6');
    }

    // Ensure there is no duplicate approver at the same level
    const existingApprover = config.approvers.find(
      (a) => a.level === approver.level && a.user.toString() === approver.user.toString()
    );
    if (existingApprover) {
      throw new Error('Approver already exists at this level');
    }

    config.approvers.push(approver);
    await config.save();

    return config;
  }

  // Remove an approver from an approval configuration
  static async removeApproverFromConfiguration(id: string, approverId: string): Promise<IApprovalConfiguration> {
    const config = await ApprovalConfiguration.findById(id);
    if (!config) throw new Error('Approval configuration not found');
    
    config.approvers = config.approvers.filter(
      (a) => a.user.toString() !== approverId
    );

    await config.save();

    return config;
  }
}

export default ApprovalConfigurationService;
