
import { Queue, Status, Topic, ValueStrategyOrder } from '@orchestrator/metadata/order.schema'
import { RequestValueStrategyInput } from '@orchestrator/metadata/agent-plane.schema'
import { TopicPublisher } from '@orchestrator/adapters/secondary/topic-publisher.adapter';
import { randomUUID } from 'crypto';
import { OrderResponseBody } from '../metadata/http-responses.schema';
import { agentPlaneAdapter } from '../adapters/secondary/agent-plane.adapters';

export async function publishValueStrategyUseCase(request: RequestValueStrategyInput): Promise<OrderResponseBody> {
  try {
    const order: ValueStrategyOrder = {
      topic: Topic.orders,
      queue: Queue.valueStrategy,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      payload: {
        orderId: request.orderId,
        userId: request.userId,
        deliverableId: request.deliverableId,
        applicationIdea: request.applicationIdea,
        idealCustomer: request.idealCustomer,
        problem: request.problem,
        solution: request.solution
      }
    }

    const publisher = new TopicPublisher();
    await agentPlaneAdapter.saveOrder({
      orderId: order.payload.orderId,
      userId: order.payload.userId,
      deliverableId: order.payload.deliverableId,
      orderStatus: Status.Pending,
      orderCreatedAt: order.createdAt,
      orderUpdatedAt: order.updatedAt
    });
    await publisher.publishOrder(order);

    return {
      orderId: order.payload.orderId,
      orderStatus: 'pending',
      orderCreatedAt: new Date().toISOString()
    }
  } catch (error) {
    console.error('Error in valueStrategyUseCase:', error);
    throw new Error('Failed to publish value strategy task');
  }
}
