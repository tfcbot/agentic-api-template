import { z } from 'zod';


export const GrowthStrategySchema = z.object({
  distributionChannels: z.array(z.string()),
  customerJourney: z.string(),
  firstTenCustomers: z.string(),
  firstHundredCustomers: z.string(),
  growthStrategies: z.string()
});

export const BasePayloadSchema = z.object({ 
  userId: z.string(),
  orderId: z.string(),
  deliverableId: z.string(),
});

export const RequestGrowthStrategyInputSchema = BasePayloadSchema.extend({
    applicationIdea: z.string(),
    idealCustomer: z.string(),
    targetAnnualRevenue: z.number()
  });
  
  

export const RequestGrowthStrategyOutputSchema = z.object({
  strategy: z.string(),
});


export const DeliverableSchema = z.object({
  deliverableContent: GrowthStrategySchema, 
});

export const DeliverableDTOSchema = BasePayloadSchema.extend({
  deliverableContent: GrowthStrategySchema, 
});

export type RequestGrowthStrategyInput = z.infer<typeof RequestGrowthStrategyInputSchema>;
export type RequestGrowthStrategyOutput = z.infer<typeof RequestGrowthStrategyOutputSchema>;
export type Deliverable = z.infer<typeof DeliverableSchema>;
export type DeliverableDTO = z.infer<typeof DeliverableDTOSchema>;
