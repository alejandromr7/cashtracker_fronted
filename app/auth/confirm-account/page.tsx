import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '',
  description: ''
}

export default function ConfirmPage() {
  return (
    <div className=''>
      <h1 className='font-black text-6xl text-purple-950'>Confirm Account</h1>
      <p className='text-3xl font-bold'>y controla tus {' '} <span className='text-amber-500'>finanzas</span></p>
    </div>
  );
}
