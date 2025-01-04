import { apiKeyAdapter } from "@control-plane/billing/adapters/secondary/api-key.adapter";

export async function checkoutSessionCompletedUseCase(input: any) {	
    await apiKeyAdapter.updateApiKey(input);	
    return {statusCode: 200, body: "OK"}	
}