


export function formatCurrency(quantity: number) {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(quantity)
}



export function formatDay(isoString: string) {
  const date = new Date(isoString);
  const formatter = new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
  return formatter.format(date)
}