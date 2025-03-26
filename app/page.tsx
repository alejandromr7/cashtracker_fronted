import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: '',
  description: ''
}

export default function Page() {
  redirect('/admin')
}
