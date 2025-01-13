import { SQSEvent, SQSRecord } from 'aws-lambda';
import { RequestOnePageValueInputSchema } from '@agent-plane/value-strategist/metadata/value-strategist.schema';
import { createValueSpecUsecase } from '@agent-plane/value-strategist/usecases/create-value-spec.usecase';

export const createValueSpecAdapter = async (event: SQSEvent) => {
    console.info("--- Value Spec Queue Adapter ---");
    if (!event.Records || event.Records.length === 0) {
        throw new Error("Missing SQS Records");
    }

    const results = await Promise.all(event.Records.map(async (record: SQSRecord) => {
        const message = JSON.parse(record.body);
        const task = RequestOnePageValueInputSchema.parse(JSON.parse(message.Message));
        return await createValueSpecUsecase(task);
    }));

    return results;
};
