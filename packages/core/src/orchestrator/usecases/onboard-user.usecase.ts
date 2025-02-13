import { OnboardUserInput } from '@orchestrator/metadata/user.schema';
import { randomUUID } from 'crypto';
import { topicPublisher } from '@orchestrator/adapters/secondary/topic-publisher.adapter';
import { OnboardingTask } from '@orchestrator/metadata/task.schema';
import { Topic, Queue } from '@orchestrator/metadata/order.schema';

export const onboardUserUseCase = async (input: OnboardUserInput) => {
  const onboardingTask: OnboardingTask = {
    topic: Topic.tasks,
    queue: Queue.onboarding,
    payload: {
        ...input
    }
  };

  await topicPublisher.publishTask(onboardingTask);

  return {
    message: 'Onboarding task published'
  };
};
