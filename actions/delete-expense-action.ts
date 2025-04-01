'use server'

import getToken from "@/src/auth/token";
import { Budget, ErrorSchema, Expense, SuccessSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";

interface ActionStateType {
  errors: string[];
  success: string;
}

type BudgetAndExpenseId = {
  budgetId: Budget['id'];
  expenseId: Expense['id'];
}
export async function deleteExpense({ budgetId, expenseId }: BudgetAndExpenseId, prevState: ActionStateType) {

  const token = getToken();

  const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`
  const req = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  const json = await req.json()
  if (!req.ok) {
    const error = ErrorSchema.parse(json.message)
    return {
      errors: [error],
      success: ''
    }
  }

  const success = SuccessSchema.parse(json)
  revalidatePath(`/admin/${budgetId}`)

  return {
    errors: [],
    success
  }
}