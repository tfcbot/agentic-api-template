import { z } from "zod";

export const AgentSchema = z.object({
  id: z.string(),
  name: z.string(),
  title: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  startingPrice: z.number(),
  available: z.boolean(),
  keyDeliverables: z.array(z.string())
});

export const ReviewWebsiteInputSchema = z.object({
  userId: z.string(),
  url: z.string()
});

export const GetWebsiteReviewsInputSchema = z.object({
  userId: z.string(),
  websiteUrl: z.string()
});

export const ReviewWebsiteOutputSchema = z.object({
  review: z.string()
});



export const WebsiteReviewSchema = z.object({
  userId: z.string(),
  websiteUrl: z.string(),
  createdAt: z.string(),
  copywriting_analysis: z.object({
    headline_effectiveness: z.object({
      clarity: z.string(),
      benefit_focused: z.string(),
      urgency_factor: z.string(),
      emotional_appeal: z.number().min(0).max(10)
    }),
    value_proposition: z.object({
      unique_selling_points: z.array(z.string()),
      benefit_clarity: z.string(),
      pain_point_addressing: z.string()
    }),
    persuasion_elements: z.object({
      social_proof: z.string(),
      credibility_indicators: z.string(),
      risk_reducers: z.string()
    }),
    call_to_action: z.object({
      clarity: z.string(),
      placement: z.string(),
      compelling_factor: z.string()
    }),
    content_engagement: z.object({
      readability: z.string(),
      scannability: z.string(),
      emotional_triggers: z.array(z.string())
    }),
    conversion_optimization: z.object({
      friction_points: z.array(z.string()),
      trust_elements: z.string()
    }),
    recommendations: z.array(z.string())
  }),
});

export const GetWebsiteReviewsOutputSchema = z.object({
  reviews: z.array(WebsiteReviewSchema)
});

export const OrderSchema = z.object({
  orderId: z.string(),
  orderStatus: z.string(),
  orderCreatedAt: z.string(),
  orderUpdatedAt: z.string(),
  deliverableId: z.string(),
});

export const GetOrdersInputSchema = z.object({
  userId: z.string()
});

export const GetOrdersOutputSchema = z.object({
  data: z.array(OrderSchema)
});

export const GetDeliverableInputSchema = z.object({
  orderId: z.string(),
});


export const GetDeliverableOutputSchema = z.object({
  deliverableId: z.string(),
  deliverableContent: z.string()
});


export const BasePayloadSchema = z.object({
  orderId: z.string(),
  userId: z.string(),
  deliverableId: z.string(),
});

export const RequestTechStrategyInputSchema = BasePayloadSchema.extend({
  useCases: z.string(),
  nonFunctional: z.string(),
});


export const RequestValueStrategyInputSchema = BasePayloadSchema.extend({
  applicationIdea: z.string(),
  idealCustomer: z.string(),
  problem: z.string(),
  solution: z.string()
});

export const RequestGrowthStrategyInputSchema = BasePayloadSchema.extend({
  applicationIdea: z.string(),
  idealCustomer: z.string(),
  targetAnnualRevenue: z.number()
});






export type Agent = z.infer<typeof AgentSchema>;
export type ReviewWebsiteInput = z.infer<typeof ReviewWebsiteInputSchema>;
export type ReviewWebsiteOutput = z.infer<typeof ReviewWebsiteOutputSchema>;
export type GetWebsiteReviewsInput = z.infer<typeof GetWebsiteReviewsInputSchema>;
export type GetWebsiteReviewsOutput = z.infer<typeof GetWebsiteReviewsOutputSchema>;
export type WebsiteReview = z.infer<typeof WebsiteReviewSchema>;
export type RequestGrowthStrategyInput = z.infer<typeof RequestGrowthStrategyInputSchema>;
export type RequestValueStrategyInput = z.infer<typeof RequestValueStrategyInputSchema>;
export type RequestTechStrategyInput = z.infer<typeof RequestTechStrategyInputSchema>;
export type GetDeliverableInput = z.infer<typeof GetDeliverableInputSchema>;
export type GetDeliverableOutput = z.infer<typeof GetDeliverableOutputSchema>;
export type GetOrdersInput = z.infer<typeof GetOrdersInputSchema>;
export type GetOrdersOutput = z.infer<typeof GetOrdersOutputSchema>;