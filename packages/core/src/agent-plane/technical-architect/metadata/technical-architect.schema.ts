import { z } from 'zod';

export const RequestOnePageSpecInputSchema = z.object({
  userId: z.string(),
  orderId: z.string(),
  useCases: z.string(),
  nonFunctional: z.string(),
});


export const RequestOnePageSpecOutputSchema = z.object({
  spec: z.string(),
});


export const DeliverableSchema = z.object({
  userId: z.string(),
  deliverableId: z.string(),
  deliverableContent: z.object({}),
});

export type RequestOnePageSpecInput = z.infer<typeof RequestOnePageSpecInputSchema>;
export type RequestOnePageSpecOutput = z.infer<typeof RequestOnePageSpecOutputSchema>;