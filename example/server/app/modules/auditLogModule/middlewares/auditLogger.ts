// middleware/auditLog.ts

import { Request, Response, NextFunction } from 'express';
import { IAuditLog } from '../repository/auditLogRepository';
import User from '../../../../models/userModel';  // Assuming User model exists
import AuditLog from '../repository/auditLogRepository';

const auditLogMiddleware = async (req: any, res: Response, next: NextFunction) => {
  const user: any = req.user || null; // Assuming `req.user` has user info after authentication

  // Capture the necessary data from the request
  const userIp = req.ip;
  const action = req.method; // GET, POST, etc.
  const resource = req.originalUrl; // URL of the resource endpoint
  const payload: any = req.body || {}; // The request payload
  const auitLogFromPayload= payload?.auditLogsData;
  const browser = req.headers['user-agent'] || 'unknown'; // User-Agent header (browser details)
  const machine = req.headers['x-machine-name'] || 'unknown'; // Custom header for machine name
  const macAddress = req.headers['x-mac-address'] || 'unknown'; // Custom header for MAC address
  const computerName = req.headers['x-computer-name'] || 'unknown'; // Custom header for computer name
  const userAgent = req.headers['user-agent'] || 'unknown';


  // Create a new audit log entry
  const auditLogData = {
    userIp,
    action,
    resource,
    payload,
    browser,
    machine,
    macAddress,
    computerName,
    userAgent,
    timestamp: new Date(),
  };

  try {
    // Save the audit log entry to the database
    await AuditLog.create(auditLogData);
    console.log('Audit log saved successfully!');
  } catch (error) {
    console.error('Error logging audit data:', error);
  }

  next();
};




// middleware/machineDetails.ts



// This middleware will extract machine details from headers
export const addMachineDetailsToHeaders = (req: Request, res: Response, next: NextFunction) => {
  // Get machine details from headers (these can be set by the client-side app)
  const machineName = req.headers['x-machine-name'] || 'unknown';
  const macAddress = req.headers['x-mac-address'] || 'unknown';
  const computerName = req.headers['x-computer-name'] || 'unknown';
  const userAgent = req.headers['user-agent'] || 'unknown';  // Browser information

  // Attach these details into the request headers to be used in your app
  req.headers['x-machine-name'] = machineName;
  req.headers['x-mac-address'] = macAddress;
  req.headers['x-computer-name'] = computerName;
  req.headers['user-agent'] = userAgent;

  // Optionally log the information (for debugging purposes)
  console.log('Machine Details:', {
    machineName,
    macAddress,
    computerName,
    userAgent,
  });

  // Continue to the next middleware or route handler
  next();
};


export default auditLogMiddleware;
