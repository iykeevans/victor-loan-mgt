// tests/approvalConfig.test.ts

import request from 'supertest';
import app from '../../../../app';
import { seedPermissionsAndRoles } from '../seed//approvalsActions';

describe('Approval Configuration Tests', () => {
  beforeAll(async () => {
    await seedPermissionsAndRoles(); // Seed necessary data for tests
  });

  it('should create an approval configuration', async () => {
    const response = await request(app).post('/api/approval-config/create')
      .send({
        userFunctionId: 'some-user-function-id',
        approvers: [{ user: 'some-user-id', level: 1 }]
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('approvers');
  });

  it('should update an approval configuration', async () => {
    const response = await request(app).put('/api/approval-config/update/1')
      .send({
        approvers: [{ user: 'another-user-id', level: 1 }]
      });

    expect(response.status).toBe(200);
    expect(response.body.approvers[0].user).toBe('another-user-id');
  });

  it('should delete an approval configuration', async () => {
    const response = await request(app).delete('/api/approval-config/delete/1');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
