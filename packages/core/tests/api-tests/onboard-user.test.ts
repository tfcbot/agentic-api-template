import { OrchestratorHttpResponses } from '@orchestrator/metadata/http-responses.schema';

const API_URL = process.env.API_URL;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

describe('Onboard User API Tests', () => {
  const headers = {
    'Authorization': `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  };

  test('User should be able to complete onboarding successfully', async () => {
    const testInput = {
      onboardingComplete: true,
      onboardingDetails: {
        useCase: 'Building a SaaS application in three days',
      }
    };

    const response = await fetch(`${API_URL}/onboard-user`, {
      method: 'POST',
      headers,
      body: JSON.stringify(testInput),
    });

    expect(response.status).toBe(201);
    const data = await response.json();
    expect(data).toHaveProperty('message');
  });

  test('Should fail with missing request body', async () => {
    const response = await fetch(`${API_URL}/onboard-user`, {
      method: 'POST',
      headers,
    });

    expect(response.status).toBe(400);
  });

  test('Should fail with invalid input', async () => {
    const testInput = {
      onboardingComplete: true,
      // Missing required onboardingDetails
    };

    const response = await fetch(`${API_URL}/onboard-user`, {
      method: 'POST',
      headers,
      body: JSON.stringify(testInput),
    });

    expect(response.status).toBe(400);
  });

  test('Should fail without authentication', async () => {
    const testInput = {
      onboardingComplete: true,
      onboardingDetails: {
        useCase: 'Building a SaaS application',
      }
    };

    const response = await fetch(`${API_URL}/onboard-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testInput),
    });

    expect(response.status).toBe(401);
  });
}); 