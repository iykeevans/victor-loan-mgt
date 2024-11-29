// modules/userFunction/routes/userFunctionRoutes.ts
import express from 'express';
import UserFunctionController from '../controllers/userFunctionController';

const router = express.Router();

// Routes for User Function
router.post('/', UserFunctionController.create); // Create User Function
router.get('/:workspaceId', UserFunctionController.getAll); // Get all User Functions by Workspace
router.get('/:id', UserFunctionController.getById); // Get User Function by ID
router.put('/:id', UserFunctionController.update); // Update User Function
router.delete('/:id', UserFunctionController.delete); // Delete User Function

export default router;
