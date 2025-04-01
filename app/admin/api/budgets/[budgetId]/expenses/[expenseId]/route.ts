

import { verifySession } from '@/src/auth/dal'
import getToken from '@/src/auth/token';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request:
  Request, { params }: { params: { budgetId: string, expenseId: string } }) {
  console.log(params)


  await verifySession();
  const token = getToken();
  const url = `${process.env.API_URL}/budgets/${params.budgetId}/expenses/${params.expenseId}`;
  const req = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })

  const json = await req.json();

  if (!req.ok) {
    return Response.json(json, { status: 404 })
  }

  return Response.json(json);
}

