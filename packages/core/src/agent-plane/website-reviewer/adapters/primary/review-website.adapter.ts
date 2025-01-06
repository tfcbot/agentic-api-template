import { SQSEvent, SQSRecord } from 'aws-lambda';
import { ReviewWebsiteInput, ReviewWebsiteInputSchema } from '@agent-plane/website-reviewer/metadata/website-reviewer.schema';
import { reviewWebsiteUsecase } from 'src/agent-plane/website-reviewer/usecases/review-website.usecase';

export const reviewWebsiteAdapter = async (event: SQSEvent) => {
    console.info("--- Website Review Queue Adapter ---");
    if (!event.Records || event.Records.length === 0) {
        throw new Error("Missing SQS Records");
    }

    const results = await Promise.all(event.Records.map(async (record: SQSRecord) => {
        const message = JSON.parse(record.body);
        const task = ReviewWebsiteInputSchema.parse(JSON.parse(message.Message));
        return await reviewWebsiteUsecase(task);
    }));

    return results;
};
