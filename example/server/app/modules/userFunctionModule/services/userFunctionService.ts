// modules/userFunction/services/userFunctionService.ts
import  UserFunctionRepository  from '../repository/userfunction';
import { IUserFunction } from '../repository/userFunctionRepository';

class UserFunctionService {
  // Create a new User Function
  async create(userFunctionData: Partial<IUserFunction>) {
    return await UserFunctionRepository.create(userFunctionData);
  }

  // Get all User Functions by Workspace
  async getAll(workspaceId: string) {
    return await UserFunctionRepository.getAllByWorkspace(workspaceId);
  }

  // Get User Function by ID
  async getById(id: string) {
    return await UserFunctionRepository.getById(id);
  }

  // Update User Function
  async update(id: string, updateData: Partial<IUserFunction>) {
    return await UserFunctionRepository.update(id, updateData);
  }

  // Delete User Function
  async delete(id: string) {
    return await UserFunctionRepository.delete(id);
  }
}

export default new UserFunctionService();
