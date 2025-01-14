// Responsible for handling entry point API Gateway events and sending them to the appropriate queue
import { createHandler } from "@utils/tools/custom-handler"
import { requestWebsiteReviewAdapter } from "@orchestrator/adapters/primary/request-website-review.adapter";
import { getRemainingCreditsAdapter } from "@orchestrator/adapters/primary/get-remaining-credits.adapter";
import { getOrdersAdapter } from "@orchestrator/adapters/primary/get-orders.adapter";
import { getDeliverableAdapter } from "@orchestrator/adapters/primary/get-deliverable.adapter";
import { requestOnePageGrowthAdapter } from "@orchestrator/adapters/primary/request-one-page-growth.adapter";
import { requestOnePageTechAdapter } from "@orchestrator/adapters/primary/request-one-page-tech.adapter";
import { requestOnePageValueAdapter } from "@orchestrator/adapters/primary/request-one-page-value.adapter";

export const handleRequestWebsiteReview = createHandler(requestWebsiteReviewAdapter);
export const handleGetUserCredits = createHandler(getRemainingCreditsAdapter);
export const handleGetOrders = createHandler(getOrdersAdapter);
export const handleGetDeliverable = createHandler(getDeliverableAdapter);
export const handleRequestOnePageGrowth = createHandler(requestOnePageGrowthAdapter);
export const handleRequestOnePageTech = createHandler(requestOnePageTechAdapter);
export const handleRequestOnePageValue = createHandler(requestOnePageValueAdapter);
