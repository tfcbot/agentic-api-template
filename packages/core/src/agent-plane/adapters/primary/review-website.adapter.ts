import { SQSEvent, SQSRecord } from 'aws-lambda';
import { ReviewWebsiteInput } from '@orchestrator/metadata/agent.schema';
import { reviewWebsiteUsecase } from '@agent-plane/usecases/review-website.usecase';

export const reviewWebsiteAdapter = async (event: SQSEvent) => {
    console.info("--- Website Review Queue Adapter ---");
    if (!event.Records || event.Records.length === 0) {
        throw new Error("Missing SQS Records");
    }

    const results = await Promise.all(event.Records.map(async (record: SQSRecord) => {
        const body = JSON.parse(record.body);
        const reviewTask: ReviewWebsiteInput = {
            userId: body.userId,
            websiteUrl: body.websiteUrl,
        };
        console.info("Generating Website Review for: ", reviewTask);
        return await reviewWebsiteUsecase(reviewTask);
    }));

    return results;
};
