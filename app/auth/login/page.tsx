import LoginForm from '@/components/auth/LoginForm';
import type { Metadata } from 'next'
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cashtracker - Iniciar Sesion',
  description: 'Cashtracker - Iniciar Sesion'
}

export default function LoginPage() {
  return (
    <div className=''>
      <h1 className='font-black text-6xl text-purple-950'>Iniciar Sesion</h1>
      <p className='text-3xl font-bold'>y controla tus {' '} <span className='text-amber-500'>finanzas</span></p>

      <LoginForm />

      <nav className="mt-10 flex flex-col space-y-4">
        <Link className='text-center text-gray-600' href='/auth/register'>¿Aun no tienes cuenta? {' '}
          <strong className='text-purple-950'>Crea tu Cuenta</strong>
        </Link>
        <Link className='text-center text-gray-600' href='/auth/forgot-password'>¿Olvidaste tu contraseña? {' '}
          <strong className='text-purple-950'>Restablecer contraseña</strong>
        </Link>
      </nav>

    </div>
  );
}
