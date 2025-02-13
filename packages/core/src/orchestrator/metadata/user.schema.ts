import { z } from "zod";
import { GetRemainingCreditsInput, GetRemainingCreditsOutput } from "./credits.schema";




export const BaseTaskPayloadSchema = z.object({
    taskId: z.string(),
    userId: z.string(),
  });

  
export const OnboardUserInputSchema = BaseTaskPayloadSchema.extend({
    userId: z.string(),
    onboardingComplete: z.boolean(),
    onboardingDetails: z.object({
        useCase: z.string(),
    })
})



export type OnboardUserInput = z.infer<typeof OnboardUserInputSchema>;

export interface IUserAdapter {
    getRemainingCredits(input: GetRemainingCreditsInput): Promise<GetRemainingCreditsOutput>;
}


