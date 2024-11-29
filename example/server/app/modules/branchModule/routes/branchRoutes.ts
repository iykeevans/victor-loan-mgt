// modules/companyBranch/routes/branchRoutes.ts
import { Router } from 'express';
import branchController from '../controllers/branchController';

const router: Router = Router();

// Define the routes for the branch module
router.post('/', branchController.createBranch);
router.get('/:workspaceId', branchController.getAllBranches);
router.get('/branch/:branchId', branchController.getBranchById);
router.put('/branch/:branchId', branchController.updateBranch);
router.delete('/branch/:branchId', branchController.deleteBranch);

export default router;
