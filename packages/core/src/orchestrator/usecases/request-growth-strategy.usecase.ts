

import { Queue, Topic, GrowthStrategyOrder, Status } from 'src/orchestrator/metadata/order.schema'
import { RequestGrowthStrategyInput } from '@orchestrator/metadata/agent-plane.schema'
import { TopicPublisher } from '@orchestrator/adapters/secondary/topic-publisher.adapter';
import { randomUUID } from 'crypto';
import { OrderResponseBody } from '../metadata/http-responses.schema';
import { agentPlaneAdapter } from '../adapters/secondary/agent-plane.adapters';

export async function publishGrowthStrategyUseCase(request: RequestGrowthStrategyInput): Promise<OrderResponseBody> {
  console.info("--- publishGrowthStrategyUseCase ---");
  try {
    const order: GrowthStrategyOrder = {
      topic: Topic.orders,
      queue: Queue.growthStrategy,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      payload: {
        orderId: request.orderId,
        userId: request.userId,
        deliverableId: request.deliverableId,
        applicationIdea: request.applicationIdea,
        idealCustomer: request.idealCustomer,
        targetAnnualRevenue: request.targetAnnualRevenue
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
    console.error('Error in growthStrategyUseCase:', error);
    throw new Error('Failed to publish growth strategy task');
  }
}