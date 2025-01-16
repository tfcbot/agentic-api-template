

import {  Queue, Topic, WebsiteReviewTask } from 'src/orchestrator/metadata/order.schema'
import { ReviewWebsiteInput } from '@orchestrator/metadata/agent-plane.schema'
import { TopicPublisher } from '@orchestrator/adapters/secondary/topic-publisher.adapter';
import { randomUUID } from 'crypto';
import { Message } from '@utils/metadata/message.schema';
import { WebsiteReviewRequestReceivedResponseBody } from '../metadata/http-responses.schema';

export async function publishWebsiteReviewTaskUseCase(request: ReviewWebsiteInput): Promise<WebsiteReviewRequestReceivedResponseBody> {
  try {
    const task: WebsiteReviewTask = {
      taskId: randomUUID(),
      userId: request.userId,
      topic: Topic.tasks,
      queue: Queue.websiteReview,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      payload: {
        userId: request.userId,
        url: request.url 
      }
    }

    const publisher = new TopicPublisher();
    await publisher.publishTask(task);

    return {
      reviewId: task.taskId,
      url: request.url
    } 

  } catch (error) {
    console.error('Error in scoringUseCase:', error);
    throw new Error('Failed to publish scoring event');
  }
}
