import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '',
  description: ''
}

export default function NewPasswordPage() {
  return (
    <div className=''>
      <h1 className='font-black text-6xl text-purple-950'>New Password</h1>
      <p className='text-3xl font-bold'>y controla tus {' '} <span className='text-amber-500'>finanzas</span></p>
    </div>
  );
}
