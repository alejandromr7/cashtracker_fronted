import { z } from 'zod'

export const RegisterSchema = z.object({
  email: z.string().min(1, { message: 'The email is required!' }).email({ message: 'Please enter a valid email' }),
  name: z.string().min(1, { message: 'Please enter a valid name' }),
  password: z.string().min(8, { message: 'Must be greater than 8' }),
  password_confirmation: z.string()
}).refine(data => data.password === data.password_confirmation, {
  message: 'Passwords must match',
  path: ['password_confirmation']
})

export const ErrorSchema = z.string();
export const SuccessSchema = z.string();