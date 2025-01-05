import { z } from 'zod';



export const GetRemainingCreditsInputSchema = z.object({
  keyId: z.string(),
});

<<<<<<< Updated upstream

=======
export type GetRemainingCreditsInput = z.infer<typeof GetRemainingCreditsInputSchema>;
>>>>>>> Stashed changes

export const GetRemainingCreditsOutputSchema = z.object({
  credits: z.number(),
});

<<<<<<< Updated upstream

=======
export type GetRemainingCreditsOutput = z.infer<typeof GetRemainingCreditsOutputSchema>;
>>>>>>> Stashed changes

// New schemas for returning credits
export const ReturnCreditsTaskSchema = z.object({
  apiKey: z.string(),
  amount: z.number().positive(),
});

<<<<<<< Updated upstream


export type ReturnCreditsTask = z.infer<typeof ReturnCreditsTaskSchema>;
export type GetRemainingCreditsInput = z.infer<typeof GetRemainingCreditsInputSchema>;
export type GetRemainingCreditsOutput = z.infer<typeof GetRemainingCreditsOutputSchema>;
=======
export type ReturnCreditsTask = z.infer<typeof ReturnCreditsTaskSchema>;
>>>>>>> Stashed changes
