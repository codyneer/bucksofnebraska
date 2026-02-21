import { Metadata } from 'next'
import { getShopPolicies } from '@/lib/shopify'

export const metadata: Metadata = {
  title: 'Returns & Refunds',
  description: 'Return and refund policy for Bucks of Nebraska.',
  openGraph: {
    title: 'Returns & Refunds — Bucks of Nebraska',
    description: 'Return and refund policy for Bucks of Nebraska.',
    images: [{ url: '/api/og?title=Returns%20%26%20Refunds&subtitle=Bucks%20of%20Nebraska', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Returns & Refunds — Bucks of Nebraska',
    description: 'Return and refund policy for Bucks of Nebraska.',
    images: ['/api/og?title=Returns%20%26%20Refunds&subtitle=Bucks%20of%20Nebraska'],
  },
}

export default async function ReturnsPage() {
  const policies = await getShopPolicies()
  const policy = policies.refundPolicy

  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-[800px] mx-auto px-5 sm:px-8 py-12 sm:py-20">
        <h1 className="font-display text-[clamp(32px,6vw,48px)] text-text mb-8">
          {policy?.title || 'Returns & Refunds'}
        </h1>
        {policy?.body ? (
          <div
            className="font-body text-[15px] text-text-light leading-relaxed prose prose-headings:font-nav prose-headings:uppercase prose-headings:tracking-[2px] prose-headings:text-text prose-a:text-red prose-a:no-underline hover:prose-a:underline max-w-none"
            dangerouslySetInnerHTML={{ __html: policy.body }}
          />
        ) : (
          <p className="font-body text-text-light text-[15px]">
            Return policy is not yet available. Please contact us for details.
          </p>
        )}
      </div>
    </div>
  )
}
