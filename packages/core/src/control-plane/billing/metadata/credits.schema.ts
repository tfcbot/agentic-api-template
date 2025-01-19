import { z } from 'zod';

export const GetRemainingCreditsInputSchema = z.object({
  keyId: z.string(),
});

export const UpdateRemainingCreditsInputSchema = z.object({
  keyId: z.string(),
  credits: z.number().int().nonnegative(),
});

export const GetRemainingCreditsOutputSchema = z.object({
  credits: z.number().int().nonnegative(),
});

export type GetRemainingCreditsInput = z.infer<typeof GetRemainingCreditsInputSchema>;
export type GetRemainingCreditsOutput = z.infer<typeof GetRemainingCreditsOutputSchema>;
export type UpdateRemainingCreditsInput = z.infer<typeof UpdateRemainingCreditsInputSchema>;