import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { ValidUser } from '@utils/metadata/saas-identity.schema';
import { createError, handleError } from '@utils/tools/custom-error';
import { SaaSIdentityVendingMachine } from '@utils/tools/saas-identity';
import { HttpStatusCode } from '@utils/tools/http-status';
import { RequestOnePageGrowthInputSchema } from "@orchestrator/metadata/agent-plane.schema"
import { publishOnePageGrowthUseCase } from '@orchestrator/usecases/request-one-page-growth.usecase';
import { OrchestratorHttpResponses } from 'src/orchestrator/metadata/http-responses.schema';
import { randomUUID } from 'crypto';

export const requestOnePageGrowthAdapter = async (
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
   
    const { applicationIdea, idealCustomer, targetAnnualRevenue } = JSON.parse(event.body);
    
    if (!applicationIdea || !idealCustomer || !targetAnnualRevenue) {
      throw createError(HttpStatusCode.BAD_REQUEST, "Missing required fields");
    }

    const parsedInput = RequestOnePageGrowthInputSchema.parse({
      userId: validUser.userId,
      orderId: randomUUID(),
      applicationIdea: applicationIdea,
      idealCustomer: idealCustomer,
      targetAnnualRevenue: targetAnnualRevenue
    });

    const result = await publishOnePageGrowthUseCase(parsedInput);

    return OrchestratorHttpResponses.OnePageGrowthRequestReceived({
      body: result
    });

  } catch (error) {
    return handleError(error);
  }
};
