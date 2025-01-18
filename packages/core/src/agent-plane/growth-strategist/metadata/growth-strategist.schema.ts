import { z } from 'zod';


export const GrowthStrategySchema = z.object({
  sections: z.object({
    distributionChannels: z.object({
      id: z.string(),
      label: z.string(),
      type: z.literal('list'),
      description: z.string().optional(),
      data: z.array(z.string())
    }),
    customerJourney: z.object({
      id: z.string(),
      label: z.string(),
      type: z.literal('text'),
      description: z.string().optional(),
      data: z.string()
    }),
    firstTenCustomers: z.object({
      id: z.string(),
      label: z.string(),
      type: z.literal('text'),
      description: z.string().optional(),
      data: z.string()
    }),
    firstHundredCustomers: z.object({
      id: z.string(),
      label: z.string(),
      type: z.literal('text'),
      description: z.string().optional(),
      data: z.string()
    }),
    growthStrategies: z.object({
      id: z.string(),
      label: z.string(),
      type: z.literal('text'),
      description: z.string().optional(),
      data: z.string()
    })
  })
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
  deliverableTitle: z.string(),
  deliverableContent: GrowthStrategySchema, 
});

export const DeliverableDTOSchema = BasePayloadSchema.extend({
  deliverableTitle: z.string(),
  deliverableContent: GrowthStrategySchema, 
});

export type RequestGrowthStrategyInput = z.infer<typeof RequestGrowthStrategyInputSchema>;
export type RequestGrowthStrategyOutput = z.infer<typeof RequestGrowthStrategyOutputSchema>;
export type Deliverable = z.infer<typeof DeliverableSchema>;
export type DeliverableDTO = z.infer<typeof DeliverableDTOSchema>;
