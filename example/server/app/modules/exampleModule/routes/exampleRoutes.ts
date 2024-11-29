// modules/exampleModule/routes/exampleRoutes.ts
import { Router } from 'express';
import exampleController from '../controllers/exampleController';

const router: Router = Router();

// Define routes for the example module
router.get('/', exampleController.getExample);

export default router;
