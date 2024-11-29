// src/routes/permissionRoutes.ts
import express from 'express';
import {
  createPermissionController,
  getAllPermissionsController,
  getPermissionByIdController,
  updatePermissionController,
  deletePermissionController,
} from '../controllers/permissionController';
import {
  createRoleController,
  getAllRolesController,
  getRoleByIdController,
  updateRoleController,
  deleteRoleController,
} from '../controllers/roleController';
import { assignRoleToUserWithOutWorkSpaceId, getUserDetails } from '../services/roleBaseAccessService';
import { ensureAuthenticated,hasPermission } from '../middlewares/authMiddleware';  // Assuming we already have authentication middleware

const router = express.Router();

// Create a new role saas based app
router.post('/workspaces/:workspaceId/roles', ensureAuthenticated, createRoleController);
router.get('/workspaces/:workspaceId/roles', ensureAuthenticated, getAllRolesController);
router.get('/roles/:roleId', ensureAuthenticated, getRoleByIdController);
router.put('/roles/:roleId', ensureAuthenticated, updateRoleController);
router.delete('/roles/:roleId', ensureAuthenticated, deleteRoleController);
// Middleware for ensuring the user is authenticated and authorized
router.post('/permissions', ensureAuthenticated, createPermissionController); // Create permission
router.get('/permissions', ensureAuthenticated, getAllPermissionsController); // Get all permissions
router.get('/permissions/:permissionId', ensureAuthenticated, getPermissionByIdController); // Get permission by ID
router.put('/permissions/:permissionId', ensureAuthenticated, updatePermissionController); // Update permission
router.delete('/permissions/:permissionId', ensureAuthenticated, deletePermissionController); // Delete permission

// Assign a role to a user
router.post('/users/:userId/roles/:roleId',ensureAuthenticated,  async (req, res) => {
  try {
    const user = await assignRoleToUserWithOutWorkSpaceId(req.params.userId, req.params.roleId);
    res.status(200).json(user);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// Example route that requires a specific permission
router.get('/users/:userId/details',ensureAuthenticated,  hasPermission('view_user_details'), async (req, res) => {
  try {
    const user = await getUserDetails(req.params.userId);
    res.status(200).json(user);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});
export default router;
