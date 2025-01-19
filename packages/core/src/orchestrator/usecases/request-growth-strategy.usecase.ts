

import { Queue, Topic, GrowthStrategyOrder, Status } from 'src/orchestrator/metadata/order.schema'
import { RequestGrowthStrategyInput } from '@orchestrator/metadata/agent-plane.schema'
import { TopicPublisher } from '@orchestrator/adapters/secondary/topic-publisher.adapter';
import { randomUUID } from 'crypto';
import { OrderResponseBody } from '../metadata/http-responses.schema';
import { agentPlaneAdapter } from '../adapters/secondary/agent-plane.adapters';
import { controlPlaneAdapter } from '../adapters/secondary/control-plane.adapter';
import { AgentCost } from '../metadata/order.enum';

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
        keyId: request.keyId,
        deliverableId: request.deliverableId,
        deliverableName: request.deliverableName,
        agentId: request.agentId,
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
      deliverableName: order.payload.deliverableName,
      orderStatus: Status.Pending,
      orderCreatedAt: order.createdAt,
      orderUpdatedAt: order.updatedAt
    });
    await controlPlaneAdapter.updateRemainingCredits({
      keyId: request.keyId,
      credits: AgentCost.GrowthStrategy
    });
    await publisher.publishOrder(order);

    return {
      orderId: order.payload.orderId,
      orderStatus: 'pending',
      orderCreatedAt: new Date().toISOString(),
      deliverableName: order.payload.deliverableName
    }

  } catch (error) {
    console.error('Error in growthStrategyUseCase:', error);
    throw new Error('Failed to publish growth strategy task');
  }
}