import { z } from 'zod';

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
  userId: z.string(),
  deliverableId: z.string(),
  deliverableContent: z.object({}), 
});

export type RequestOnePageGrowthInput = z.infer<typeof RequestOnePageGrowthInputSchema>;
export type RequestOnePageGrowthOutput = z.infer<typeof RequestOnePageGrowthOutputSchema>;
export type Deliverable = z.infer<typeof DeliverableSchema>;