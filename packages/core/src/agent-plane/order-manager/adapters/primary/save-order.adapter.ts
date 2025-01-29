import { SaveOrderInput, SaveOrderOutput } from '@agent-plane/order-manager/metadata/order.schema';
import { saveOrderUseCase } from '@agent-plane/order-manager/usecases/save-order.usecase';

export class SaveOrderAdapter {
    async execute(input: SaveOrderInput): Promise<SaveOrderOutput> {
        try {
            const result = await saveOrderUseCase(input);
            return result;
        } catch (error) {
            console.error('Error in SaveOrderAdapter:', error);
            throw new Error('Failed to save order');
        }
    }
};

export const saveOrderAdapter = new SaveOrderAdapter();