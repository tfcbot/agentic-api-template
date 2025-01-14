import { z } from 'zod';


export const GrowthStrategySchema = z.object({
  distributionChannels: z.array(z.string()),
  customerJourney: z.string(),
  firstTenCustomers: z.string(),
  firstHundredCustomers: z.string(),
  growthStrategies: z.string()
});



export const RequestOnePageGrowthInputSchema = z.object({
    userId: z.string(),
    orderId: z.string(),
    applicationIdea: z.string(),
    idealCustomer: z.string(),
    targetAnnualRevenue: z.number()
  });
  
  

export const RequestOnePageGrowthOutputSchema = z.object({
  strategy: z.string(),
});


export const DeliverableSchema = z.object({
  deliverableId: z.string(),
  deliverableContent: GrowthStrategySchema, 
});

export const DeliverableDTOSchema = z.object({
  userId: z.string(),
  deliverableId: z.string(),
  deliverableContent: GrowthStrategySchema, 
});

export type RequestOnePageGrowthInput = z.infer<typeof RequestOnePageGrowthInputSchema>;
export type RequestOnePageGrowthOutput = z.infer<typeof RequestOnePageGrowthOutputSchema>;
export type Deliverable = z.infer<typeof DeliverableSchema>;
export type DeliverableDTO = z.infer<typeof DeliverableDTOSchema>;