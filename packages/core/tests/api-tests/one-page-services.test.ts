import { 
  OrderResponseBody
} from '@orchestrator/metadata/http-responses.schema';

const API_URL = process.env.API_URL;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

describe('One Page Services API Tests', () => {
  const headers = {
    'Authorization': `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  };

  test('User should be able to request one-page growth strategy', async () => {
    const testInput = {
      applicationIdea: 'Team collaboration platform',
      idealCustomer: 'Remote tech teams',
      targetAnnualRevenue: 1000000
    };

    const response = await fetch(`${API_URL}/one-page-growth`, {
      method: 'POST',
      headers,
      body: JSON.stringify(testInput),
    });

    expect(response.status).toBe(201);
    const data = await response.json() as OrderResponseBody;
    expect(data).toHaveProperty('orderId');
  });

  test('User should be able to request one-page value strategy', async () => {
    const testInput = {
      problem: 'Inefficient team communication',
      applicationIdea: 'Team chat platform',
      idealCustomer: 'Remote tech teams',
      solution: 'AI-powered chat solution'
    };

    const response = await fetch(`${API_URL}/one-page-value`, {
      method: 'POST',
      headers,
      body: JSON.stringify(testInput),
    });

    expect(response.status).toBe(201);
    const data = await response.json() as OrderResponseBody;
    expect(data).toHaveProperty('orderId');
  });

  test('User should be able to request one-page technical strategy', async () => {
    const testInput = {
      useCases: 'User can generate a landing page copy',
      nonFunctional: 'High availability, scalable to 10k users, serverless with AWS'
    };

    const response = await fetch(`${API_URL}/one-page-tech`, {
      method: 'POST',
      headers,
      body: JSON.stringify(testInput),
    });

    expect(response.status).toBe(201);
    const data = await response.json() as OrderResponseBody;
    expect(data).toHaveProperty('orderId');
  });
}); 