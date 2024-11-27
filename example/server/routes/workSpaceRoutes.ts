// src/routes/workspaceRoutes.ts

import express from 'express';
import * as workspaceController from '../controllers/workSpaceController';
import { ensureAuthenticated } from '../middlewares/authMiddleware';  // Ensure the user is authenticated
const router = express.Router();
router.post('/workspace',ensureAuthenticated, workspaceController.createWorkspace); // Create workspace
router.post('/workspace/:workspaceId/invite',ensureAuthenticated, workspaceController.inviteToWorkspace); // Invite to workspace
router.post('/workspace/:workspaceId/accept-invite',ensureAuthenticated, workspaceController.acceptInvite); // Accept invite
router.post('/workspace/:workspaceId/assign-role',ensureAuthenticated, workspaceController.assignRole); // Assign role
router.delete('/workspace/:workspaceId/member/:userId',ensureAuthenticated, workspaceController.removeMember); // Remove member
router.post('/workspace/:workspaceId/create-role', ensureAuthenticated, workspaceController.createCustomRoleController);

export default router;
