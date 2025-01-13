
import { Queue, Topic, OnePageValueTask } from '@orchestrator/metadata/task.schema'
import { RequestOnePageValueInput } from '@orchestrator/metadata/agent-plane.schema'
import { TopicPublisher } from '@orchestrator/adapters/secondary/topic-publisher.adapter';
import { randomUUID } from 'crypto';
import { Message } from '@utils/metadata/message.schema';
import { OrderResponseBody } from '../metadata/http-responses.schema';

export async function publishOnePageValueTaskUseCase(request: RequestOnePageValueInput): Promise<OrderResponseBody> {
  try {
    const task: OnePageValueTask = {
      taskId: randomUUID(),
      userId: request.userId,
      topic: Topic.tasks,
      queue: Queue.onePageValue,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      payload: {
        userId: request.userId,
        orderId: request.orderId,
        deliverableId: request.deliverableId,
        applicationIdea: request.applicationIdea,
        idealCustomer: request.idealCustomer,
        problem: request.problem,
        solution: request.solution
      }
    }

    const publisher = new TopicPublisher();
    await publisher.publishTask(task);

    return {
      orderId: request.orderId,
      orderStatus: 'pending',
      orderCreatedAt: new Date().toISOString()
    }
  } catch (error) {
    console.error('Error in onePageValueUseCase:', error);
    throw new Error('Failed to publish one page value task');
  }
}
