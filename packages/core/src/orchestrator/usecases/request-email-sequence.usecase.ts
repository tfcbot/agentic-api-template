import { Queue, Status, Topic, EmailSequenceOrder } from '@orchestrator/metadata/order.schema'
import { RequestEmailSequenceInput } from '@orchestrator/metadata/agent-plane.schema'
import { TopicPublisher } from '@orchestrator/adapters/secondary/topic-publisher.adapter';
import { OrderResponseBody } from '../metadata/http-responses.schema';
import { agentPlaneAdapter } from '../adapters/secondary/agent-plane.adapters';
import { updateCreditsAdapter } from 'src/control-plane/billing/adapters/primary/update-remaining-credits.adater';
import { AgentCost } from '../metadata/order.enum';

export async function publishEmailSequenceUseCase(request: RequestEmailSequenceInput): Promise<OrderResponseBody> {
  try {
    const order: EmailSequenceOrder = {
      topic: Topic.orders,
      queue: Queue.emailSequence,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      payload: {
        orderId: request.orderId,
        keyId: request.keyId,
        userId: request.userId,
        deliverableId: request.deliverableId,
        agentId: request.agentId,
        deliverableName: request.deliverableName,
        idealCustomerProfile: request.idealCustomerProfile,
        emailSequenceType: request.emailSequenceType,
      }
    }

    const publisher = new TopicPublisher();
    
    // Save the order
    await agentPlaneAdapter.saveOrder({
      orderId: order.payload.orderId,
      userId: order.payload.userId,
      deliverableId: order.payload.deliverableId,
      deliverableName: order.payload.deliverableName,
      orderStatus: Status.Pending,
      orderCreatedAt: order.createdAt,
      orderUpdatedAt: order.updatedAt
    });

    // Update credits
    await updateCreditsAdapter.updateRemainingCredits({
      keyId: request.keyId,
      credits: AgentCost.EmailSequence
    });

    // Publish the order
    await publisher.publishOrder(order);

    return {
      orderId: order.payload.orderId,
      orderStatus: 'pending',
      orderCreatedAt: new Date().toISOString(),
      deliverableName: order.payload.deliverableName
    }
  } catch (error) {
    console.error('Error in emailSequenceUseCase:', error);
    throw new Error('Failed to publish email sequence task');
  }
} 