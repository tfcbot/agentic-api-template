import { SQSEvent, SQSRecord } from 'aws-lambda';
import { RequestOnePageGrowthInput, RequestOnePageGrowthInputSchema } from '@orchestrator/metadata/agent-plane.schema';
import { createStrategyUsecase } from '@agent-plane/growth-strategist/usecases/create-strategy.usecase';

export const createStrategyAdapter = async (event: SQSEvent) => {
    console.info("--- Growth Strategy Queue Adapter ---");
    if (!event.Records || event.Records.length === 0) {
        throw new Error("Missing SQS Records");
    }

    const results = await Promise.all(event.Records.map(async (record: SQSRecord) => {
        const message = JSON.parse(record.body);
        const task = RequestOnePageGrowthInputSchema.parse(JSON.parse(message.Message));
        return await createStrategyUsecase(task);
    }));

    return results;
};
