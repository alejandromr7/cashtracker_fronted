'use client'

import { confirmAccount } from "@/actions/confirm-account-action";
import { PinInput, PinInputField } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

export default function ConfirmAccount() {

  const router = useRouter();

  const [token, setToken] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const confirmAccountWithToken = confirmAccount.bind(null, token)
  const [state, dispatch] = useFormState(confirmAccountWithToken, {
    errors: [],
    success: ''
  });

  useEffect(() => {
    if (isComplete) {
      console.log(token)
      dispatch();
    }
  }, [isComplete])


  useEffect(() => {
    console.log(state)
    if (state.success) {
      router.push('/auth/login'); // Redirect to dashboard after successful confirmation
      toast.success(state.success)
    }

    if (state.errors) {
      state.errors.forEach(error => {
        toast.error(error);
      })
    }
  }, [state])


  const handleChange = (token: string) => {
    setIsComplete(false);
    setToken(token);
  }

  const handleComplete = () => {
    setIsComplete(true);
  }

  return (
    <div className="flex justify-center gap-5 my-10">
      <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
        <PinInputField className="h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center" />
        <PinInputField className="h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center" />
        <PinInputField className="h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center" />
        <PinInputField className="h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center" />
        <PinInputField className="h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center" />
        <PinInputField className="h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center" />
      </PinInput>
    </div>
  );
};
