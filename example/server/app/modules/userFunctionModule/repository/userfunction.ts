// modules/userFunction/repositories/userFunctionRepository.ts
import UserFunction, { IUserFunction } from './userFunctionRepository';

export class UserFunctionRepository {
  // Create a new User Function
  async create(userFunctionData: Partial<IUserFunction>) {
    const userFunction = new UserFunction(userFunctionData);
    return await userFunction.save();
  }

  // Get all User Functions by Workspace ID
  async getAllByWorkspace(workspaceId: string) {
    return await UserFunction.find({ workspaceId }).exec();
  }

  // Get User Function by ID
  async getById(id: string) {
    return await UserFunction.findById(id).exec();
  }

  // Update User Function
  async update(id: string, updateData: Partial<IUserFunction>) {
    return await UserFunction.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  // Delete User Function
  async delete(id: string) {
    return await UserFunction.findByIdAndDelete(id).exec();
  }
}

export default new UserFunctionRepository();
