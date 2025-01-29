
import { agentPlaneAdapter } from '@orchestrator/adapters/secondary/agent-plane.adapters';
import { GetOrdersInput, GetOrdersOutput } from '@orchestrator/metadata/agent-plane.schema';

export const getOrdersUseCase = async (input: GetOrdersInput): Promise<GetOrdersOutput> => {
  try {
    console.log('---Calling Get Orders Use Case---')
    const orders = await agentPlaneAdapter.getOrders(input);
    return orders;
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    throw new Error('Failed to fetch orders: ' + error.message);
  }
};