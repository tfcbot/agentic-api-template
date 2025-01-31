import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { ValidUser } from '@utils/metadata/saas-identity.schema';
import { createError, handleError } from '@utils/tools/custom-error';
import { SaaSIdentityVendingMachine } from '@utils/tools/saas-identity';
import { HttpStatusCode } from '@utils/tools/http-status';
import { RequestEmailSequenceInputSchema } from "@orchestrator/metadata/agent-plane.schema"
import { publishEmailSequenceUseCase } from '@orchestrator/usecases/request-email-sequence.usecase';
import { OrchestratorHttpResponses } from '@orchestrator/metadata/http-responses.schema';
import { randomUUID } from 'crypto';

export const requestEmailSequenceAdapter = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  try {
    const svm = new SaaSIdentityVendingMachine();
    const validUser: ValidUser = await svm.getValidUser(event);

    if (!validUser.userId) {
      throw createError(HttpStatusCode.BAD_REQUEST, "Missing user id");
    }

    if (!event.body) {
      throw createError(HttpStatusCode.BAD_REQUEST, "Missing request body");
    }
   
    const { 
      deliverableName, 
      agentId, 
      idealCustomerProfile, 
      emailSequenceType, 
    } = JSON.parse(event.body);
    
    if (!idealCustomerProfile || !emailSequenceType) {
      throw createError(HttpStatusCode.BAD_REQUEST, "Missing required fields");
    }

    // Validate idealCustomerProfile fields
    
    const parsedInput = RequestEmailSequenceInputSchema.parse({
      userId: validUser.userId,
      keyId: validUser.keyId,
      orderId: randomUUID(),
      deliverableId: randomUUID(),
      deliverableName,
      agentId,
      idealCustomerProfile,
      emailSequenceType,
    });


    const result = await publishEmailSequenceUseCase(parsedInput);

    return OrchestratorHttpResponses.EmailSequenceRequestReceived({
      body: result
    });

  } catch (error) {
    return handleError(error);
  }
}; 