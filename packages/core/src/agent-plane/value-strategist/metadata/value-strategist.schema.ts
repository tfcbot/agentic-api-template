import { z } from "zod";

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
    userId: z.string(),
    deliverableId: z.string(),
    deliverableContent: z.object({}), 
  });

export const RequestOnePageValueOutputSchema = z.object({
    value: z.string(),
    deliverableId: z.string(),
  });

  export type RequestOnePageValueInput = z.infer<typeof RequestOnePageValueInputSchema>;
  export type RequestOnePageValueOutput = z.infer<typeof RequestOnePageValueOutputSchema>;
  export type Deliverable = z.infer<typeof DeliverableSchema>;