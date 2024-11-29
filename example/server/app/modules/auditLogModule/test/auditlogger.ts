// tests/auditLog.test.ts

import request from 'supertest';
import app from '../../../../app'; // Assuming your Express app is in app.ts

// POST /api/resource
// Headers:
//   X-Machine-Name: "Desktop01"
//   X-Mac-Address: "00:1A:2B:3C:4D:5E"
//   X-Computer-Name: "johns-macbook"
//   User-Agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
// Payload:
//   {
//     "name": "New Resource",
//     "description": "This is a new resource."
//   }


describe('Audit Log API', () => {
  it('should log a POST request', async () => {
    const response = await request(app)
      .post('/api/resource')
      .set('X-Machine-Name', 'Desktop01')
      .set('X-Mac-Address', '00:1A:2B:3C:4D:5E')
      .set('X-Computer-Name', 'johns-macbook')
      .send({
        name: 'Test Resource',
        description: 'Testing resource creation.',
      });

    expect(response.status).toBe(200);
    // Verify audit log exists
    const logsResponse = await request(app).get('/api/audit/logs');
    expect(logsResponse.body.length).toBeGreaterThan(0);
  });

  it('should retrieve an audit log by ID', async () => {
    const log = await request(app).get('/api/audit/logs').then((res) => res.body[0]);
    const logDetails = await request(app).get(`/api/audit/logs/${log._id}`);
    expect(logDetails.status).toBe(200);
    expect(logDetails.body).toHaveProperty('userIp');
    expect(logDetails.body).toHaveProperty('action');
  });
});
