import { z } from 'zod';
import { RequestValueStrategyInputSchema } from './agent-plane.schema';
import { RequestGrowthStrategyInputSchema } from './agent-plane.schema';
import { RequestTechStrategyInputSchema } from './agent-plane.schema';

export enum Status {
    Pending = 'Pending',
    InProgress = 'InProgress',
    Completed = 'Completed',
    Failed = 'Failed',
}

export enum Queue {
    content = 'content',
    websiteReview = 'websiteReview',
    valueStrategy = 'valueStrategy',
    growthStrategy = 'growthStrategy',
    techStrategy = 'techStrategy',
}

export enum Topic {
    orders = 'orders',
}

  export const OrderSchema = z.object({
    topic: z.nativeEnum(Topic),
    queue: z.nativeEnum(Queue),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    payload: z.object({
      orderId: z.string(),
      userId: z.string(),
      deliverableId: z.string(),
    })
})


export const WebsiteReviewOrderSchema = OrderSchema.extend({
  payload: z.object({
    userId: z.string(),
    url: z.string(),
  }),
});


export const ValueStrategyOrderSchema = OrderSchema.extend({
  payload: RequestValueStrategyInputSchema,
});

export const GrowthStrategyOrderSchema = OrderSchema.extend({
  payload: RequestGrowthStrategyInputSchema,
});

export const TechStrategyOrderSchema = OrderSchema.extend({
  payload: RequestTechStrategyInputSchema,
});


export type WebsiteReviewOrder = z.infer<typeof WebsiteReviewOrderSchema>
export type Order = z.infer<typeof OrderSchema>
export type ValueStrategyOrder = z.infer<typeof ValueStrategyOrderSchema>
export type GrowthStrategyOrder = z.infer<typeof GrowthStrategyOrderSchema>
export type TechStrategyOrder = z.infer<typeof TechStrategyOrderSchema>



export type OrderType =
  | WebsiteReviewOrder
  | ValueStrategyOrder
  | GrowthStrategyOrder
  | TechStrategyOrder;