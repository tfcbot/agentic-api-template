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


export const RequestOnePageValueInputSchema = z.object({
  userId: z.string(),
  orderId: z.string(),
  deliverableId: z.string(),
  applicationIdea: z.string(),
  idealCustomer: z.string(),
  problem: z.string(),
  solution: z.string()
});


export const DeliverableSchema = z.object({
  deliverableId: z.string(),
  deliverableContent: ValueStrategySchema,
});


export const DeliverableDTO = z.object({
  userId: z.string(),
  deliverableId: z.string(),
  deliverableContent: ValueStrategySchema
});

export const RequestOnePageValueOutputSchema = z.object({
  value: z.string(),
  deliverableId: z.string(),
});

export type RequestOnePageValueInput = z.infer<typeof RequestOnePageValueInputSchema>;
export type RequestOnePageValueOutput = z.infer<typeof RequestOnePageValueOutputSchema>;
export type Deliverable = z.infer<typeof DeliverableSchema>;
export type DeliverableDTO = z.infer<typeof DeliverableDTO>;

