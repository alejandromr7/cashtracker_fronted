import { validateToken } from "@/actions/validate-token-action"
import { PinInput, PinInputField } from "@chakra-ui/react"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useFormState } from "react-dom"
import { toast } from "react-toastify"

interface Props {
  setIsValidToken: Dispatch<SetStateAction<boolean>>;
  setToken: Dispatch<SetStateAction<string>>;
  token: string
}

export default function ValidateTokenForm({ setIsValidToken, token, setToken }: Props) {


  const [isComplete, setIsComplete] = useState(false)

  const validateTokenWithToken = validateToken.bind(null, token)
  const [state, dispatch] = useFormState(validateTokenWithToken, {
    errors: [],
    success: ''
  })


  useEffect(() => {
    if (isComplete) {
      dispatch();
    }
  }, [isComplete])


  useEffect(() => {
    if (state.success) {
      setIsValidToken(true)
      toast.success(state.success)
    }

    if (state.errors) {
      state.errors.forEach(error => {
        toast.error(error);
      })
    }
  }, [state])

  const handleChange = (token: string) => {
    setIsComplete(false)
    setToken(token)
  }

  const handleComplete = () => {
    setIsComplete(true)
  }

  return (
    <div className="flex justify-center gap-5 my-10">
      <PinInput
        value={token}
        onChange={handleChange}
        onComplete={handleComplete}
      >
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
      </PinInput>
    </div>
  )
}