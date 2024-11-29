// models/userFunctionModel.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IUserFunction extends Document {
  name: string;
  description: string;
  workspaceId: mongoose.Types.ObjectId;
  categoryId: mongoose.Types.ObjectId;
  roles: string[];  // List of role IDs to which this function applies
}

const userFunctionSchema = new Schema<IUserFunction>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  workspaceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  roles: [{ type: String }]  // Array of role IDs
}, { timestamps: true });

const UserFunction = mongoose.model<IUserFunction>('UserFunction', userFunctionSchema);







export default UserFunction;
