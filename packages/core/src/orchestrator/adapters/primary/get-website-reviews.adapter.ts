import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { GetWebsiteReviewsInputSchema } from '@orchestrator/metadata/agent-plane.schema';
import { HttpStatusCode } from '@utils/tools/http-status';
import { ValidUser } from '@utils/metadata/saas-identity.schema';
import { createError, handleError } from '@utils/tools/custom-error';
import { SaaSIdentityVendingMachine } from '@utils/tools/saas-identity';
import { OrchestratorHttpResponses } from '@orchestrator/metadata/http-responses.schema';
import { getWebsiteReviewsUseCase } from '@orchestrator/usecases/get-reviews.usecase';

export const getWebsiteReviewsAdapter = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  try {
    const svm = new SaaSIdentityVendingMachine();
    const validUser: ValidUser = await svm.getValidUser(event);

    if (!validUser.userId) {
      throw createError(HttpStatusCode.BAD_REQUEST, "Missing user id");
    }
    

    const validatedInput = GetWebsiteReviewsInputSchema.parse({ userId: validUser.userId });
    console.log("Getting website reviews for:", validatedInput);
    const reviews = await getWebsiteReviewsUseCase(validatedInput);

    return OrchestratorHttpResponses.UserWebsiteReviews({
      body: reviews
    });
  } catch (error) {
    return handleError(error);
  }
};