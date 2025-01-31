import { OrderResponseBody, DeliverableResponseBody } from '@orchestrator/metadata/http-responses.schema';

const API_URL = process.env.API_URL;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

describe('Email Sequence API Tests', () => {
  const headers = {
    'Authorization': `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  };

  const testRequest = {
    agentId: '123e4567-e89b-12d3-a456-426614174000',
    deliverableName: 'Onboarding Email Sequence',
    idealCustomerProfile: 'test-ideal-customer-profile',
    emailSequenceType: 'Onboarding Sequence',
  };

  test('User should be able to request an email sequence', async () => {
    const response = await fetch(`${API_URL}/email-sequence`, {
      method: 'POST',
      headers,
      body: JSON.stringify(testRequest)
    });

    expect(response.status).toBe(201);
    const parsedResponse = await response.json() as OrderResponseBody;
    expect(parsedResponse.orderId).toBeDefined();
    expect(parsedResponse.orderStatus).toBe('pending');
  });


}); 