import RegisterForm from '@/components/RegisterForm';
import type { Metadata } from 'next'
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cashtracker - Crear Cuenta',
  description: 'Cashtracker - Crear Cuenta'
}

export default function RegisterPage() {


  return (
    <div className=''>
      <h1 className='font-black text-6xl text-purple-950'>Crear Cuenta</h1>
      <p className='text-3xl font-bold'>y controla tus {' '} <span className='text-amber-500'>finanzas</span></p>

      <RegisterForm />

      <nav className="mt-10 flex flex-col space-y-4">
        <Link className='text-center text-gray-600' href='/auth/login'>¿Ya tienes una cuenta? {' '}
          <strong className='text-purple-950'>Inicia sesión</strong>
        </Link>
        <Link className='text-center text-gray-600' href='/auth/forgot-password'>¿Olvidaste tu contraseña? {' '}
          <strong className='text-purple-950'>Restablecer contraseña</strong>
        </Link>
      </nav>

    </div>
  );
}
