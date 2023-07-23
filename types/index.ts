// I want to validate the schema
// the schema has
// 1. name
// 2. username
// 3. password
// 4. age
import { Document } from 'mongoose';
import z from 'zod';

export interface UserInput extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  age: number;

  role?: string;
}

export interface User {
  name?: string;
  username: string;
  email?: string;
  age: number;
}
export const userValidationSchema = z.object({
  name: z.string().min(5, { message: 'Must be 5 or more characters long' }),
  username: z.string().min(5, { message: 'Must be 5 or more characters long' }),
  email: z
    .string()
    .email('Invalid email address')
    .refine(value => value.length <= 255, 'Email address exceeds maximum length'),
  password: z.string().min(8, { message: 'Password must be 6 or more characters long' }),
  age: z.number({ required_error: 'Age is required', invalid_type_error: 'Age must be a number' }).int().positive(),
});

export type UserSchema = z.infer<typeof userValidationSchema>;
