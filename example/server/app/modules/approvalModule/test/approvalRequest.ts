// tests/approval.test.ts

import request from 'supertest';
import app from '../../../../app';
import ApprovalRequest from '../repository/approvalRepository';
import User from '../../../../models/userModel';

describe('Approval Request Tests', () => {
  let approvalRequest: any;
  let user: any;
  let manager: any;
  let admin: any;

  beforeAll(async () => {
    // Create users and approval request for testing
    user = await User.create({ username: 'user1', role: 'user' });
    manager = await User.create({ username: 'manager', role: 'manager' });
    admin = await User.create({ username: 'admin', role: 'admin' });

    approvalRequest = await ApprovalRequest.create({
      requestUrl: 'https://example.com/api/endpoint',
      payload: { data: 'Test Data' },
      initiatorId: user._id,
      userFunctionId: 'Create and Approve Records',
      approvers: [
        { approverId: manager._id, status: 'pending' },
        { approverId: admin._id, status: 'pending' },
      ],
      totalLevels: 2,
      currentLevel: 0,
      status: 'pending',
    });
  });

  it('should get all approval requests', async () => {
    const response = await request(app).get('/api/approval/requests');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should get an approval request by ID', async () => {
    const response = await request(app).get(`/api/approval/request/${approvalRequest._id}`);
    expect(response.status).toBe(200);
    expect(response.body._id).toBe(approvalRequest._id.toString());
  });

  it('should handle approval action and update request status', async () => {
    const response = await request(app)
      .post('/api/approval/handle-approval')
      .send({
        requestId: approvalRequest._id,
        approverId: manager._id,
        action: 'approve',
        comment: 'Approved by Manager',
      });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('awaiting_next_approver');
  });

  it('should handle rejection action and update request status', async () => {
    const response = await request(app)
      .post('/api/approval/handle-approval')
      .send({
        requestId: approvalRequest._id,
        approverId: manager._id,
        action: 'reject',
        comment: 'Rejected by Manager',
      });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('rejected');
  });
});
