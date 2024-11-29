// models/ApprovalRequest.ts

import { Schema, model, Document } from 'mongoose';

interface IApprovalRequest extends Document {
  requestUrl: string;
  payload: any;
  initiatorId: string;
  userFunctionId: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled' | 'awaiting_next_approver';
  approvers: Array<{
    approverId: string;
    status: 'pending' | 'approved' | 'rejected';
    approvedAt?: Date;
    comment?: string;
  }>;
  currentLevel: number;
  totalLevels: number;
}

const approvalRequestSchema = new Schema<IApprovalRequest>(
  {
    requestUrl: { type: String, required: true },
    payload: { type: Object, required: true },
    initiatorId: { type: String, required: true },
    userFunctionId: { type: String, required: true },
    status: { type: String, default: 'pending' },
    approvers: [
      {
        approverId: { type: String, required: true },
        status: { type: String, default: 'pending' },
        approvedAt: { type: Date },
        comment: { type: String },
      },
    ],
    currentLevel: { type: Number, default: 0 },
    totalLevels: { type: Number, required: true },
  },
  { timestamps: true }
);

const ApprovalRequest = model<IApprovalRequest>('ApprovalRequest', approvalRequestSchema);
export default ApprovalRequest;












