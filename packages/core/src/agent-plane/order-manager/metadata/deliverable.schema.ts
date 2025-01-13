import { z } from 'zod';

export const GetDeliverableInputSchema = z.object({
    orderId: z.string(),
    deliverableId: z.string()
  });
  
  
  export const GetDeliverableOutputSchema = z.object({
    deliverableId: z.string(),
    deliverableContent: z.string()
  });
  

export type GetDeliverableInput = z.infer<typeof GetDeliverableInputSchema>;
export type GetDeliverableOutput = z.infer<typeof GetDeliverableOutputSchema>;
