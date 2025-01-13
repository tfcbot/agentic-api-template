
import { z } from 'zod';


export const OrderSchema = z.object({
    orderId: z.string(),
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

export type GetOrdersInput = z.infer<typeof GetOrdersInputSchema>;
export type GetOrdersOutput = z.infer<typeof GetOrdersOutputSchema>;
export type Order = z.infer<typeof OrderSchema>;