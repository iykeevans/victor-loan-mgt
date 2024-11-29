// modules/companyBranch/repositories/branchRepository.ts
import mongoose, { Schema, Document } from 'mongoose';
import { Workspace } from '../../../../models/workSpaceModel'; // Assuming you have a Workspace model

interface IBranch extends Document {
  name: string;
  location: string;
  code: string;
  workspaceId: Workspace['_id'];
  createdAt: Date;
  updatedAt: Date;
}

const branchSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    code: { type: String, required: true },
    workspaceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true },
  },
  { timestamps: true }
);

const BranchModel = mongoose.model<IBranch>('Branch', branchSchema);

export default BranchModel;
