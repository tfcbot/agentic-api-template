import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { onboardUserUseCase } from '@orchestrator/usecases/onboard-user.usecase';
import { OnboardUserInput, OnboardUserInputSchema } from '@orchestrator/metadata/user.schema';
import { SaaSIdentityVendingMachine } from "@utils/tools/saas-identity";
import { ValidUser } from '@utils/metadata/saas-identity.schema';
import { HttpStatusCode } from '@utils/tools/http-status';
import { createError, handleError } from '@utils/tools/custom-error';
import { OrchestratorHttpResponses } from '@orchestrator/metadata/http-responses.schema';
import { randomUUID } from 'crypto';

export const onboardUserAdapter = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  try {
    const svm = new SaaSIdentityVendingMachine();
    const validUser: ValidUser = await svm.getValidUser(event);
    
    if (!event.body) {
      throw createError(HttpStatusCode.BAD_REQUEST, "Missing request body");
    }

    // Parse the JSON body
    const parsedBody = JSON.parse(event.body);

    const onboardingInput : OnboardUserInput = {
      ...parsedBody,
      ...validUser,
      taskId: randomUUID(),
    }
    const validatedInput = OnboardUserInputSchema.parse(onboardingInput);

    const result = await onboardUserUseCase(validatedInput);

    return OrchestratorHttpResponses.OnboardingMessagePublished({
      body: {
        message: result.message
      }
    });
  } catch (error) {
    return handleError(error);
  }
};
