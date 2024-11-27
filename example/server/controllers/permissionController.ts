// src/controllers/permissionController.ts
import { Request, Response } from 'express';
import {
  createPermission,
  getAllPermissions,
  getPermissionById,
  updatePermission,
  deletePermission,
} from '../services/permissionService';

// Create a new permission
export const createPermissionController = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const permission = await createPermission(name, description);
    res.status(201).json(permission);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// Get all permissions
export const getAllPermissionsController = async (req: Request, res: Response) => {
  try {
    const permissions = await getAllPermissions();
    res.status(200).json(permissions);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// Get permission by ID
export const getPermissionByIdController = async (req: Request, res: Response) => {
  try {
    const { permissionId } = req.params;
    const permission = await getPermissionById(permissionId);
    res.status(200).json(permission);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// Update a permission
export const updatePermissionController = async (req: Request, res: Response) => {
  try {
    const { permissionId } = req.params;
    const { name, description } = req.body;
    const permission = await updatePermission(permissionId, name, description);
    res.status(200).json(permission);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a permission
export const deletePermissionController = async (req: Request, res: Response) => {
  try {
    const { permissionId } = req.params;
    const result = await deletePermission(permissionId);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
