// src/models/Role.ts
import mongoose, { Document, Schema } from 'mongoose';

// every work space can create their roles eg HR, Superadmin, finance,marketting, growth etc

export interface IRole extends Document {
  name: string;
  permissions: string[];  // Array of permission IDs
  workspaceId:mongoose.Schema.Types.ObjectId;  // The workspace this role belongs to
}

const roleSchema = new Schema<IRole>({
  name: { type: String, required: true, unique: true },
  permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }],
  workspaceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true },
});

const Role = mongoose.model<IRole>('Role', roleSchema);

export default Role;
