import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { ValidUser } from '@utils/metadata/saas-identity.schema';
import { createError, handleError } from '@utils/tools/custom-error';
import { SaaSIdentityVendingMachine } from '@utils/tools/saas-identity';
import { HttpStatusCode } from '@utils/tools/http-status';
import { ReviewWebsiteInputSchema } from "@orchestrator/metadata/agent-plane.schema"
import { publishWebsiteReviewTaskUseCase } from '@orchestrator/usecases/request-website-review.usecase';
import { OrchestratorHttpResponses } from 'src/orchestrator/metadata/http-responses.schema';

export const requestWebsiteReviewAdapter = async (
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
   
    const { url } = JSON.parse(event.body);
    
    if (!url) {
      throw createError(HttpStatusCode.BAD_REQUEST, "URL is required");
    }

    const parsedInput = ReviewWebsiteInputSchema.parse({
      userId: validUser.userId,
      url: url
    });

    const result = await publishWebsiteReviewTaskUseCase(parsedInput);

      return OrchestratorHttpResponses.WebsiteReviewRequestReceived({
        body: result
      });

  } catch (error) {
    return handleError(error);
  }
};



