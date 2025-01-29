import { SQSEvent, SQSRecord } from 'aws-lambda';
import { RequestValueStrategyInputSchema } from '@agent-plane/value-strategist/metadata/value-strategist.schema';
import { createValueStrategyUsecase } from '@agent-plane/value-strategist/usecases/create-value-strategy.usecase';

export const createValueStrategyAdapter = async (event: SQSEvent) => {
    console.info("--- Value Strategy Queue Adapter ---");
    if (!event.Records || event.Records.length === 0) {
        throw new Error("Missing SQS Records");
    }

    const results = await Promise.all(event.Records.map(async (record: SQSRecord) => {
        const message = JSON.parse(record.body);
        const order = RequestValueStrategyInputSchema.parse(JSON.parse(message.Message));
        return await createValueStrategyUsecase(order);
    }));

    return results;
};
