// src/services/permissionService.ts
import Permission from '../models/permissionModel';

// Create a new permission
export const createPermission = async (name: string, description: string) => {
  const existingPermission = await Permission.findOne({ name });
  if (existingPermission) {
    throw new Error('Permission already exists');
  }

  const permission = new Permission({ name, description });
  await permission.save();
  return permission;
};

// Get all permissions
export const getAllPermissions = async () => {
  return Permission.find();
};

// Get a permission by ID
export const getPermissionById = async (permissionId: string) => {
  const permission = await Permission.findById(permissionId);
  if (!permission) {
    throw new Error('Permission not found');
  }
  return permission;
};

// Update a permission
export const updatePermission = async (permissionId: string, name: string, description: string) => {
  const permission = await Permission.findById(permissionId);
  if (!permission) {
    throw new Error('Permission not found');
  }

  permission.name = name;
  permission.description = description;
  await permission.save();
  return permission;
};

// Delete a permission
export const deletePermission = async (permissionId: string) => {
  const permission = await Permission.findByIdAndDelete(permissionId);
  if (!permission) {
    throw new Error('Permission not found');
  }

 
  return { success: true, message: 'Permission deleted successfully' };
};
