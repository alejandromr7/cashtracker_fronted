'use server'

import { ErrorSchema, LoginSchema, RegisterSchema, SuccessSchema } from "@/src/schemas";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface ActionStateType {
  errors: string[];
  success: string;
}

export async function authenticate(prevState: ActionStateType, formData: FormData) {

  const loginCredentials = {
    email: formData.get('email'),
    password: formData.get('password')
  }

  const auth = LoginSchema.safeParse(loginCredentials);

  if (!auth.success) {
    return {
      errors: auth.error.issues.map(err => err.message),
      success: ''
    }
  }

  const url = `${process.env.API_URL}/auth/login`

  const req = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: auth.data.email,
      password: auth.data.password
    })
  })

  const json = await req.json()

  if (!req.ok) {
    const error = ErrorSchema.parse(json)
    console.log(error)
    return {
      errors: [error],
      success: ''
    }
  }

  cookies().set({
    name: 'token',
    value: json,
    path: '/',
    httpOnly: true
  });

  redirect('/admin');

}