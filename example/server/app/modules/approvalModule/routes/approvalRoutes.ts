// routes/approvalRoutes.ts

import express from 'express';
import ApprovalController from '../controllers/approvalControllers';
import ApprovalConfigurationControllers from '../controllers/approvalConfigurationControllers';


const router = express.Router();

// Route to request approval for posting a record
router.post('/request-approval', ApprovalController.requestApproval);
// Route for approvers to approve or deny requests
router.post('/handle-approval', ApprovalController.handleApproval);
// Route to cancel an approval request
router.post('/cancel-request', ApprovalController.cancelRequest);
// Get all approval requests
router.get('/requests', ApprovalController.getApprovalRequests);
// Get approval request by ID
router.get('/request/:id', ApprovalController.getApprovalRequestById);

// routes/approvalConfigRoutes.ts

// Create approval configuration
router.post('/create',ApprovalConfigurationControllers.createApprovalConfiguration);
// Update approval configuration
router.put('/update/:id',ApprovalConfigurationControllers.handleUpdateApprovalConfig);
// Add approver to approval configuration
router.put('/add-approver/:id', ApprovalConfigurationControllers.addApproverToConfiguration);
// Remove approver from approval configuration
router.delete('/remove-approver/:id/:approverId',ApprovalConfigurationControllers.removeApproverFromConfiguration);

// Delete approval configuration
router.delete('/delete/:id', async (req, res) => {
});




export default router;
