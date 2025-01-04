import { Unkey, verifyKey } from "@unkey/api";
import { 
  DynamoDBDocumentClient, 
  PutCommand, 
  QueryCommand 
} from "@aws-sdk/lib-dynamodb";
import {
  GetApiKeyCommandInput,
  GetApiKeyCommandOutput,
  CreateApiKeyCommandInput,
  CreateApiKeyCommandOutput,
  UpdateApiKeyCommandInput,
  DeleteApiKeyCommandInput,
  UpdateApiKeyCommandOutput,
  DeleteApiKeyCommandOutput,
  SaveApiKeyCommand,
  SaveApiKeyCommandOutput,
  ValidateApiKeyCommand,
<<<<<<< Updated upstream
  UpdateApiKeyCommand,
=======
>>>>>>> Stashed changes

} from "@utils/metadata/apikey.schema";
import {
  ValidUser,
  GetUserDetailsByApiKeyCommand,
  GetUserDetailsByKeyIdCommand
} from "@utils/metadata/saas-identity.schema";
import {
  UpdateRemainingCreditsCommand,
  UpdateRemainingCreditsCommandOutput
} from "@utils/metadata/credit.schema";
// @ts-ignore
import { Resource } from "sst";
import { Message } from "../metadata/message.schema";

export interface IApiKeyRepository {
  getUserDetailsByApiKey(command: GetUserDetailsByApiKeyCommand): Promise<ValidUser>
  getUserDetailsByKeyId(command: GetUserDetailsByKeyIdCommand): Promise<ValidUser>
  saveApiKey(command: SaveApiKeyCommand): Promise<void>
}

export class ApiKeyRepository implements IApiKeyRepository {
  private apiId: string;

  constructor(private dbClient: DynamoDBDocumentClient) {
    const apiId = Resource.UnkeyApiId.value;
    if (!apiId) {
      throw new Error('UNKEY_API_ID environment variable is not set');
    }
    this.apiId = apiId;
  }

  async getUserDetailsByApiKey(command: GetUserDetailsByApiKeyCommand): Promise<ValidUser> {
    try {
      const params = {
<<<<<<< Updated upstream
        TableName: Resource.ApiKeysTable.tableName,
=======
        TableName: Resource.ApiKeys.tableName,
>>>>>>> Stashed changes
        IndexName: "ApiKeyIndex",
        KeyConditionExpression: "apiKey = :apiKey",
        ExpressionAttributeValues: {
          ":apiKey": command.apiKey
        }
      };

      const result = await this.dbClient.send(new QueryCommand(params));

      if (!result.Items || result.Items.length === 0) {
        throw new Error('API key not found');
      }

      const item = result.Items[0];
      return {
        userId: item.userId,
        keyId: item.keyId,
      };
    } catch (error) {
      console.warn('Error retrieving user details via API Key');
      throw new Error('Failed to retrieve user details');
    }
  }

  async getUserDetailsByKeyId(command: GetUserDetailsByKeyIdCommand): Promise<ValidUser> {
    try {
      const params = {
<<<<<<< Updated upstream
        TableName: Resource.ApiKeysTable.tableName,
=======
        TableName: Resource.ApiKeys.tableName,
>>>>>>> Stashed changes
        KeyConditionExpression: "keyId = :keyId",
        ExpressionAttributeValues: {
          ":keyId": command.keyId
        }
      };  
  
      const result = await this.dbClient.send(new QueryCommand(params));

      if (!result.Items || result.Items.length === 0) {
        throw new Error('API key not found');
      }

      const item = result.Items[0];
      return {
        userId: item.userId,
        keyId: item.keyId,
      };
    } catch (error) {
      console.warn('Error retrieving user details via API Key ID');
      throw new Error('Failed to retrieve user details');
    }
  }

