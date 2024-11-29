// routes/auditLog.ts

import express from 'express';
import { Request, Response } from 'express';
import AuditLog from '../repository/auditLogRepository';

const router = express.Router();

// Get all audit logs
router.get('/logs', async (req: Request, res: Response) => {
  try {
    const auditLogs = await AuditLog.find();
    res.json(auditLogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching audit logs' });
  }
});

// Get specific audit log by ID
router.get('/logsById/:id', async (req: Request, res: any) => {
  try {
    const auditLog = await AuditLog.findById(req.params.id);
    if (!auditLog) {
      return res.status(404).json({ message: 'Audit log not found' });
    }
    res.json(auditLog);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching audit log' });
  }
});

export default router;
