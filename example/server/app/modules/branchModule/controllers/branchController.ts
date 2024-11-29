// modules/companyBranch/controllers/branchController.ts
import { Request, Response } from 'express';
import branchService from '../services/branchService';

const branchController = {
  createBranch: async (req: Request, res: Response) => {
    try {
      const { name, location, workspaceId } = req.body;
      const branch = await branchService.createBranch(name, location, workspaceId);
      res.status(201).json({ branch });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  getAllBranches: async (req: Request, res: Response) => {
    try {
      const { workspaceId } = req.params;
      const branches = await branchService.getAllBranches(workspaceId);
      res.status(200).json({ branches });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  getBranchById: async (req: Request, res: Response) => {
    try {
      const { branchId } = req.params;
      const branch = await branchService.getBranchById(branchId);
      res.status(200).json({ branch });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  updateBranch: async (req: Request, res: Response) => {
    try {
      const { branchId } = req.params;
      const { name, location } = req.body;
      const updatedBranch = await branchService.updateBranch(branchId, name, location);
      res.status(200).json({ updatedBranch });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteBranch: async (req: Request, res: Response) => {
    try {
      const { branchId } = req.params;
      const deletedBranch = await branchService.deleteBranch(branchId);
      res.status(200).json({ deletedBranch });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
};

export default branchController;
