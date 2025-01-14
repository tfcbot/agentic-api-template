import { z } from 'zod';

export const RequestOnePageSpecInputSchema = z.object({
  userId: z.string(),
  orderId: z.string(),
  useCases: z.string(),
  nonFunctional: z.string(),
});


export const RequestOnePageSpecOutputSchema = z.object({
  spec: z.string(),
});


export const DeliverableSchema = z.object({
  userId: z.string(),
  deliverableId: z.string(),
  deliverableContent: z.object({}),
});

export type RequestOnePageSpecInput = z.infer<typeof RequestOnePageSpecInputSchema>;
export type RequestOnePageSpecOutput = z.infer<typeof RequestOnePageSpecOutputSchema>;
export type Deliverable = z.infer<typeof DeliverableSchema>;

export const techStrategySystemPrompt = () => `You are an expert technical architect. Your task is to create a detailed one-page technical specification based on the provided application requirements, technical constraints, and scalability needs. Focus on architecture decisions and implementation recommendations.`;
