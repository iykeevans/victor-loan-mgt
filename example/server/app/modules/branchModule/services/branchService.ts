// modules/companyBranch/services/branchService.ts
import BranchModel from '../repository/branchRepository';
import { Workspace } from '../../../../models/workSpaceModel'; // Assuming you have a Workspace model

const branchService : any= {
  createBranch: async (name: string, location: string, workspaceId: Workspace['_id']) => {
    const branch = new BranchModel({ name, location, workspaceId });
    await branch.save();
    return branch;
  },

  getAllBranches: async (workspaceId: Workspace['_id']) => {
    const branches = await BranchModel.find({ workspaceId });
    return branches;
  },

  getBranchById: async (branchId: string) => {
    const branch = await BranchModel.findById(branchId).exec();
    if (!branch) throw new Error('Branch not found');
    return branch;
  },

  updateBranch: async (branchId: string, name: string, location: string) => {
    const branch = await BranchModel.findByIdAndUpdate(
      branchId,
      { name, location },
      { new: true }
    );
    if (!branch) throw new Error('Branch not found');
    return branch;
  },

  deleteBranch: async (branchId: string) => {
    const branch = await BranchModel.findByIdAndDelete(branchId);
    if (!branch) throw new Error('Branch not found');
    return branch;
  }
};

export default branchService;
