// modules/category/services/categoryService.ts
import CategoryRepository from '../repository/category';
import { ICategory } from '../repository/categoryRepository';

class CategoryService {
  // Create a new Category
  async create(categoryData: Partial<ICategory>) {
    return await CategoryRepository.create(categoryData);
  }

  // Get all Categories by Workspace
  async getAll(workspaceId: string) {
    return await CategoryRepository.getAllByWorkspace(workspaceId);
  }

  // Get Category by ID
  async getById(id: string) {
    return await CategoryRepository.getById(id);
  }

  // Update Category
  async update(id: string, updateData: Partial<ICategory>) {
    return await CategoryRepository.update(id, updateData);
  }

  // Delete Category
  async delete(id: string) {
    return await CategoryRepository.delete(id);
  }
}

export default new CategoryService();
