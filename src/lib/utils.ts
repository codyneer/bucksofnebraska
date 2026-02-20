export function formatPrice(amount: string | number): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount
  return `$${num.toFixed(2)}`
}

export function calculateSavings(price: string, compareAtPrice: string): number {
  const p = parseFloat(price)
  const cp = parseFloat(compareAtPrice)
  return Math.round(cp - p)
}

export function calculateSavingsPercent(price: string, compareAtPrice: string): number {
  const p = parseFloat(price)
  const cp = parseFloat(compareAtPrice)
  return Math.round(((cp - p) / cp) * 100)
}

export const FREE_SHIPPING_THRESHOLD = 75
export const FLAT_SHIPPING_RATE = 5.99

export function calculateShipping(subtotal: number): number {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_RATE
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}
