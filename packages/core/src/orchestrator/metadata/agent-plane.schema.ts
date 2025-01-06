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



export type Agent = z.infer<typeof AgentSchema>;
export type ReviewWebsiteInput = z.infer<typeof ReviewWebsiteInputSchema>;
export type ReviewWebsiteOutput = z.infer<typeof ReviewWebsiteOutputSchema>;
export type GetWebsiteReviewsInput = z.infer<typeof GetWebsiteReviewsInputSchema>;
export type GetWebsiteReviewsOutput = z.infer<typeof GetWebsiteReviewsOutputSchema>;
export type WebsiteReview = z.infer<typeof WebsiteReviewSchema>;