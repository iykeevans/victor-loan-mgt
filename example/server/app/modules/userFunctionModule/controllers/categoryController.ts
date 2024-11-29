// modules/category/controllers/categoryController.ts
import { Request, Response } from 'express';
import CategoryService from '../services/categoryService';

class CategoryController {
  // Create a new Category
  async create(req: Request, res: Response):Promise<any> {
    try {
      const categoryData = req.body;
      const category = await CategoryService.create(categoryData);
      res.status(201).json(category);
    } catch (error : any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get all Categories by Workspace ID
  async getAll(req: Request, res: Response):Promise<any> {
    try {
      const { workspaceId } = req.params;
      const categories = await CategoryService.getAll(workspaceId);
      res.status(200).json(categories);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get Category by ID
  async getById(req: Request, res: Response):Promise<any> {
    try {
      const { id } = req.params;
      const category = await CategoryService.getById(id);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      res.status(200).json(category);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update Category
  async update(req: Request, res: Response):Promise<any> {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedCategory = await CategoryService.update(id, updateData);
      res.status(200).json(updatedCategory);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Delete Category
  async delete(req: Request, res: Response) :Promise<any>{
    try {
      const { id } = req.params;
      await CategoryService.delete(id);
      res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new CategoryController();
