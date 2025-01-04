import { IApiKeyManager, apiKeyManager } from "@utils/tools/api-key-manager";
import { CreateApiKeyCommandInput, CreateApiKeyCommandOutput, DeleteApiKeyCommandInput, SaveApiKeyCommand } from "@utils/metadata/apikey.schema";
import { UpdateRemainingCreditsCommand, UpdateRemainingCreditsCommandOutput } from "@utils/metadata/credit.schema";
import { GetApiKeyCommandOutput } from "@utils/metadata/apikey.schema";
import { Message } from "@utils/metadata/message.schema";
<<<<<<< Updated upstream
import { UpdateApiKeyCommand, UpdateApiKeyCommandOutput } from "@utils/metadata/apikey.schema";



=======
import { ApiKey } from "@control-plane/user/metadata/api-key.schema";
>>>>>>> Stashed changes

export interface IApiKeyAdapter {
    createApiKey(params: CreateApiKeyCommandInput): Promise<CreateApiKeyCommandOutput>;
    saveApiKey(params: SaveApiKeyCommand): Promise<Message>;
    updateRemainingCredits(params: UpdateRemainingCreditsCommand): Promise<UpdateRemainingCreditsCommandOutput>;
    getApiKeyById(keyId: string): Promise<GetApiKeyCommandOutput>;
    deleteApiKey(params: DeleteApiKeyCommandInput): Promise<Message>;
<<<<<<< Updated upstream
    updateApiKey(params: UpdateApiKeyCommand): Promise<UpdateApiKeyCommandOutput>;
=======
>>>>>>> Stashed changes
}

export class ApiKeyAdapter implements IApiKeyAdapter {
    private apiKeyManager: IApiKeyManager;

    constructor() {
        this.apiKeyManager = apiKeyManager;
    }

    async getApiKeyById(keyId: string): Promise<GetApiKeyCommandOutput> {
        return this.apiKeyManager.getApiKeyById(keyId);
    }

    async createApiKey(params: CreateApiKeyCommandInput): Promise<CreateApiKeyCommandOutput> {
        return this.apiKeyManager.createApiKey(params);
    }

    async saveApiKey(params: SaveApiKeyCommand): Promise<Message> {
        return this.apiKeyManager.saveApiKey(params);
    }

    async updateRemainingCredits(params: UpdateRemainingCreditsCommand): Promise<UpdateRemainingCreditsCommandOutput> {
        return this.apiKeyManager.updateRemainingCredits(params);
    }

    async getRemainingCredits(keyId: string): Promise<number> {
        const apiKey = await this.apiKeyManager.getApiKeyById(keyId);
        return apiKey.remaining || 0;
    }

    async deleteApiKey(params: DeleteApiKeyCommandInput): Promise<Message> {
        return this.apiKeyManager.deleteApiKey(params);
    }

<<<<<<< Updated upstream
    async updateApiKey(params: UpdateApiKeyCommand): Promise<UpdateApiKeyCommandOutput> {
        return this.apiKeyManager.updateApiKey(params);
=======
    async updateApiKey(keyId: string, updateData: Partial<ApiKey>): Promise<ApiKey> {
       throw new Error('Method not implemented.');
>>>>>>> Stashed changes
    }
}

export const apiKeyAdapter = new ApiKeyAdapter();
        