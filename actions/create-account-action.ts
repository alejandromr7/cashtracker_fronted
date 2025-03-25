'use server'

import { ErrorSchema, RegisterSchema, SuccessSchema } from "@/src/schemas";

interface ActionStateType {
  errors: string[];
  success: string;
}

export async function register(prevState: ActionStateType, formData: FormData) {

  const registerData = {
    email: formData.get('email'),
    name: formData.get('name'),
    password: formData.get('password'),
    password_confirmation: formData.get('password_confirmation')
  }

  const register = RegisterSchema.safeParse(registerData);

  if (!register.success) {
    return {
      errors: register.error.issues.map(err => err.message),
      success: ''
    }
  }


  const url = `${process.env.API_URL}/auth/create-account`

  const req = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: register.data.email,
      name: register.data.name,
      password: register.data.password
    })
  })


  const json = await req.json()

  console.log(json)

  if (!req.ok) {
    const error = ErrorSchema.parse(json)
    return {
      errors: [error],
      success: ''
    }
  }

  const success = SuccessSchema.parse(json)

  return {
    errors: [],
    success
  }
}