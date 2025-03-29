'use server'

import getToken from "@/src/auth/token";
import { Budget, DraftBudgetSchema, DraftExpenseSchema, ErrorSchema, RegisterSchema, SuccessSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

interface ActionStateType {
  errors: string[];
  success: string;
}

export async function createExpense(budgetId: Budget['id'], prevState: ActionStateType, formData: FormData) {


  const expense = DraftExpenseSchema.safeParse({
    name: formData.get('name'),
    amount: formData.get('amount')
  })

  if (!expense.success) {
    return {
      errors: expense.error.issues.map(issue => issue.message),
      success: ''
    }
  }

  const token = getToken();

  const url = `${process.env.API_URL}/budgets/${budgetId}/expenses`
  const req = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: expense.data.name,
      amount: expense.data.amount
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

  revalidatePath(`/admin/budgets/${budgetId}`);
  const success = SuccessSchema.parse(json);

  return {
    errors: [],
    success
  }
}