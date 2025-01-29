import { GetOrdersInput, GetOrdersOutput } from '@agent-plane/order-manager/metadata/order.schema';
import { getOrdersUseCase } from '@agent-plane/order-manager/usecases/get-orders.usecase';

export class GetOrdersAdapter {
  async execute(input: GetOrdersInput): Promise<GetOrdersOutput> {
    try {
      const result = await getOrdersUseCase(input);
      return result;
    } catch (error) {
      console.error('Error in GetOrdersAdapter:', error);
      throw new Error('Failed to retrieve orders');
    }
  }
}

export const getOrdersAdapter = new GetOrdersAdapter();