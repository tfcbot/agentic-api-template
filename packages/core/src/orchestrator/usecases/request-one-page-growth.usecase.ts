

import { Queue, Topic, OnePageGrowthTask } from '@orchestrator/metadata/task.schema'
import { RequestOnePageGrowthInput } from '@orchestrator/metadata/agent-plane.schema'
import { TopicPublisher } from '@orchestrator/adapters/secondary/topic-publisher.adapter';
import { randomUUID } from 'crypto';
import { Message } from '@utils/metadata/message.schema';
import {  OrderResponseBody } from '../metadata/http-responses.schema';

export async function publishOnePageGrowthUseCase(request: RequestOnePageGrowthInput): Promise<OrderResponseBody> {
  try {
    const task: OnePageGrowthTask = {
      taskId: randomUUID(),
      userId: request.userId,
      topic: Topic.tasks,
      queue: Queue.onePageGrowth,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      payload: {
        userId: request.userId,
        orderId: request.orderId,
        applicationIdea: request.applicationIdea,
        idealCustomer: request.idealCustomer,
        targetAnnualRevenue: request.targetAnnualRevenue
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
    console.error('Error in onePageGrowthUseCase:', error);
    throw new Error('Failed to publish one page growth task');
  }
}
