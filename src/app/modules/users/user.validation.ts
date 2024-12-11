import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required.'),
    email: z.string().email('Invalid email format.'),
    password: z.string().min(6, 'Password must be at least 6 characters long.'),
    role: z.enum(['admin', 'user']).optional(),
    isDeleted: z.boolean().optional().default(false),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required.').optional(),
    email: z.string().email('Invalid email format.').optional(),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters long.')
      .optional(),
    role: z.enum(['admin', 'user']).optional(),
    isDeleted: z.boolean().optional().default(false),
  }),
});

export const UserValidation = {
  userValidationSchema,
  updateUserValidationSchema,
};
