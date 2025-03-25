'use client'

import { register } from "@/actions/create-account-action";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

export default function LoginForm() {

  // const router = useRouter();

  // const [state, dispatch] = useFormState(register, {
  //   errors: [],
  //   success: ''
  // });

  // useEffect(() => {
  //   console.log(state)
  //   if (state.success) {
  //     toast.success(state.success)
  //   }

  //   if (state.errors) {
  //     state.errors.forEach(error => {
  //       toast.error(error);
  //     })
  //   }
  // }, [state])

  return (
    <>
      <form
        className="mt-14 space-y-5"
        noValidate
      >
        <div className="flex flex-col gap-2">
          <label
            className="font-bold text-2xl"
          >Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="email"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            className="font-bold text-2xl"
          >Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="password"
          />
        </div>

        <input
          type="submit"
          value='Iniciar Sesión'
          className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
        />
      </form>
    </>
  )
}