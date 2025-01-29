import { updateRemainingCreditsUseCase } from '@control-plane/billing/usecases/update-remaining-credits.usecase';
import { UpdateRemainingCreditsInput, UpdateRemainingCreditsInputSchema } from '@control-plane/billing/metadata/credits.schema';

export class UpdateCreditsAdapter {
  async updateRemainingCredits(input: UpdateRemainingCreditsInput): Promise<void> {
    
    await updateRemainingCreditsUseCase(input);
  }
}

export const updateCreditsAdapter = new UpdateCreditsAdapter();
