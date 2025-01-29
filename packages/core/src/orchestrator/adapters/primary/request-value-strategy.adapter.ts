import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { ValidUser } from '@utils/metadata/saas-identity.schema';
import { createError, handleError } from '@utils/tools/custom-error';
import { SaaSIdentityVendingMachine } from '@utils/tools/saas-identity';
import { HttpStatusCode } from '@utils/tools/http-status';
import { RequestValueStrategyInputSchema } from "@orchestrator/metadata/agent-plane.schema"
import { publishValueStrategyUseCase } from '@orchestrator/usecases/request-value-strategy.usecase';
import { OrchestratorHttpResponses } from '@orchestrator/metadata/http-responses.schema';
import { randomUUID } from 'crypto';

export const requestValueStrategyAdapter = async (
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
   
    const { applicationIdea, idealCustomer, problem, solution, deliverableName, agentId } = JSON.parse(event.body);
    
    if (!applicationIdea || !idealCustomer || !problem || !solution) {
      throw createError(HttpStatusCode.BAD_REQUEST, "Missing required fields");
    }

    const parsedInput = RequestValueStrategyInputSchema.parse({
      userId: validUser.userId,
      keyId: validUser.keyId,
      orderId: randomUUID(),
      deliverableId: randomUUID(),
      applicationIdea: applicationIdea,
      idealCustomer: idealCustomer,
      problem: problem,
      solution: solution,
      deliverableName: deliverableName,
      agentId: agentId
    });

    const result = await publishValueStrategyUseCase(parsedInput);

    return OrchestratorHttpResponses.ValueStrategyRequestReceived({
      body: result
    });

  } catch (error) {
    return handleError(error);
  }
};
