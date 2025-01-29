import { SQSEvent, SQSRecord } from 'aws-lambda';
import { RequestTechStrategyInputSchema } from 'src/agent-plane/technical-strategist/metadata/technical-strategist.schema';
import { createTechStrategyUsecase } from '@agent-plane/technical-strategist/usecases/create-tech-strategy.usecase';

export const createTechStrategyAdapter = async (event: SQSEvent) => {
    console.info("--- Tech Strategy Queue Adapter ---");
    if (!event.Records || event.Records.length === 0) {
        throw new Error("Missing SQS Records");
    }

    const results = await Promise.all(event.Records.map(async (record: SQSRecord) => {
        const message = JSON.parse(record.body);
        const order = RequestTechStrategyInputSchema.parse(JSON.parse(message.Message));
        return await createTechStrategyUsecase(order);
    }));

    return results;
};
