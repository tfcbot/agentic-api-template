
import { Queue, Topic, OnePageTechTask } from '@orchestrator/metadata/task.schema'
import { RequestOnePageTechInput } from '@orchestrator/metadata/agent-plane.schema'
import { TopicPublisher } from '@orchestrator/adapters/secondary/topic-publisher.adapter';
import { randomUUID } from 'crypto';
import { Message } from '@utils/metadata/message.schema';
import { OrderResponseBody } from '../metadata/http-responses.schema';

export async function publishOnePageTechTaskUseCase(request: RequestOnePageTechInput): Promise<OrderResponseBody> {
  try {
    const task: OnePageTechTask = {
      taskId: randomUUID(),
      userId: request.userId,
      topic: Topic.tasks,
      queue: Queue.onePageTech,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      payload: {
        userId: request.userId,
        orderId: request.orderId,
        useCases: request.useCases,
        nonFunctional: request.nonFunctional
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
    console.error('Error in onePageSpecUseCase:', error);
    throw new Error('Failed to publish one page spec task');
  }
}
