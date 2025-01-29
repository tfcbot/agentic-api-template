
import {  Queue, Topic, WebsiteReviewOrder } from 'src/orchestrator/metadata/order.schema'
import { ReviewWebsiteInput } from '@orchestrator/metadata/agent-plane.schema'
import { TopicPublisher } from '@orchestrator/adapters/secondary/topic-publisher.adapter';
import { WebsiteReviewRequestReceivedResponseBody } from '../metadata/http-responses.schema';

export async function publishWebsiteReviewTaskUseCase(request: ReviewWebsiteInput): Promise<WebsiteReviewRequestReceivedResponseBody> {
  throw new Error('Not implemented');
}
