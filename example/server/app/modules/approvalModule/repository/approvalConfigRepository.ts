// models/ApprovalConfiguration.ts

import { Schema, model, Document } from 'mongoose';
import { IUserFunction } from '../../userFunctionModule/repository/userFunctionRepository';  // Reference to the UserFunction model

export interface IApprover {
  user: Schema.Types.ObjectId;  // Reference to the User 
  level: number;  // Level of the approver, 1-6
}

export interface IApprovalConfiguration extends Document {
  userFunction: IUserFunction['_id'];  // Reference to the UserFunction
  approvers: IApprover[];  // List of approvers and their levels
}

const approverSchema = new Schema<IApprover>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  level: { type: Number, required: true, min: 1, max: 6 },  // Ensure levels are between 1-6
});

const approvalConfigSchema = new Schema<IApprovalConfiguration>({
  userFunction: { type: Schema.Types.ObjectId, ref: 'UserFunction', required: true },
  approvers: [approverSchema],  // List of approvers
});

const ApprovalConfiguration = model<IApprovalConfiguration>('ApprovalConfiguration', approvalConfigSchema);

export default ApprovalConfiguration;
