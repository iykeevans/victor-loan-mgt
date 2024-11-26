// src/models/UserRoleAssignment.ts
import mongoose from 'mongoose';

// subscribbed user role
const userRoleAssignmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  workspaceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true },
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
});

const UserRoleAssignment = mongoose.model('UserRoleAssignment', userRoleAssignmentSchema);

export default UserRoleAssignment;
