'use server'

import { DraftBudgetSchema, ErrorSchema, RegisterSchema, SuccessSchema } from "@/src/schemas";
import { cookies } from "next/headers";

interface ActionStateType {
  errors: string[];
  success: string;
}

export async function createBudget(prevState: ActionStateType, formData: FormData) {


  const budget = DraftBudgetSchema.safeParse({
    name: formData.get('name'),
    amount: formData.get('amount')
  })

  if (!budget.success) {
    return {
      errors: budget.error.issues.map(issue => issue.message),
      success: ''
    }
  }

  const token = cookies().get('token')?.value;

  const url = `${process.env.API_URL}/budgets`
  const req = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: budget.data.name,
      amount: budget.data.amount
    })
  })

  const json = await req.json()
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