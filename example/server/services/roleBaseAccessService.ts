// src/services/rbacService.ts
import Workspace from '../models/workSpaceModel';
import Role from '../models/roleModel';
import Permission from '../models/permissionModel';
import UserRoleAssignment from '../models/userRoleAssignments';
import User from "../models/userModel"

// Check if the user has a specific permission in the workspace
export const hasPermission = async (userId: string, workspaceId: string, permissionName: string) => {
  const userRoleAssignment = await UserRoleAssignment.findOne({ userId, workspaceId }).populate('roleId').exec();
  if (!userRoleAssignment) throw new Error('User does not have a role in this workspace');

  const roleId = userRoleAssignment.roleId;

  const role = await Role.findById(roleId).populate('permissions');
  if (!role) {
    throw new Error('Role not found');
  }

  const permissions = role.permissions.map((perm: any) => perm.name);

  return permissions.includes(permissionName);
};

// Check if a user has permission for a specific action in the workspace
export const checkPermission = async (userId: string, workspaceId: string, permissionName: string) => {
  const hasPerm = await hasPermission(userId, workspaceId, permissionName);
  if (!hasPerm) {
    throw new Error('Permission denied');
  }
  return true;
};

// Assign a new role to a user in a workspace
export const assignRoleToUser = async (userId: string, workspaceId: string, roleId: string) => {
  const userRoleAssignment = new UserRoleAssignment({
    userId,
    workspaceId,
    roleId,
  });
  await userRoleAssignment.save();
  return userRoleAssignment;
};



// Assign a role to a user
export const assignRoleToUserWithOutWorkSpaceId = async (userId: string, roleId: any) => {
  const user = await User.findById(userId).exec();
  if (!user) throw new Error('User not found');

  const role = await Role.findById(roleId).exec();
  if (!role) throw new Error('Role not found');

  // Add role to user (avoid duplicates)
  if (!user.roles.includes(roleId)) {
    user.roles.push(roleId);
  }

  // Update the user's permissions based on the roles
  await user.assignPermissions();  // This method will update the permissions array

  await user.save();
  return user;
};

// Example: Fetching a user's roles and permissions
export const getUserDetails = async (userId: string) => {
  const user = await User.findById(userId).populate('roles').exec();
  if (!user) throw new Error('User not found');

  // Assign permissions dynamically (if not already done)
  if (!user.permissions.length) {
    await user.assignPermissions();
  }

  return user;
};



// Create a new role
export const createRole = async (workspaceId: string, name: string, permissions: string[]) => {
  const existingRole = await Role.findOne({ name, workspaceId });
  if (existingRole) {
    throw new Error('Role already exists in this workspace');
  }

  const role = new Role({
    name,
    permissions,
    workspaceId,
  });

  await role.save();
  return role;
};

// Get all roles for a workspace
export const getAllRoles = async (workspaceId: string) => {
  return Role.find({ workspaceId });
};

// Get a role by ID
export const getRoleById = async (roleId: string) => {
  const role = await Role.findById(roleId).populate('permissions');
  if (!role) {
    throw new Error('Role not found');
  }
  return role;
};

// Update a role's details
export const updateRole = async (roleId: string, name: string, permissions: string[]) => {
  const role = await Role.findById(roleId);
  if (!role) {
    throw new Error('Role not found');
  }

  role.name = name;
  role.permissions = permissions;
  await role.save();
  return role;
};

// Delete a role
export const deleteRole = async (roleId: string) => {
  const role = await Role.findById(roleId);
  if (!role) {
    throw new Error('Role not found');
  }

  await role.remove();
  return { success: true, message: 'Role deleted successfully' };
};
