import {z} from 'zod';
import { HttpResponseParams, HttpStatusCode, createHttpResponse, HttpResponses } from "@utils/tools/http-status";
import { GetRemainingCreditsOutput } from './credits.schema';
import { GetWebsiteReviewsOutput, WebsiteReviewSchema } from './agent-plane.schema';

export const WebsiteReviewRequestReceivedResponseBodySchema = z.object({
    reviewId: z.string(),
    url: z.string(),
});

export const UserWebsiteReviewsResponseBodySchema = z.object({
    reviews: z.array(WebsiteReviewSchema),
});

export const UserRemainingCreditsResponseBodySchema = z.object({
    remainingCredits: z.number(),
});

export const OrderResponseBodySchema = z.object({
    orderId: z.string(),
    orderStatus: z.string(),
    orderCreatedAt: z.string(),
    deliverableName: z.string(),
});

export const DeliverableResponseBodySchema = z.object({
    deliverableId: z.string(),
    deliverableContent: z.string(), 
});

export const GetOrdersResponseBodySchema = z.object({
    data: z.array(OrderResponseBodySchema),
});

export const GetDeliverableResponseBodySchema = z.object({
    data: DeliverableResponseBodySchema,
});

export const OnboardingMessagePublishedResponseBodySchema = z.object({
    message: z.string(),
});

export type WebsiteReviewRequestReceivedResponseBody = z.infer<typeof WebsiteReviewRequestReceivedResponseBodySchema>;
export type UserWebsiteReviewsResponseBody = z.infer<typeof UserWebsiteReviewsResponseBodySchema>;
export type UserRemainingCreditsResponseBody = z.infer<typeof UserRemainingCreditsResponseBodySchema>;
export type OrderResponseBody = z.infer<typeof OrderResponseBodySchema>;
export type DeliverableResponseBody = z.infer<typeof DeliverableResponseBodySchema>;
export type GetOrdersResponseBody = z.infer<typeof GetOrdersResponseBodySchema>;
export type GetDeliverableResponseBody = z.infer<typeof GetDeliverableResponseBodySchema>;
export type OnboardingMessagePublishedResponseBody = z.infer<typeof OnboardingMessagePublishedResponseBodySchema>;

export const OrchestratorHttpResponses = {
    ...HttpResponses,
    WebsiteReviewRequestReceived: (params: HttpResponseParams<WebsiteReviewRequestReceivedResponseBody>) => 
      createHttpResponse(HttpStatusCode.CREATED, params),
    UserWebsiteReviews: (params: HttpResponseParams<GetWebsiteReviewsOutput>) => 
      createHttpResponse(HttpStatusCode.OK, params),
    UserRemainingCredits: (params: HttpResponseParams<GetRemainingCreditsOutput>) => 
      createHttpResponse(HttpStatusCode.OK, params),
    OrderCreated: (params: HttpResponseParams<GetOrdersResponseBody>) => 
      createHttpResponse(HttpStatusCode.OK, params),
    GetDeliverableResponse: (params: HttpResponseParams<GetDeliverableResponseBody>) => 
      createHttpResponse(HttpStatusCode.OK, params),
    GetOrdersResponse: (params: HttpResponseParams<GetOrdersResponseBody>) => 
      createHttpResponse(HttpStatusCode.OK, params),
    GrowthStrategyRequestReceived: (params: HttpResponseParams<OrderResponseBody>) => 
      createHttpResponse(HttpStatusCode.CREATED, params),
    ValueStrategyRequestReceived: (params: HttpResponseParams<OrderResponseBody>) => 
      createHttpResponse(HttpStatusCode.CREATED, params),
    TechStrategyRequestReceived: (params: HttpResponseParams<OrderResponseBody>) => 
      createHttpResponse(HttpStatusCode.CREATED, params),
    EmailSequenceRequestReceived: (params: HttpResponseParams<OrderResponseBody>) => 
      createHttpResponse(HttpStatusCode.CREATED, params),
    OnboardingMessagePublished: (params: HttpResponseParams<OnboardingMessagePublishedResponseBody>) => 
      createHttpResponse(HttpStatusCode.CREATED, params),
};  
  