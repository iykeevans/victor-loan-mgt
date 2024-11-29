// models/AuditLog.ts

import mongoose, { Document, Schema } from 'mongoose';

export interface IAuditLog extends Document {
  userIp: string;
  action: string;
  resource: string;
  payload: any;
  browser: string;
  machine: string;
  macAddress: string;
  computerName: string;
  userAgent: string;
  timestamp: Date;
}

const AuditLogSchema = new Schema<IAuditLog>({
  userIp: { type: String, required: true },
  action: { type: String, required: true },
  resource: { type: String, required: true },
  payload: { type: Schema.Types.Mixed, required: true },
  browser: { type: String, required: true },
  machine: { type: String, required: true },
  macAddress: { type: String, required: true },
  computerName: { type: String, required: true },
  userAgent: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const AuditLog = mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);

export default AuditLog;
