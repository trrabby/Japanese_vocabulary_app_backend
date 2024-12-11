import { z } from 'zod';

const LessonValidationSchema = z.object({
  body: z.object({
    lesson_name: z.string().min(1, { message: 'Lesson name is required.' }),
    lesson_no: z.string().optional(),
    isDeleted: z.boolean().optional().default(false),
  }),
});

const updateLessonValidationSchema = z.object({
  body: z.object({
    lesson_name: z
      .string()
      .min(1, { message: 'Lesson name is required.' })
      .optional(),
    lesson_no: z.string().optional(),
    isDeleted: z.boolean().optional().default(false),
  }),
});

export const LessonValidation = {
  LessonValidationSchema,
  updateLessonValidationSchema,
};
