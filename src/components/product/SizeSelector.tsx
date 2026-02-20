'use client'

type SizeSelectorProps = {
  sizes: string[]
  selectedSize: string
  onSelect: (size: string) => void
}

export function SizeSelector({ sizes, selectedSize, onSelect }: SizeSelectorProps) {
  if (sizes.length === 0) return null

  return (
    <div className="mb-5">
      <label className="block font-nav text-[12px] tracking-[2.5px] uppercase text-text-muted mb-2.5">
        Size
      </label>
      <div className="flex gap-2 flex-wrap">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSelect(size)}
            className={`py-2.5 px-[18px] bg-white border font-nav text-[14px] tracking-[1px] cursor-pointer transition-all duration-200 ${
              selectedSize === size
                ? 'border-red text-red bg-red/[0.04]'
                : 'border-border text-text hover:border-red hover:text-red hover:bg-red/[0.04]'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}
