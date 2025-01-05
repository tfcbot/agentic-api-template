import { DynamoDBStreamEvent, Context } from 'aws-lambda';
import { UpdateOnboardingStatusCommand } from '@control-plane/auth-manager/metadata/auth-manager.schema';
import { updateOnboardingStatusUseCase } from '@control-plane/auth-manager/usecases/update-onboarding-status.usecase';

export const updateOnboardingAdapter = async (event: DynamoDBStreamEvent, context: Context) => {
  
  console.info('Updating onboarding status in Auth Vendor');
  for (const record of event.Records) {
    if (record.eventName === 'INSERT' || record.eventName === 'MODIFY') {
      console.info(`Processing record with event name: ${record.eventName}`);
      const userRecord = record.dynamodb?.NewImage;

      if (userRecord) {
        const userId = userRecord.userId.S;
        const onboardingComplete = userRecord.onboardingComplete?.BOOL;
       
        try {
          console.info(`Updating onboarding status for user ${userId}`);
          const input: UpdateOnboardingStatusCommand = {
            userId: userId || '',
            params: {
              publicMetadata: {
                onboardingComplete: onboardingComplete ?? false,
              },
            },
          };
          const message = await updateOnboardingStatusUseCase(input);
        
        } catch (error) {
          console.error(`Failed to update onboarding status for user ${userId}:`, error);
        }
      }
    }
  }
};
