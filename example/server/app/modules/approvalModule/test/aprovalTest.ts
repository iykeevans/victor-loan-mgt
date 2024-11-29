import request from 'supertest';
import app from '../../../../app';

describe('Approval Routes', () => {
  it('should request approval and return approval request', async () => {
    const response = await request(app)
      .post('/api/approval/request-approval')
      .send({
        userId: '123',
        userFunctionId: '456',
        requestUrl: 'https://example.com/api/endpoint',
        payload: { data: 'test data' },
        approvers: ['approver1', 'approver2'],
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
  });

  it('should handle approval decision and move to next level', async () => {
    const response = await request(app)
      .post('/api/approval/handle-approval')
      .send({
        requestId: 'some-request-id',
        approverId: 'approver1',
        action: 'approve',
        comment: 'Looks good!',
      });
    expect(response.status).toBe(200);
  });

  it('should cancel an approval request if no approvals have been made', async () => {
    const response = await request(app)
      .post('/api/approval/cancel-request')
      .send({
        requestId: 'some-request-id',
        userId: '123',
      });
    expect(response.status).toBe(200);
  });
});
