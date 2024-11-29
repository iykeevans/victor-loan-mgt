// modules/category/repositories/categoryRepository.ts
import Category, { ICategory } from './categoryRepository';
export class CategoryRepository {
  // Create a new Category
  async create(categoryData: Partial<ICategory>) {
    const category = new Category(categoryData);
    return await category.save();
  }

  // Get all Categories by Workspace ID
  async getAllByWorkspace(workspaceId: string) {
    return await Category.find({ workspaceId }).exec();
  }

  // Get Category by ID
  async getById(id: string) {
    return await Category.findById(id).exec();
  }

  // Update Category
  async update(id: string, updateData: Partial<ICategory>) {
    return await Category.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  // Delete Category
  async delete(id: string) {
    return await Category.findByIdAndDelete(id).exec();
  }
}

export default new CategoryRepository();
