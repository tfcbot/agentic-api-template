import { SQSEvent, SQSRecord } from 'aws-lambda';
import { EmailSequenceInput, EmailSequenceInputSchema } from '@agent-plane/email-sequence-writer/metadata/email-sequence-writer.schema';
import { generateEmailSequenceUseCase } from '@agent-plane/email-sequence-writer/usecases/generate-email-sequence.usecase';

export const generateEmailSequenceAdapter = async (event: SQSEvent) => {
    console.info("--- Email Sequence Queue Adapter ---");
    if (!event.Records || event.Records.length === 0) {
        throw new Error("Missing SQS Records");
    }

    const results = await Promise.all(event.Records.map(async (record: SQSRecord) => {
        const message = JSON.parse(record.body);
        const order = EmailSequenceInputSchema.parse(JSON.parse(message.Message));
        return await generateEmailSequenceUseCase(order);
    }));

    return results;
};