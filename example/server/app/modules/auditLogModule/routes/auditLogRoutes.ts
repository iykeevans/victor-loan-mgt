// routes/auditLog.ts

import express from 'express';
import { Request, Response } from 'express';

import AuditLogController from '../controllers/auditLogController';
const router = express.Router();

// Get all audit logs
router.get('/logs', AuditLogController.getAllLogs);
// Get specific audit log by ID
router.get('/logsById/:id', AuditLogController.getLogsById);

export default router;
