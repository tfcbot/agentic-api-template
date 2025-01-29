import { apiKeyAdapter } from "@control-plane/billing/adapters/secondary/api-key.adapter";
import { UpdateApiKeyCommand } from "@utils/metadata/apikey.schema";
import { UpdateRemainingCreditsCommand } from "@utils/metadata/credit.schema";

export async function checkoutSessionCompletedUseCase(input: UpdateApiKeyCommand) {
    try {
        await apiKeyAdapter.updateApiKey(input);
        const remainCredtsUpdateCommand: UpdateRemainingCreditsCommand = {
            keyId: input.keyId,
            amount: input.refill.amount,
            operationType: "increment"
        }
        await apiKeyAdapter.updateRemainingCredits(remainCredtsUpdateCommand);
        return { message: "OK" }
    } catch (error) {
        console.error(error);
        return { message: "Internal server error" }
    }
}