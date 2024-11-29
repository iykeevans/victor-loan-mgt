// modules/userFunction/controllers/userFunctionController.ts
import { Request, Response } from 'express';
import UserFunctionService from '../services/userFunctionService';

class UserFunctionController {
  // Create a new User Function
  async create(req: Request, res: Response):Promise<any> {
    try {
      const userFunctionData = req.body;
      const userFunction = await UserFunctionService.create(userFunctionData);
      res.status(201).json(userFunction);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get all User Functions by Workspace ID
  async getAll(req: Request, res: Response):Promise<any> {
    try {
      const { workspaceId } = req.params;
      const userFunctions = await UserFunctionService.getAll(workspaceId);
      res.status(200).json(userFunctions);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get User Function by ID
  async getById(req: Request, res: Response) :Promise<any>{
    try {
      const { id } = req.params;
      const userFunction = await UserFunctionService.getById(id);
      if (!userFunction) {
        return res.status(404).json({ error: 'User Function not found' });
      }
      res.status(200).json(userFunction);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update User Function
  async update(req: Request, res: Response):Promise<any> {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedUserFunction = await UserFunctionService.update(id, updateData);
      res.status(200).json(updatedUserFunction);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Delete User Function
  async delete(req: Request, res: Response) :Promise<any>{
    try {
      const { id } = req.params;
      await UserFunctionService.delete(id);
      res.status(200).json({ message: 'User Function deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new UserFunctionController();
