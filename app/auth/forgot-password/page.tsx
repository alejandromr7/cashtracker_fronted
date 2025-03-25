import ForgotPasswordForm from '@/components/ForgotPasswordForm';
import type { Metadata } from 'next'
import Link from 'next/link';

export const metadata: Metadata = {
  title: '',
  description: ''
}

export default function forgotPasswordPage() {
  return (
    <div className=''>
      <h1 className='font-black text-6xl text-purple-950'>Olvide mi Password</h1>
      <p className='text-3xl font-bold'>y controla tus {' '} <span className='text-amber-500'>finanzas</span></p>

      <ForgotPasswordForm />


      <nav className="mt-10 flex flex-col space-y-4">
        <Link className='text-center text-gray-600' href='/auth/login'>¿Ya tienes una cuenta? {' '}
          <strong className='text-purple-950'>Inicia sesión</strong>
        </Link>
        <Link className='text-center text-gray-600' href='/auth/register'>¿Aun no tienes cuenta? {' '}
          <strong className='text-purple-950'>Crea tu Cuenta</strong>
        </Link>
      </nav>

    </div>
  );
}
