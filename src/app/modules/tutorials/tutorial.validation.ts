import { z } from 'zod';

const TutorialValidationSchema = z.object({
  body: z.object({
    tutorial_name: z.string().min(1, 'Name is required.'),
    tutorial_category: z.string().min(1, 'Name is required.'),
    email: z.string().email('Invalid email format.'),
    isDeleted: z.boolean().optional().default(false),
  }),
});
const updateTutorialValidationSchema = z.object({
  body: z.object({
    tutorial_name: z.string().min(1, 'Name is required.').optional(),
    tutorial_category: z.string().min(1, 'Name is required.').optional(),
    email: z.string().email('Invalid email format.').optional(),
    isDeleted: z.boolean().optional().default(false),
  }),
});

export const TutorialValidation = {
  TutorialValidationSchema,
  updateTutorialValidationSchema,
};
