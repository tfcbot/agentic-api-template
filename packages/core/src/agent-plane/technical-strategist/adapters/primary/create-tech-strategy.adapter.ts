import { SQSEvent, SQSRecord } from 'aws-lambda';
import { RequestOnePageSpecInputSchema } from 'src/agent-plane/technical-strategist/metadata/technical-architect.schema';
import { createTechStrategyUsecase } from 'src/agent-plane/technical-strategist/usecases/create-tech-strategy.usecase';

export const createTechStrategyAdapter = async (event: SQSEvent) => {
    console.info("--- Tech Strategy Queue Adapter ---");
    if (!event.Records || event.Records.length === 0) {
        throw new Error("Missing SQS Records");
    }

    const results = await Promise.all(event.Records.map(async (record: SQSRecord) => {
        const message = JSON.parse(record.body);
        const task = RequestOnePageSpecInputSchema.parse(JSON.parse(message.Message));
        return await createTechStrategyUsecase(task);
    }));

    return results;
};
