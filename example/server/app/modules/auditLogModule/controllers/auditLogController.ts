// modules/companyBranch/controllers/branchController.ts
import { Request, Response } from 'express';
import AuditLog from '../repository/auditLogRepository';
const AuditLogController = {


  getAllLogs: async (req: Request, res: Response):Promise<any> => {
    try {
        const auditLogs = await AuditLog.find();
        res.json(auditLogs);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching audit logs' });
      }
  },

  getLogsById: async (req: Request, res: Response):Promise<any> => {
    try {
        const auditLog = await AuditLog.findById(req.params.id);
        if (!auditLog) {
          return res.status(404).json({ message: 'Audit log not found' });
        }
        res.json(auditLog);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching audit log' });
      }
  },

  
};

export default AuditLogController;
