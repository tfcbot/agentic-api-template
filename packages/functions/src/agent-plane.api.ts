// Lambda Handlers attached to the queues as entry points to services
import { createSQSHandler, createDynamoDBStreamHandler } from "@utils/tools/custom-handler";
import { reviewWebsiteAdapter } from "@agent-plane/website-reviewer/adapters/primary/review-website.adapter";
import { createValueStrategyAdapter } from "@agent-plane/value-strategist/adapters/primary/create-value-strategy.adapter";
import { createTechStrategyAdapter } from "@agent-plane/technical-strategist/adapters/primary/create-tech-strategy.adapter";
import { createStrategyAdapter } from "@agent-plane/growth-strategist/adapters/primary/create-strategy.adapter";
import { processDeliverableStreamAdapter } from "@agent-plane/order-manager/adapters/primary/process-deliverable-stream.adapter";
import { generateEmailSequenceAdapter } from "@agent-plane/email-sequence-writer/adapters/primary/generate-email-sequence.adapter";

export const reviewWebsiteHandler = createSQSHandler(reviewWebsiteAdapter);
export const valueStrategyHandler = createSQSHandler(createValueStrategyAdapter);
export const techStrategyHandler = createSQSHandler(createTechStrategyAdapter);
export const growthStrategyHandler = createSQSHandler(createStrategyAdapter);
export const processDeliverableStreamHandler = createDynamoDBStreamHandler(processDeliverableStreamAdapter);
export const emailSequenceHandler = createSQSHandler(generateEmailSequenceAdapter);