
import { Queue, Status, Topic, ValueStrategyOrder } from '@orchestrator/metadata/order.schema'
import { RequestValueStrategyInput } from '@orchestrator/metadata/agent-plane.schema'
import { TopicPublisher } from '@orchestrator/adapters/secondary/topic-publisher.adapter';
import { OrderResponseBody } from '../metadata/http-responses.schema';
import { agentPlaneAdapter } from '../adapters/secondary/agent-plane.adapters';
import { updateCreditsAdapter } from 'src/control-plane/billing/adapters/primary/update-remaining-credits.adater';
import { AgentCost } from '../metadata/order.enum';

export async function publishValueStrategyUseCase(request: RequestValueStrategyInput): Promise<OrderResponseBody> {
  try {
    const order: ValueStrategyOrder = {
      topic: Topic.orders,
      queue: Queue.valueStrategy,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      payload: {
        orderId: request.orderId,
        keyId: request.keyId,
        userId: request.userId,
        deliverableId: request.deliverableId,
        deliverableName: request.deliverableName,
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
      deliverableName: order.payload.deliverableName,
      orderStatus: Status.Pending,
      orderCreatedAt: order.createdAt,
      orderUpdatedAt: order.updatedAt
    });
    await updateCreditsAdapter.updateRemainingCredits({
      keyId: request.keyId,
      credits: AgentCost.ValueStrategy
    });
    await publisher.publishOrder(order);

    return {
      orderId: order.payload.orderId,
      orderStatus: 'pending',
      orderCreatedAt: new Date().toISOString(),
      deliverableName: order.payload.deliverableName
    }
  } catch (error) {
    console.error('Error in valueStrategyUseCase:', error);
    throw new Error('Failed to publish value strategy task');
  }
}
