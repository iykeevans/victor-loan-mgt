import { Router } from 'express';
import * as authController from '../controllers/authController';

const router = Router();
router.get('/check-session', authController.checkSession);
router.get('/identity', authController.authenticateUser);
router.get('/get-auth-service-token', authController.getAuthorizerToken);
router.post('/register', authController.register);
router.get('/verify-otp', authController.verifyOTP);

export default router;
