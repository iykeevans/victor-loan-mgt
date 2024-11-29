import request from 'supertest';

import Role from '../../../../models/roleModel';
import app from '../../../../app';
import ApprovalRequest from '../repository/approvalRepository';
import User from '../../../../models/userModel';

describe('Approval Module Tests', () => {
  let user: any;
  let manager: any;
  let admin: any;
  let approvalRequest: any;

  beforeAll(async () => {
    // Seed the database before tests
    await require('./seedData').seedAllData();

    // Fetch users and approval request from the database
    user = await User.findOne({ username: 'user1' });
    manager = await User.findOne({ username: 'managerUser' });
    admin = await User.findOne({ username: 'adminUser' });
    approvalRequest = await ApprovalRequest.findOne({ initiatorId: user._id });
  });

  it('should request approval and return approval request', async () => {
    const response = await request(app)
      .post('/api/approval/request-approval')
      .send({
        userId: user._id,
        userFunctionId: 'Create and Approve Records',
        requestUrl: 'https://example.com/api/endpoint',
        payload: { data: 'Test Data' },
        approvers: [manager._id, admin._id],
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.status).toBe('pending');
  });

  it('should approve the request and move to next level', async () => {
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

  it('should reject the request by the manager and the status should be rejected', async () => {
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

  it('should cancel the approval request by the initiator', async () => {
    const response = await request(app)
      .post('/api/approval/cancel-request')
      .send({
        requestId: approvalRequest._id,
        userId: user._id,
      });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('cancelled');
  });

  it('should prevent the initiator from approving the request', async () => {
    const response = await request(app)
      .post('/api/approval/handle-approval')
      .send({
        requestId: approvalRequest._id,
        approverId: user._id,
        action: 'approve',
        comment: 'Initiator should not approve',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('You cannot approve your own request');
  });
});
