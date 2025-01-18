import { GetOrdersInput, GetOrdersOutput } from '@orchestrator/metadata/agent-plane.schema';
import { orderRepository } from '../adapters/secondary/datastore.adapter';


export const getOrdersUseCase = async (input: GetOrdersInput): Promise<GetOrdersOutput> => {
  console.info("Getting orders for User: ", input.userId);

  try {
    const orders = await orderRepository.getOrders(input.userId);
    return { data: orders };
  } catch (error) {
    console.error('Error retrieving orders:', error);
    throw new Error('Failed to retrieve orders');
  }
};
