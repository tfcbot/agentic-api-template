import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { ValidUser } from '@utils/metadata/saas-identity.schema';
import { createError, handleError } from '@utils/tools/custom-error';
import { SaaSIdentityVendingMachine } from '@utils/tools/saas-identity';
import { HttpStatusCode } from '@utils/tools/http-status';
import { RequestOnePageSpecInputSchema } from "@orchestrator/metadata/agent-plane.schema"
import { publishOnePageSpecTaskUseCase } from '@orchestrator/usecases/request-one-page-spec.usecase';
import { OrchestratorHttpResponses } from 'src/orchestrator/metadata/http-responses.schema';
import { randomUUID } from 'crypto';

export const requestOnePageSpecAdapter = async (
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
   
    const { useCases, nonFunctional } = JSON.parse(event.body);
    
    if (!useCases || !nonFunctional) {
      throw createError(HttpStatusCode.BAD_REQUEST, "Missing required fields");
    }

    const parsedInput = RequestOnePageSpecInputSchema.parse({
      userId: validUser.userId,
      orderId: randomUUID(),
      useCases: useCases,
      nonFunctional: nonFunctional
    });

    const result = await publishOnePageSpecTaskUseCase(parsedInput);

    return OrchestratorHttpResponses.OnePageSpecRequestReceived({
      body: result
    });

  } catch (error) {
    return handleError(error);
  }
};
