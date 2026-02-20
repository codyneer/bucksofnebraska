'use client'

type ReviewStarsDisplayProps = {
  count: number
  size?: 'sm' | 'md' | 'lg'
}

export function ReviewStarsDisplay({ count, size = 'sm' }: ReviewStarsDisplayProps) {
  const sizeClass = size === 'lg' ? 'text-[24px]' : size === 'md' ? 'text-[18px]' : 'text-[14px]'

  return (
    <span className={`text-gold ${sizeClass} tracking-[1px]`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i}>{i < count ? '★' : '☆'}</span>
      ))}
    </span>
  )
}

type ReviewStarsInputProps = {
  value: number
  onChange: (value: number) => void
}

export function ReviewStarsInput({ value, onChange }: ReviewStarsInputProps) {
  return (
    <div className="flex gap-1.5 my-4">
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          onClick={() => onChange(i + 1)}
          className={`text-[28px] cursor-pointer transition-colors duration-200 ${
            i < value ? 'text-gold' : 'text-border hover:text-gold'
          }`}
        >
          ★
        </span>
      ))}
    </div>
  )
}
