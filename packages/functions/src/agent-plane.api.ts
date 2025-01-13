// Lambda Handlers attached to the queues as entry points to services
import { createSQSHandler } from "@utils/tools/custom-handler";
import { reviewWebsiteAdapter } from "@agent-plane/website-reviewer/adapters/primary/review-website.adapter";
import { createValueSpecAdapter } from "@agent-plane/value-strategist/adapters/primary/create-value-spec.adapter";
import { createTechStrategyAdapter } from "@agent-plane/technical-architect/adapters/primary/create-tech-strategy.adapter";
import { createStrategyAdapter } from "@agent-plane/growth-strategist/adapters/primary/create-strategy.adapter";

export const websiteReviewHandler = createSQSHandler(reviewWebsiteAdapter);
export const valueStrategyHandler = createSQSHandler(createValueSpecAdapter);
export const techStrategyHandler = createSQSHandler(createTechStrategyAdapter);
export const growthStrategyHandler = createSQSHandler(createStrategyAdapter);

