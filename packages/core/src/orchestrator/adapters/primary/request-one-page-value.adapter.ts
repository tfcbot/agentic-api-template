import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { ValidUser } from '@utils/metadata/saas-identity.schema';
import { createError, handleError } from '@utils/tools/custom-error';
import { SaaSIdentityVendingMachine } from '@utils/tools/saas-identity';
import { HttpStatusCode } from '@utils/tools/http-status';
import { RequestOnePageValueInputSchema } from "@orchestrator/metadata/agent-plane.schema"
import { publishOnePageValueTaskUseCase } from '@orchestrator/usecases/request-one-page-value.usecase';
import { OrchestratorHttpResponses } from 'src/orchestrator/metadata/http-responses.schema';
import { randomUUID } from 'crypto';

export const requestOnePageValueAdapter = async (
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
   
    const { applicationIdea, idealCustomer, problem, solution } = JSON.parse(event.body);
    
    if (!applicationIdea || !idealCustomer || !problem || !solution) {
      throw createError(HttpStatusCode.BAD_REQUEST, "Missing required fields");
    }

    const parsedInput = RequestOnePageValueInputSchema.parse({
      userId: validUser.userId,
      orderId: randomUUID(),
      deliverableId: randomUUID(),
      applicationIdea: applicationIdea,
      idealCustomer: idealCustomer,
      problem: problem,
      solution: solution
    });

    const result = await publishOnePageValueTaskUseCase(parsedInput);

    return OrchestratorHttpResponses.OnePageValueRequestReceived({
      body: result
    });

  } catch (error) {
    return handleError(error);
  }
};
