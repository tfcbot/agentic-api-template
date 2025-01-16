import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { HttpStatusCode } from '@utils/tools/http-status';
import { ValidUser } from '@utils/metadata/saas-identity.schema';
import { createError, handleError } from '@utils/tools/custom-error';
import { SaaSIdentityVendingMachine } from '@utils/tools/saas-identity';
import { OrchestratorHttpResponses } from '@orchestrator/metadata/http-responses.schema';
import { getOrdersUseCase } from '@orchestrator/usecases/get-orders.usecase';
import { GetOrdersInputSchema } from '@orchestrator/metadata/agent-plane.schema';

export const getOrdersAdapter = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  try {
    const svm = new SaaSIdentityVendingMachine();
    const validUser: ValidUser = await svm.getValidUser(event);

    if (!validUser.userId) {
      throw createError(HttpStatusCode.BAD_REQUEST, "Missing user id");
    }

    // Get orderId from path parameters
    const validatedInput = GetOrdersInputSchema.parse({ 
      userId: validUser.userId 
    });

    const orders = await getOrdersUseCase(validatedInput);

    return OrchestratorHttpResponses.OrderCreated({
      body: orders
    });

  } catch (error) {
    return handleError(error);
  }
};