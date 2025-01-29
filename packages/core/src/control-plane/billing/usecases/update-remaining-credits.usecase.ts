import { apiKeyAdapter } from '@control-plane/billing/adapters/secondary/api-key.adapter';
import { UpdateRemainingCreditsCommand } from '@utils/metadata/credit.schema';
import { UpdateRemainingCreditsInput } from '@control-plane/billing/metadata/credits.schema';

export const    updateRemainingCreditsUseCase = async (input: UpdateRemainingCreditsInput): Promise<void> => {
  console.info("--- Using Credit for User ---");
  try {
    const apiKey = await apiKeyAdapter.getApiKeyById(input.keyId);
    
    if (!apiKey) {
      throw new Error('Api Key not found');
    }

    const updateCommand: UpdateRemainingCreditsCommand = {
      keyId: apiKey.id,
      amount: input.credits,
      operationType: "decrement"
    };

    await apiKeyAdapter.updateRemainingCredits(updateCommand);

  } catch (error) {
    console.error('Error using credit:', error);
    throw new Error('Failed to use credit');
  }
};
