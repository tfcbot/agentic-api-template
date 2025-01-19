import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { ValidUser } from '@utils/metadata/saas-identity.schema';
import { createError, handleError } from '@utils/tools/custom-error';
import { SaaSIdentityVendingMachine } from '@utils/tools/saas-identity';
import { HttpStatusCode } from '@utils/tools/http-status';
import { RequestGrowthStrategyInputSchema } from "@orchestrator/metadata/agent-plane.schema"
import { publishGrowthStrategyUseCase } from '@orchestrator/usecases/request-growth-strategy.usecase';
import { OrchestratorHttpResponses } from '@orchestrator/metadata/http-responses.schema';
import { randomUUID } from 'crypto';

export const requestGrowthStrategyAdapter = async (
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
   
    const { applicationIdea, idealCustomer, targetAnnualRevenue , deliverableName, agentId} = JSON.parse(event.body);
    
    if (!applicationIdea || !idealCustomer || !targetAnnualRevenue) {
      throw createError(HttpStatusCode.BAD_REQUEST, "Missing required fields");
    }

    const parsedInput = RequestGrowthStrategyInputSchema.parse({
      userId: validUser.userId,
      keyId: validUser.keyId,
      orderId: randomUUID(),
      deliverableId: randomUUID(),
      agentId: agentId,
      deliverableName: deliverableName,
      applicationIdea: applicationIdea,
      idealCustomer: idealCustomer,
      targetAnnualRevenue: targetAnnualRevenue
    });

    const result = await publishGrowthStrategyUseCase(parsedInput);

    return OrchestratorHttpResponses.GrowthStrategyRequestReceived({
      body: result
    });

  } catch (error) {
    return handleError(error);
  }
};
