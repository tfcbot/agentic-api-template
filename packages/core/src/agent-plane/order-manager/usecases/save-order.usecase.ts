import { SaveOrderInput } from '@agent-plane/order-manager/metadata/order.schema';
import { Message } from '@utils/metadata/message.schema';
import { orderRepository } from '@agent-plane/order-manager/adapters/secondary/datastore.adapter';

export const saveOrderUseCase = async (input: SaveOrderInput): Promise<Message> => {
  console.info("Saving order for User");

  try {
    await orderRepository.saveOrder(input);
    return {
      message: 'Order saved successfully',
    };

  } catch (error) {
    console.error('Error saving order:', error);
    throw new Error('Failed to save order');
  }
};
