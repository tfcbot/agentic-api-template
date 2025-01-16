// Responsible for handling entry point API Gateway events and sending them to the appropriate queue
import { createHandler } from "@utils/tools/custom-handler"
import { requestWebsiteReviewAdapter } from "@orchestrator/adapters/primary/request-website-review.adapter";
import { getRemainingCreditsAdapter } from "@orchestrator/adapters/primary/get-remaining-credits.adapter";
import { getOrdersAdapter } from "@orchestrator/adapters/primary/get-orders.adapter";
import { getDeliverableAdapter } from "@orchestrator/adapters/primary/get-deliverable.adapter";
import { requestGrowthStrategyAdapter } from "@orchestrator/adapters/primary/request-growth-strategy.adapter";
import { requestTechStrategyAdapter } from "@orchestrator/adapters/primary/request-tech-strategy.adapter";
import { requestValueStrategyAdapter } from "@orchestrator/adapters/primary/request-value-strategy.adapter";

export const handleRequestWebsiteReview = createHandler(requestWebsiteReviewAdapter);
export const handleGetUserCredits = createHandler(getRemainingCreditsAdapter);
export const handleGetOrders = createHandler(getOrdersAdapter);
export const handleGetDeliverable = createHandler(getDeliverableAdapter);
export const handleRequestGrowthStrategy = createHandler(requestGrowthStrategyAdapter);
export const handleRequestTechStrategy = createHandler(requestTechStrategyAdapter);
export const handleRequestValueStrategy = createHandler(requestValueStrategyAdapter);
