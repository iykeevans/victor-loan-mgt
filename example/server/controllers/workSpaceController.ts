// src/controllers/workspaceController.ts

import { Request, Response } from 'express';
import * as workspaceService from '../services/workspaceService';
import User from '../models/userModel';
import Plan from '../models/planModel';
import workSpaceModel from '../models/workSpaceModel';
import { IRequestUser } from '../middlewares/authMiddleware';

export const createWorkspace = async (req: Request & IRequestUser, res: Response) :Promise<any> => {
  const { name } = req.body;
  const { userId, planId } = req.user; // Assuming userId is set from authentication middleware

  const user = await User.findById(userId);
  const plan : any  = await Plan.findById(planId);

  if (!user || !plan) {
 
      res.status(400).json({ error: 'User or Plan not found' });
      
  }


    // Find all workspaces created by the user and check if it exceeds the plan's maxWorkspaces
    const userWorkspaces = await workSpaceModel.find({ users: userId, plan: planId });

    if (userWorkspaces.length >= plan?.maxWorkspaces) {
        throw new Error();
        res.status(400).json({ error: `Cannot create more workspaces. The limit of ${plan.maxWorkspaces} has been reached.` });  
      
      }


  try {
    const workspace = await workspaceService.createWorkspace(userId, planId, name);
    res.status(201).json(workspace);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const inviteToWorkspace = async (req: Request & IRequestUser, res: Response) :Promise<any> => {
  const { inviteeEmail, workspaceId } = req.body;
  const { userId } = req.user; // Assuming userId is set from authentication middleware

  try {
    const result = await workspaceService.inviteToWorkspace(userId, inviteeEmail, workspaceId);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const acceptInvite = async (req: Request & IRequestUser, res: Response) :Promise<any> => {
  const { workspaceId } = req.params;
  const { userId } = req.user; // Assuming userId is set from authentication middleware

  try {
    const result = await workspaceService.acceptInvite(userId, workspaceId);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const assignRole = async (req: Request & IRequestUser, res: Response) :Promise<any> => {
  const { userId, role } = req.body;
  const { workspaceId } = req.params;
  const { adminId } = req.user; // Assuming adminId is set from authentication middleware

  try {
    const result = await workspaceService.assignRole(adminId, userId, workspaceId, role);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const removeMember = async (req: Request & IRequestUser, res: Response):Promise<any>  => {
  const { userId } = req.params;
  const { workspaceId } = req.params;
  const { adminId } = req.user; // Assuming adminId is set from authentication middleware

  try {
    const result = await workspaceService.removeMember(adminId, userId, workspaceId);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};



export const createCustomRoleController = async (req: Request, res: Response) :Promise<any> => {
  try {
    const { adminId, workspaceId, roleName, permissions } = req.body;
    const result = await workspaceService.createCustomRole(adminId, workspaceId, roleName, permissions);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};