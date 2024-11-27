// src/controllers/roleController.ts
import { Request, Response } from 'express';
import {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
} from '../services/roleBaseAccessService';


import User from '../models/userModel';
import Role from '../models/roleModel';
import Permission from '../models/permissionModel';

// Create a new role
export const createRoleController = async (req: Request, res: Response) => {
  try {
    const { workspaceId, name, permissions } = req.body;
    const role = await createRole(workspaceId, name, permissions);
    res.status(201).json(role);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// Get all roles for a workspace
export const getAllRolesController = async (req: Request, res: Response) => {
  try {
    const workspaceId = req.params.workspaceId;
    const roles = await getAllRoles(workspaceId);
    res.status(200).json(roles);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// Get a role by ID
export const getRoleByIdController = async (req: Request, res: Response) => {
  try {
    const roleId = req.params.roleId;
    const role = await getRoleById(roleId);
    res.status(200).json(role);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// Update a role
export const updateRoleController = async (req: Request, res: Response) => {
  try {
    const roleId = req.params.roleId;
    const { name, permissions } = req.body;
    const role = await updateRole(roleId, name, permissions);
    res.status(200).json(role);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a role
export const deleteRoleController = async (req: Request, res: Response) => {
  try {
    const roleId = req.params.roleId;
    const result = await deleteRole(roleId);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};



// services/PermissionService.ts


export const getUserRolePermissions = async (userId: string) => {
  try {
    // Step 1: Find the user
    const user = await User.findById(userId).populate('role');
    if (!user) {
      throw new Error('User not found');
    }

    // Step 2: Get the role of the user
    const role = user.role;

    // Step 3: Get all permissions associated with the role
    const permissions = await Permission.find({ '_id': { $in: role.permissions } });

    // Step 4: Return the permissions
    return permissions.map(permission => permission.name); // Returns a list of permission names
  } catch (error: any) {
    throw new Error('Error retrieving user permissions: ' + error.message);
  }
};
