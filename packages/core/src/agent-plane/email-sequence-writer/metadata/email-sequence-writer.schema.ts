import { z } from 'zod';


export const BasePayloadSchema = z.object({ 
  userId: z.string(),
  orderId: z.string(),
  deliverableId: z.string(),
  deliverableName: z.string(),
  agentId: z.string(),
});

// Input schema for email sequence generation
export const EmailSequenceInputSchema = BasePayloadSchema.extend({
  idealCustomerProfile: z.string(),
  emailSequenceType: z.enum(['Welcome Sequence', 'Sales Sequence', 'Onboarding Sequence', 'Engagement Sequence']),
});

export const PromptInputSchema = z.object({
  idealCustomerProfile: z.string(),
  emailSequenceType: z.enum(['Welcome Sequence', 'Sales Sequence', 'Onboarding Sequence', 'Engagement Sequence']),
});

// Schema for a single email in the sequence
export const EmailSchema = z.object({
  subject: z.string(),
  body: z.string(),
  callToAction: z.string().optional(),
  sequencePosition: z.number(),
  delayDays: z.number(),
  purpose: z.string()
});

// Output schema for the generated email sequence
export const EmailSequenceOutputSchema = z.object({
  sections: z.object({
    targetAudience: z.object({
      id: z.string(),
      label: z.string(),
      type: z.literal('text'),
      description: z.string().optional(),
      data: z.string()
    }),
    emails: z.object({
      id: z.string(), 
      label: z.string(),
      type: z.literal('markdown'),
      description: z.string().optional(),
      data: z.string()
    }),
  })
});

// Error schema for validation and processing errors
export const EmailSequenceErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.record(z.string(), z.any()).optional()
});


export const DeliverableSchema = z.object({
    deliverableContent: EmailSequenceOutputSchema, 
  });

export const DeliverableDTOSchema = BasePayloadSchema.extend({
  deliverableContent: EmailSequenceOutputSchema, 
});

// Export types
export type EmailSequenceInput = z.infer<typeof EmailSequenceInputSchema>;
export type Email = z.infer<typeof EmailSchema>;
export type EmailSequenceOutput = z.infer<typeof EmailSequenceOutputSchema>;
export type EmailSequenceError = z.infer<typeof EmailSequenceErrorSchema>; 
export type Deliverable = z.infer<typeof DeliverableSchema>;
export type DeliverableDTO = z.infer<typeof DeliverableDTOSchema>;
export type PromptInput = z.infer<typeof PromptInputSchema>;