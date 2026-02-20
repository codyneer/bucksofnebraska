import { FREE_SHIPPING_THRESHOLD, formatPrice } from '@/lib/utils'
import { Truck } from 'lucide-react'

type FreeShippingBarProps = {
  subtotal: number
}

export function FreeShippingBar({ subtotal }: FreeShippingBarProps) {
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  const unlocked = remaining === 0

  return (
    <div className="px-6 py-4 bg-offWhite border-b border-border-light">
      <div className="font-nav text-[12px] tracking-[1.5px] uppercase text-text-light mb-2 text-center">
        {unlocked ? (
          <span className="text-green">
            <Truck className="w-4 h-4 inline mr-1 -mt-0.5" />
            FREE SHIPPING UNLOCKED!
          </span>
        ) : (
          <>
            You&apos;re <strong className="text-red">{formatPrice(remaining)} away</strong> from{' '}
            <strong>FREE SHIPPING!</strong>
          </>
        )}
      </div>
      <div className="h-1.5 bg-border rounded-sm overflow-hidden relative">
        <div
          className={`h-full rounded-sm transition-[width] duration-600 ease-out ${
            unlocked
              ? 'bg-gradient-to-r from-green to-[#4CAF50]'
              : 'bg-gradient-to-r from-red to-red-light'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between mt-1 font-nav text-[10px] text-text-muted tracking-[1px]">
        <span>$0</span>
        <span>${FREE_SHIPPING_THRESHOLD} — Free Ship</span>
      </div>
    </div>
  )
}
