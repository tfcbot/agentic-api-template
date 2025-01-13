import {z} from 'zod';
import { HttpResponseParams, HttpStatusCode, createHttpResponse, HttpResponses } from "@utils/tools/http-status";
import { GetOrdersOutput, GetWebsiteReviewsOutput, RequestOnePageGrowthInput, WebsiteReviewSchema } from './agent-plane.schema';
import { GetRemainingCreditsOutput } from './credits.schema';


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
});

export const DeliverableResponseBodySchema = z.object({
    deliverableId: z.string(),
    deliverableContent: z.string(), 
});

export const GetOrdersResponseBodySchema = z.object({
    orders: z.array(OrderResponseBodySchema),
});

export const GetDeliverableResponseBodySchema = z.object({
    deliverable: DeliverableResponseBodySchema,
});

export type WebsiteReviewRequestReceivedResponseBody = z.infer<typeof WebsiteReviewRequestReceivedResponseBodySchema>;
export type UserWebsiteReviewsResponseBody = z.infer<typeof UserWebsiteReviewsResponseBodySchema>;
export type UserRemainingCreditsResponseBody = z.infer<typeof UserRemainingCreditsResponseBodySchema>;
export type OrderResponseBody = z.infer<typeof OrderResponseBodySchema>;
export type DeliverableResponseBody = z.infer<typeof DeliverableResponseBodySchema>;
export type GetOrdersResponseBody = z.infer<typeof GetOrdersResponseBodySchema>;
export type GetDeliverableResponseBody = z.infer<typeof GetDeliverableResponseBodySchema>;

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
    GetDeliverableOutput: (params: HttpResponseParams<GetDeliverableResponseBody>) => 
      createHttpResponse(HttpStatusCode.OK, params),
    OnePageGrowthRequestReceived: (params: HttpResponseParams<OrderResponseBody>) => 
      createHttpResponse(HttpStatusCode.OK, params),
    OnePageValueRequestReceived: (params: HttpResponseParams<OrderResponseBody>) => 
      createHttpResponse(HttpStatusCode.OK, params),
    OnePageSpecRequestReceived: (params: HttpResponseParams<OrderResponseBody>) => 
      createHttpResponse(HttpStatusCode.OK, params),
  };  
  