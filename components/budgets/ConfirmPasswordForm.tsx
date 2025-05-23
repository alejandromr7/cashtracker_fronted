import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { DialogTitle } from "@headlessui/react"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { deleteBudget } from "@/actions/delete-budget-action"
import { useFormState } from "react-dom"

export default function ConfirmPasswordForm() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const budgetId = +searchParams.get('deleteBudgetId')!

  const closeModal = () => {
    const hideModal = new URLSearchParams(searchParams.toString())
    hideModal.delete('deleteBudgetId')
    router.replace(`${pathname}?${hideModal}`)
  }

  const deleteBudgetWithId = deleteBudget.bind(null, budgetId)
  const [state, dispatch] = useFormState(deleteBudgetWithId, {
    errors: [],
    success: ''
  })


  useEffect(() => {
    if (state.success) {
      closeModal();
      toast.success(state.success)
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
        Eliminar Presupuesto
      </DialogTitle>
      <p className="text-xl font-bold">Ingresa tu Password para {''}
        <span className="text-amber-500">eliminar el presupuesto {''}</span>
      </p>
      <p className='text-gray-600 text-sm'>(Un presupuesto eliminado y sus gastos no se pueden recuperar)</p>
      <form
        className=" mt-14 space-y-5"
        noValidate
        action={dispatch}
      >
        <div className="flex flex-col gap-5">
          <label
            className="font-bold text-2xl"
            htmlFor="password"
          >Ingresa tu Password para eliminar</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name='password'
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <input
            type="submit"
            value='Eliminar Presupuesto'
            className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black cursor-pointer transition-colors"
          />
          <button
            className="bg-amber-500 hover:bg-amber-600 w-full p-3 rounded-lg text-white font-black cursor-pointer transition-colors"
            onClick={(event) => {
              event.preventDefault(); // Previene la ejecución de action (dispatch)
              closeModal();
            }}
          >Cancelar</button>
        </div>
      </form>

    </>
  )
}