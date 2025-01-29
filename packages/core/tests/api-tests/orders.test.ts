import { OrderResponseBody, DeliverableResponseBody, GetDeliverableResponseBody, GetOrdersResponseBody } from '@orchestrator/metadata/http-responses.schema';

const API_URL = process.env.API_URL;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

describe('Orders API Tests', () => {
  const headers = {
    'Authorization': `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  };

  
  test('User should be able to get their orders', async () => {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'GET',
      headers,
    });

    expect(response.status).toBe(200);
    const parsedOrdersResponse = await response.json() as GetOrdersResponseBody;
    expect(Array.isArray(parsedOrdersResponse.data)).toBe(true);
    if (parsedOrdersResponse.data.length > 0) {
      const order = parsedOrdersResponse.data[0];
      expect(order).toHaveProperty('orderId');
      expect(order).toHaveProperty('userId');
      expect(order).toHaveProperty('orderStatus');
      expect(order).toHaveProperty('orderCreatedAt');
      expect(order).toHaveProperty('orderUpdatedAt');
    }
  });

  test('User should be able to get deliverables for an order', async () => {
    // First get an order ID
    const ordersResponse = await fetch(`${API_URL}/orders`, {
      method: 'GET',
      headers,
    });
    const parsedOrdersResponse = await ordersResponse.json() as GetOrdersResponseBody;
    const orderId = parsedOrdersResponse.data[0].orderId;

    if (orderId) {
      const response = await fetch(`${API_URL}/orders/deliverables/${orderId}`, {
        method: 'GET',
        headers,
      });

      expect(response.status).toBe(200);
      const parsedResponse =  await response.json() as GetDeliverableResponseBody;
      expect(parsedResponse.data.deliverableId).toBeDefined();
      expect(parsedResponse.data.deliverableContent).toBeDefined();
    }
  }, 30000); // Added 30 second timeout
}); 