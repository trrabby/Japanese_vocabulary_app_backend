import { z } from 'zod';

export const VocabularyValidationSchema = z.object({
  word: z
    .string()
    .min(1, { message: 'Word is required.' })
    .refine((val) => /^[^\s]+$/.test(val), {
      message: 'Word must be unique and not contain spaces.',
    }),
  meaning: z.string().min(1, { message: 'Meaning is required.' }),
  pronunciation: z.string().min(1, { message: 'Pronunciation is required.' }),
  when_to_say: z.string().min(1, { message: 'When to say is required.' }),
  lesson_no: z.string().min(1, { message: 'Lesson number is required.' }),
  isDeleted: z.boolean().optional().default(false),
});

export const VocabularyValidation = {
  VocabularyValidationSchema,
};
