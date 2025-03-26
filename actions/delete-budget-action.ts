'use server'

import getToken from "@/src/auth/token";
import { Budget, DraftBudgetSchema, ErrorSchema, PasswordValidationSchema, RegisterSchema, SuccessSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

interface ActionStateType {
  errors: string[];
  success: string;
}

export async function deleteBudget(budgetId: Budget['id'], prevState: ActionStateType, formData: FormData) {


  const currentPassword = PasswordValidationSchema.safeParse(formData.get('password'));
  if (!currentPassword.success) {
    return {
      errors: currentPassword.error.issues.map(issue => issue.message),
      success: ''
    }
  }

  console.log(currentPassword)

  const token = getToken();

  const checkPasswordURL = `${process.env.API_URL}/auth/check-password`
  const req = await fetch(checkPasswordURL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password: currentPassword.data })
  })

  const json = await req.json()

  if (!req.ok) {
    const error = ErrorSchema.parse(json.error)
    return {
      errors: [error],
      success: ''
    }
  }


  const deleteBudgetUrl = `${process.env.API_URL}/budgets/${budgetId}`
  const request = await fetch(deleteBudgetUrl, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })


  const deleteBudgetJson = await request.json()

  if (!request.ok) {
    const error = ErrorSchema.parse(deleteBudgetJson.error)
    return {
      errors: [error],
      success: ''
    }
  }


  revalidatePath('/admin')

  const success = SuccessSchema.parse(deleteBudgetJson)
  return {
    errors: [],
    success
  }
}