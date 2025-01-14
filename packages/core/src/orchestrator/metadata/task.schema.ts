import { z } from 'zod';
import { RequestOnePageValueInputSchema } from './agent-plane.schema';
import { RequestOnePageGrowthInputSchema } from './agent-plane.schema';
import { RequestOnePageTechInputSchema } from './agent-plane.schema';

export enum Status {
    Pending = 'Pending',
    InProgress = 'InProgress',
    Completed = 'Completed',
    Failed = 'Failed',
}

export enum Queue {
    content = 'content',
    websiteReview = 'websiteReview',
    onePageValue = 'onePageValue',
    onePageGrowth = 'onePageGrowth',
    onePageTech = 'onePageTech',
}

export enum Topic {
    tasks = 'tasks',
}

export const TaskSchema = z.object({
  taskId: z.string().uuid(),
  userId: z.string(),
  topic: z.nativeEnum(Topic),
  queue: z.nativeEnum(Queue),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  payload: z.object({})
})


export const WebsiteReviewTaskSchema = TaskSchema.extend({
  payload: z.object({
    userId: z.string(),
    url: z.string(),
  }),
});


export const OnePageValueTaskSchema = TaskSchema.extend({
  payload: RequestOnePageValueInputSchema,
});

export const OnePageGrowthTaskSchema = TaskSchema.extend({
  payload: RequestOnePageGrowthInputSchema,
});

export const OnePageTechTaskSchema = TaskSchema.extend({
  payload: RequestOnePageTechInputSchema,
});


export type WebsiteReviewTask = z.infer<typeof WebsiteReviewTaskSchema>
export type Task = z.infer<typeof TaskSchema>
export type OnePageValueTask = z.infer<typeof OnePageValueTaskSchema>
export type OnePageGrowthTask = z.infer<typeof OnePageGrowthTaskSchema>
export type OnePageTechTask = z.infer<typeof OnePageTechTaskSchema>



export type taskType =
  | WebsiteReviewTask
  | OnePageValueTask
  | OnePageGrowthTask
  | OnePageTechTask;
