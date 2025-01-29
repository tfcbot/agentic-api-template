import { 
  OrderResponseBody
} from '@orchestrator/metadata/http-responses.schema';
import { RequestGrowthStrategyInput } from 'src/orchestrator/metadata/agent-plane.schema';

const API_URL = process.env.API_URL;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

describe('One Page Services API Tests', () => {
  const headers = {
    'Authorization': `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  };

  test('User should be able to request one-page growth strategy', async () => {
    const testInput = {
      deliverableName: "value strategy test",
      applicationIdea: 'Team collaboration platform',
      idealCustomer: 'Remote tech teams',
      targetAnnualRevenue: 1000000
    };

    const response = await fetch(`${API_URL}/growth-strategy`, {
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
      deliverableName: "value strategy test",
      problem: 'Inefficient team communication',
      applicationIdea: 'Team chat platform',
      idealCustomer: 'Remote tech teams',
      solution: 'AI-powered chat solution'
    };

    const response = await fetch(`${API_URL}/value-strategy`, {
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
      deliverableName: "technical strategy test",
      useCases: 'User can generate a landing page copy',
      nonFunctional: 'High availability, scalable to 10k users, serverless with AWS'
    };

    const response = await fetch(`${API_URL}/tech-strategy`, {
      method: 'POST',
      headers,
      body: JSON.stringify(testInput),
    });

    expect(response.status).toBe(201);
    const data = await response.json() as OrderResponseBody;
    expect(data).toHaveProperty('orderId');
  });
}); 