// modules/category/routes/categoryRoutes.ts
import express from 'express';
import CategoryController from '../controllers/categoryController';

const router = express.Router();

// Routes for Category
router.post('/', CategoryController.create); // Create Category
router.get('/:workspaceId', CategoryController.getAll); // Get all Categories by Workspace
router.get('/:id', CategoryController.getById); // Get Category by ID
router.put('/:id', CategoryController.update); // Update Category
router.delete('/:id', CategoryController.delete); // Delete Category

export default router;
