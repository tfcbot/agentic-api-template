import { DeliverableResponseBody, OrderResponseBody } from '@orchestrator/metadata/http-responses.schema';

const API_URL = process.env.API_URL;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

describe('Landing Page Review API Tests', () => {
  const headers = {
    'Authorization': `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  };

  test('User should be able to request a landing page review', async () => {
    const testInput = {
      url: 'https://example.com',
      businessType: 'SaaS',
      targetAudience: 'Small Business Owners'
    };

    const response = await fetch(`${API_URL}/landing-page-review`, {
      method: 'POST',
      headers,
      body: JSON.stringify(testInput),
    });

    expect(response.status).toBe(201);
    const data = await response.json() as OrderResponseBody;
    expect(data).toHaveProperty('orderId');
    expect(data).toHaveProperty('url');
  });

  test('User should be able to get their landing page reviews', async () => {
    const response = await fetch(`${API_URL}/landing-page-review/deliverables`, {
      method: 'GET',
      headers,
    });

    expect(response.status).toBe(200);
    const data = await response.json() as { deliverables: DeliverableResponseBody[] };
    expect(Array.isArray(data.deliverables)).toBe(true);

    if (data.deliverables.length > 0) {
      const review = data.deliverables[0];
      expect(review).toHaveProperty('deliverableId');
      expect(review).toHaveProperty('url');
      expect(review).toHaveProperty('status');
    }
  });
}); 