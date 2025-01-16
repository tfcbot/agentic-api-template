
import { Queue, Topic, TechStrategyOrder, Status } from '@orchestrator/metadata/order.schema'
import { RequestTechStrategyInput } from '@orchestrator/metadata/agent-plane.schema'
import { TopicPublisher } from '@orchestrator/adapters/secondary/topic-publisher.adapter';

import { OrderResponseBody } from '@orchestrator/metadata/http-responses.schema';
import { agentPlaneAdapter } from '@orchestrator/adapters/secondary/agent-plane.adapters';

export async function publishTechStrategyUseCase(request: RequestTechStrategyInput): Promise<OrderResponseBody> {
  try {   
    const order: TechStrategyOrder = {
      topic: Topic.orders,
      queue: Queue.techStrategy,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      payload: {
        orderId: request.orderId,
        userId: request.userId,
        deliverableId: request.deliverableId,
        useCases: request.useCases,
        nonFunctional: request.nonFunctional
      }
    }

    const publisher = new TopicPublisher();
    await agentPlaneAdapter.saveOrder(
      {
        orderId: order.payload.orderId,
        userId: order.payload.userId,
        deliverableId: order.payload.deliverableId,
        orderStatus: Status.Pending,
        orderCreatedAt: order.createdAt,
        orderUpdatedAt: order.updatedAt
      }
    );
    await publisher.publishOrder(order);

    return {
      orderId: order.payload.orderId,
      orderStatus: 'pending',
      orderCreatedAt: new Date().toISOString()
    }

  } catch (error) {
    console.error('Error in techStrategyUseCase:', error);
    throw new Error('Failed to publish tech strategy task');
  }
}