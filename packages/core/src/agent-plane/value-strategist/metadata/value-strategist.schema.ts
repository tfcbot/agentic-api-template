import { z } from "zod";

export const ValueStrategySchema = z.object({
  ideal_customer: z.string(),
  problem: z.string(),
  value_proposition: z.string(),
  profit_proposition: z.string(),
  people_proposition: z.string(),
  core_benefit: z.string(),
  core_feature: z.string(),
  solution_overview: z.string(),
  benefit_breakdown: z.array(z.string()),
  first_order: z.string(),
  second_order: z.string(),
});

export const BasePayloadSchema = z.object({
  userId: z.string(),
  orderId: z.string(),
  deliverableId: z.string(),
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


export const DeliverableDTO = BasePayloadSchema.extend({
  deliverableContent: ValueStrategySchema
});

export const RequestValueStrategyOutputSchema = z.object({
  value: z.string(),
});

export type RequestValueStrategyInput = z.infer<typeof RequestValueStrategyInputSchema>;
export type RequestValueStrategyOutput = z.infer<typeof RequestValueStrategyOutputSchema>;
export type Deliverable = z.infer<typeof DeliverableSchema>;
export type DeliverableDTO = z.infer<typeof DeliverableDTO>;

