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
router.delete('/remove-approver/:id/:approverId', async (req, res) => {
  try {
    const updatedConfig = await ApprovalConfigurationService.removeApproverFromConfiguration(req.params.id, req.params.approverId);
    res.status(200).json(updatedConfig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete approval configuration
router.delete('/delete/:id', async (req, res) => {
  try {
    const success = await ApprovalConfigurationService.deleteApprovalConfiguration(req.params.id);
    res.status(200).json({ success });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;


export default router;
