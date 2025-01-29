import { UpdateOrderInput } from '@agent-plane/order-manager/metadata/order.schema';
import { Message } from '@utils/metadata/message.schema';
import { orderRepository } from '@agent-plane/order-manager/adapters/secondary/datastore.adapter';

export const updateOrderUseCase = async (input: UpdateOrderInput): Promise<Message> => {
  console.info("Updating order status");

  try {
    await orderRepository.updateOrder(input);
    return {
      message: 'Order updated successfully',
    };

  } catch (error) {
    console.error('Error updating order:', error);
    throw new Error('Failed to update order');
  }
};
