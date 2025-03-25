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


export const LoginSchema = z.object({
  email: z.string()
    .min(1, { message: 'El Email es Obligatorio' })
    .email({ message: 'Email no válido' }),
  password: z.string()
    .min(1, { message: 'El Password no puede ir vacio' })
})

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email()
})


export const ForgotPasswordSchema = z.object({
  email: z.string()
    .min(1, { message: 'El Email es Obligatorio' })
    .email({ message: 'Email no válido' }),
})

export const ResetPasswordSchema = z.object({
  password: z.string()
    .min(8, { message: 'El Password debe ser de al menos 8 caracteres' }),
  password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
  message: "Los Passwords no son iguales",
  path: ["password_confirmation"]
});

export type User = z.infer<typeof UserSchema>

export const ErrorSchema = z.string();
export const SuccessSchema = z.string();
export const TokenSchema = z.string().length(6, { message: 'The token must be 6' });

export const DraftBudgetSchema = z.object({
  name: z.string()
    .min(1, { message: 'El Nombre del presupuesto es obligatorio' }),
  amount: z.coerce.
    number({ message: 'Cantidad no válida' })
    .min(1, { message: 'Cantidad no válida' }),
})


