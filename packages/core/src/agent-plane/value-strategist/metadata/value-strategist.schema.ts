import { z } from "zod";

export const ValueStrategySchema = z.object({
  deliverableName: z.string(),
  sections: z.object({
    idealCustomer: z.object({
      id: z.string(),
      label: z.string(), 
      type: z.literal('text'),
      description: z.string().optional(),
      data: z.string()
    }),
    problem: z.object({
      id: z.string(),
      label: z.string(),
      type: z.literal('text'), 
      description: z.string().optional(),
      data: z.string()
    }),
    valueProposition: z.object({
      id: z.string(),
      label: z.string(),
      type: z.literal('text'),
      description: z.string().optional(),
      data: z.string()
    }),
    profitProposition: z.object({
      id: z.string(),
      label: z.string(),
      type: z.literal('text'),
      description: z.string().optional(),
      data: z.string()
    }),
    peopleProposition: z.object({
      id: z.string(),
      label: z.string(),
      type: z.literal('text'),
      description: z.string().optional(),
      data: z.string()
    }),
    coreBenefit: z.object({
      id: z.string(),
      label: z.string(),
      type: z.literal('text'),
      description: z.string().optional(),
      data: z.string()
    }),
    coreFeature: z.object({
      id: z.string(),
      label: z.string(),
      type: z.literal('text'),
      description: z.string().optional(),
      data: z.string()
    }),
    solutionOverview: z.object({
      id: z.string(),
      label: z.string(),
      type: z.literal('text'),
      description: z.string().optional(),
      data: z.string()
    }),
    benefitBreakdown: z.object({
      id: z.string(),
      label: z.string(),
      type: z.literal('list'),
      description: z.string().optional(),
      data: z.array(z.string())
    }),
    firstOrder: z.object({
      id: z.string(),
      label: z.string(),
      type: z.literal('text'),
      description: z.string().optional(),
      data: z.string()
    }),
    secondOrder: z.object({
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
  deliverableName: z.string(),
});

export const RequestValueStrategyInputSchema = BasePayloadSchema.extend({
  applicationIdea: z.string(),
  idealCustomer: z.string(),
  problem: z.string(),
  solution: z.string()
});


export const DeliverableSchema = z.object({
  deliverableContent: ValueStrategySchema,
});


export const DeliverableDTOSchema = BasePayloadSchema.extend({
  deliverableContent: ValueStrategySchema
});

export const RequestValueStrategyOutputSchema = z.object({
  value: z.string(),
});

export type RequestValueStrategyInput = z.infer<typeof RequestValueStrategyInputSchema>;
export type RequestValueStrategyOutput = z.infer<typeof RequestValueStrategyOutputSchema>;
export type Deliverable = z.infer<typeof DeliverableSchema>;
export type DeliverableDTO = z.infer<typeof DeliverableDTOSchema>;

