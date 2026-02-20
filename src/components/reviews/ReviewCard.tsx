import Link from 'next/link'

type ReviewCardProps = {
  stars: number
  text: string
  author: string
  location: string
  productName: string
  productHandle?: string
  verifiedPurchase?: boolean
}

function StarDisplay({ count }: { count: number }) {
  return (
    <div className="text-gold text-[14px] mb-2 tracking-[1px]">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i}>{i < count ? '★' : '☆'}</span>
      ))}
    </div>
  )
}

export function ReviewCard({
  stars,
  text,
  author,
  location,
  productName,
  productHandle,
  verifiedPurchase = true,
}: ReviewCardProps) {
  const content = (
    <div className="min-w-[300px] max-w-[300px] bg-white border border-border-light p-5 scroll-snap-align-start cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-[3px] hover:border-red flex-shrink-0">
      <StarDisplay count={stars} />
      <p className="text-[14px] text-text leading-relaxed mb-3 italic font-body">
        &ldquo;{text}&rdquo;
      </p>
      <span className="font-nav text-[11px] tracking-[2px] uppercase text-text-muted block">
        {author} — {location}
      </span>
      <span className="font-nav text-[10px] tracking-[1.5px] uppercase text-red mt-1 block">
        {productName}
      </span>
      {verifiedPurchase && (
        <span className="inline-block font-nav text-[9px] tracking-[1.5px] uppercase text-green bg-green/[0.08] py-0.5 px-2 mt-1.5">
          ✓ Verified Purchase
        </span>
      )}
    </div>
  )

  if (productHandle) {
    return <Link href={`/products/${productHandle}`}>{content}</Link>
  }

  return content
}
