
import { z } from 'zod';

export enum Status {
    Pending = 'Pending',
    Completed = 'Completed'
}

export const OrderSchema = z.object({
    orderId: z.string(),
    deliverableId: z.string(),
    orderStatus: z.string(),
    orderCreatedAt: z.string(),
    orderUpdatedAt: z.string(),
});

export const GetOrdersInputSchema = z.object({
    userId: z.string()
});

export const GetOrdersOutputSchema = z.object({
    orders: z.array(OrderSchema)
});

export const SaveOrderInputSchema = OrderSchema.extend({
    userId: z.string(),
});

export const SaveOrderOutputSchema = z.object({
    message: z.string()
});

export const UpdateOrderInputSchema = z.object({
    orderId: z.string(),
    orderStatus: z.string(),
    orderUpdatedAt: z.string(),
});

export type SaveOrderInput = z.infer<typeof SaveOrderInputSchema>;
export type SaveOrderOutput = z.infer<typeof SaveOrderOutputSchema>;
export type GetOrdersInput = z.infer<typeof GetOrdersInputSchema>;
export type GetOrdersOutput = z.infer<typeof GetOrdersOutputSchema>;
export type Order = z.infer<typeof OrderSchema>;
export type UpdateOrderInput = z.infer<typeof UpdateOrderInputSchema>;