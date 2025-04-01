'use server'

import getToken from "@/src/auth/token";
import { Budget, DraftBudgetSchema, DraftExpenseSchema, ErrorSchema, Expense, SuccessSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";

interface ActionStateType {
  errors: string[];
  success: string;
}

type BudgetAndExpenseId = {
  budgetId: Budget['id'];
  expenseId: Expense['id'];
}
export async function editExpense({ budgetId, expenseId }: BudgetAndExpenseId, prevState: ActionStateType, formData: FormData) {


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

  const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`
  const req = await fetch(url, {
    method: 'PUT',
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

  const success = SuccessSchema.parse(json)
  revalidatePath(`/admin/${budgetId}`)

  return {
    errors: [],
    success
  }
}