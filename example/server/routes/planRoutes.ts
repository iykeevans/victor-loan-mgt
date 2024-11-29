import express from 'express';
import { 
    createPlanController,
    getPlanController,
    updatePlanController,
    deletePlanController,

    // user pln
    createUserPlan, getUserPlan, updateUserPlan, deleteUserPlan,

 } from '../controllers/planController';

const router = express.Router();



// Route to create a new plan
router.post('/plans', createPlanController);
// Route to get a specific plan by ID
router.get('/plans/:planId', getPlanController);
// Route to update an existing plan by ID
router.put('/plans/:planId', updatePlanController);
// Route to delete a plan by ID
router.delete('/plans/:planId', deletePlanController);



// Create a new user plan
router.post('/user-plan', createUserPlan);
// Get a user plan by userId
router.get('/user-plan/:userId', getUserPlan);
// Update a user's plan by userId
router.put('/user-plan/:userId', updateUserPlan);
// Delete a user's plan by userId
router.delete('/user-plan/:userId', deleteUserPlan);

export default router;
