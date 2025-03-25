import ConfirmAccount from '@/components/auth/ConfirmAccount';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '',
  description: ''
}

export default function ConfirmPage() {
  return (
    <>
      <h1 className='font-black text-6xl text-purple-950'>Confirma tu Cuenta </h1>
      <p className='text-3xl font-bold'>Ingresa el codigo que recibiste{' '}
        <span className='text-amber-500'>por email</span>
      </p>

      <ConfirmAccount />

    </>
  );
}
