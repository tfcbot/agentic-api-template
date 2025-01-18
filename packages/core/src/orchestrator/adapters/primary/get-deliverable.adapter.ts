import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { HttpStatusCode } from '@utils/tools/http-status';
import { ValidUser } from '@utils/metadata/saas-identity.schema';
import { createError, handleError } from '@utils/tools/custom-error';
import { SaaSIdentityVendingMachine } from '@utils/tools/saas-identity';
import { GetDeliverableInputSchema } from '@orchestrator/metadata/agent-plane.schema';
import { OrchestratorHttpResponses } from '@orchestrator/metadata/http-responses.schema';
import { getDeliverableUseCase } from '@orchestrator/usecases/get-deliverable.usecase';

export const getDeliverableAdapter = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  try {
    const svm = new SaaSIdentityVendingMachine();
    const validUser: ValidUser = await svm.getValidUser(event);

    if (!validUser.userId) {
      throw createError(HttpStatusCode.BAD_REQUEST, "Missing user id");
    }

    // Get orderId from path parameters
    const orderId = event.pathParameters?.orderId;
    if (!orderId) {
      throw createError(HttpStatusCode.BAD_REQUEST, "Missing order id");
    }

    const validatedInput = GetDeliverableInputSchema.parse({ orderId });

    const deliverable = await getDeliverableUseCase(validatedInput);    

    return OrchestratorHttpResponses.GetDeliverableResponse({
      body: {
       data: deliverable
      }
    });


  } catch (error) {
    return handleError(error);
  }
};
