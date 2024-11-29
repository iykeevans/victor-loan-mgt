import { Request, Response } from 'express';
import UserPlan from '../models/userPlan';



import { createPlan, getPlan, updatePlan, deletePlan } from '../services/planService';
import * as UserPlanService from "../services/planService"
export const createPlanController = async (req: Request, res: Response) :Promise<any>=> {
  try {
    const { userId, name, description, maxLimit, frequency, cost, status } = req.body;
    const newPlan = await createPlan({ name, description, maxLimit, frequency, cost, status });
    res.status(201).json(newPlan);
  } catch (error :any) {
    res.status(400).json({ message: error.message });
  }
};

export const getPlanController = async (req: Request, res: Response) :Promise<any>=> {
  try {
    const { planId } = req.params;
    const plan = await getPlan(planId);
    res.status(200).json(plan);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const updatePlanController = async (req: Request, res: Response):Promise<any> => {
  try {
    const { planId } = req.params;
    const updatedData = req.body;
    const updatedPlan = await updatePlan(planId, updatedData);
    res.status(200).json(updatedPlan);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePlanController = async (req: Request, res: Response):Promise<any> => {
  try {
    const { planId } = req.params;
    const result = await deletePlan(planId);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Create a new user plan
export const createUserPlan = async (req: Request, res: Response):Promise<any> => {
  try {
    const { userId, planId, rateLimit, frequency } = req.body;

    // Check if the plan exists

    const userPlan = await UserPlanService.createUserPlanService(
        userId,
        planId,
        rateLimit,
        frequency,
       
      )

      if (!userPlan) {
        return res.status(404).json({ message: 'User plan not found' });
      } 
      res.status(200).json(userPlan);

  } catch (error) {
    res.status(500).json({ message: 'Error creating user plan', error });
  }
};

// Get user plan by userId
export const getUserPlan = async (req: Request, res: Response) :Promise<any>=> {
  try {
    const { userId } = req.params;
    const userPlan = await UserPlanService. getUserPlanService(userId)


    if (!userPlan) {
      return res.status(404).json({ message: 'User plan not found' });
    }

    res.status(200).json(userPlan);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user plan', error });
  }
};

// Update user plan
export const updateUserPlan = async (req: Request, res: Response):Promise<any> => {
  try {
    const { userId } = req.params;
    const { planId, rateLimit, frequency, status } = req.body;

    // Find the user plan to update
    const userPlan = 
    await UserPlanService.updateUserPlanService(userId, { planId, rateLimit, frequency, status } )

    if (!userPlan) {
      return res.status(404).json({ message: 'User plan not found' });
    }


    res.status(200).json(userPlan);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user plan', error });
  }
};

// Delete user plan
export const deleteUserPlan = async (req: Request, res: Response):Promise<any> => {
  try {
    const { userId } = req.params;
    const userPlan = await UserPlanService.deleteUserPlanService(userId)


    if (!userPlan) {
      return res.status(404).json({ message: 'User plan not found' });
    }

    res.status(200).json({ message: 'User plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user plan', error });
  }
};




