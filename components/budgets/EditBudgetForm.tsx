'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useFormState } from "react-dom"
import { toast } from "react-toastify"
import BudgetForm from "./BudgetForm"
import { Budget } from "@/src/schemas"
import { editBudget } from "@/actions/edit-budget-action"


interface Props {
  budget: Budget
}

export default function EditBudgetForm({ budget }: Props) {

  const router = useRouter();
  const editBudgetWithId = editBudget.bind(null, budget.id)
  const [state, dispatch] = useFormState(editBudgetWithId, {
    errors: [],
    success: ''
  })


  useEffect(() => {
    if (state.success) {
      router.push('/admin')
      toast.success(state.success)
    }

    if (state.errors) {
      state.errors.forEach(error => {
        toast.error(error);
      })
    }
  }, [state])


  return (
    <form
      className="mt-10 space-y-3"
      noValidate
      action={dispatch}
    >
      <BudgetForm budget={budget} />
      <input
        type="submit"
        className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
        value='Actualizar Presupuesto'
      />
    </form>
  )
}