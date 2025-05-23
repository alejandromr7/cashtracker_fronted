import { DialogTitle } from "@headlessui/react";
import ExpenseForm from "./ExpenseForm";
import { useFormState } from "react-dom";
import { createExpense } from "@/actions/create-expense-action";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

interface Props {
  closeModal: () => void
}

export default function AddExpenseForm({ closeModal }: Props) {

  const params = useParams()
  const budgetId = +params.id
  const createExpenseWithBudgetId = createExpense.bind(null, budgetId)
  const [state, dispatch] = useFormState(createExpenseWithBudgetId, {
    errors: [],
    success: ''
  });

  useEffect(() => {
    if (state.success) {
      closeModal();
      toast.success(state.success);
    }
    if (state.errors) {
      state.errors.forEach(error => {
        toast.error(error);
      })
    }
  }, [state])


  return (
    <>
      <DialogTitle
        as="h3"
        className="font-black text-4xl text-purple-950 my-5"
      >
        Agregar Gasto
      </DialogTitle>

      <p className="text-xl font-bold">Llena el formulario y crea un {''}
        <span className="text-amber-500">gasto</span>
      </p>
      <form
        className="bg-gray-100 shadow-lg rounded-lg p-10 mt-10 border"
        noValidate
        action={dispatch}
      >
        <ExpenseForm />
        <input
          type="submit"
          className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          value='Registrar Gasto'
        />
      </form>
    </>
  )
}