  async saveApiKey(command: SaveApiKeyCommand): Promise<void> {
    try {
      const params = {
<<<<<<< Updated upstream
        TableName: Resource.ApiKeysTable.tableName,
        Item: {
          keyId: command.keyId,
          userId: command.userId,
=======
        TableName: Resource.ApiKeys.tableName,
        Item: {
          keyId: command.keyId,
          userId: command.userId,
          apiKey: command.apiKey,
>>>>>>> Stashed changes
          apiId: this.apiId,
          createdTimestamp: new Date().toISOString()
        }
      };
      await this.dbClient.send(new PutCommand(params));
    } catch (error) {
      console.error("Error storing API key:", error);
      throw new Error("Failed to store API key");
    }
  }
}

export interface IApiKeyService {
  validateApiKey(params: ValidateApiKeyCommand): Promise<boolean>
  getApiKey(params: GetApiKeyCommandInput): Promise<GetApiKeyCommandOutput>
  createApiKey(params: CreateApiKeyCommandInput): Promise<CreateApiKeyCommandOutput>
<<<<<<< Updated upstream
  updateApiKey(params: UpdateApiKeyCommand): Promise<UpdateApiKeyCommandOutput>
=======
  updateApiKey(params: UpdateApiKeyCommandInput): Promise<UpdateApiKeyCommandOutput>
>>>>>>> Stashed changes
  updateRemainingCredits(params: UpdateRemainingCreditsCommand): Promise<UpdateRemainingCreditsCommandOutput>
  deleteApiKey(params: DeleteApiKeyCommandInput): Promise<Message>
  saveApiKey(params: SaveApiKeyCommand): Promise<Message>
  lookupUserDetailsByApiKey(apiKey: string): Promise<ValidUser>
}

export class ApiKeyService implements IApiKeyService {
  public apiId: string;
  private unkey: Unkey;
  private apiKeyRepository: IApiKeyRepository;

  constructor(apiKeyRepository: IApiKeyRepository) {
    const rootKey = Resource.UnkeyRootKey.value;
    const apiId = Resource.UnkeyApiId.value;
    if (!apiId) {
      throw new Error('UNKEY_API_ID environment variable is not set');
    }
    if (!rootKey) {
      throw new Error('UNKEY_ROOT_KEY environment variable is not set');
    }
    this.unkey = new Unkey({ rootKey });
    this.apiId = apiId;
    this.apiKeyRepository = apiKeyRepository;
  }


  async validateApiKey(params: ValidateApiKeyCommand): Promise<boolean> {
    console.log("---Validating API key---");
    const keyInfo = await this.getApiKey({ keyId: params.keyId });
    if (!keyInfo.remaining || keyInfo.remaining <= 0) {
      return false;
    }
    try {
      await this.updateRemainingCredits({
        keyId: params.keyId,
        operationType: "decrement",
        amount: 1
      });
      console.log("---API key validated---");
      return true; 
    } catch (error) {
      return false;
    }
  }

  async getApiKey(params: GetApiKeyCommandInput): Promise<GetApiKeyCommandOutput> {
    // Retrieve API Key from Unkey without decrementing the remaining credits
    params.decrypt = true;
    const { result, error } = await this.unkey.keys.get(params);
    if (error) throw new Error(error.message);
    return result;
  }

  async createApiKey(options: CreateApiKeyCommandInput): Promise<CreateApiKeyCommandOutput> {
    console.log("---Create API key---");
    const params = {
      ...options,
      apiId: this.apiId
    };
    const { result, error } = await this.unkey.keys.create(params);
    if (error) throw new Error(error.message);
    return result;
  }

<<<<<<< Updated upstream
  async updateApiKey(params: UpdateApiKeyCommand): Promise<UpdateApiKeyCommandOutput> {
    const { result, error } = await this.unkey.keys.update(params);
    if (error) throw new Error(error.message);
    return { message: "Key updated successfully" };
=======
  async updateApiKey(params: UpdateApiKeyCommandInput): Promise<UpdateApiKeyCommandOutput> {
    const { result, error } = await this.unkey.keys.updateRemaining(params);
    if (error) throw new Error(error.message);
    return result
>>>>>>> Stashed changes
  }

  async updateRemainingCredits(params: UpdateRemainingCreditsCommand): Promise<UpdateRemainingCreditsCommandOutput> {
    const input = {
      keyId: params.keyId,
      op: params.operationType,
      value: params.amount
    }
    const { result, error } = await this.unkey.keys.updateRemaining(input);
    if (error) throw new Error(error.message);
    return result;
  }

  async deleteApiKey(params: DeleteApiKeyCommandInput): Promise<Message> {
    const { error } = await this.unkey.keys.delete(params);
    if (error) throw new Error(error.message);
    return { message: "Key deleted successfully" };
  }


  async lookupUserDetailsByApiKey(apiKey: string): Promise<ValidUser> {
    const user = await this.apiKeyRepository.getUserDetailsByApiKey({ apiKey });
    return user;
  }

  async saveApiKey(command: SaveApiKeyCommand): Promise<Message> {
    console.log("---Save API key---");
    await this.apiKeyRepository.saveApiKey({
      keyId: command.keyId,
      userId: command.userId,
<<<<<<< Updated upstream
=======
      apiKey: command.apiKey
>>>>>>> Stashed changes
    });
    return { message: "Key saved successfully" };
  }



}


