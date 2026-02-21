import { Metadata } from 'next'
import { getShopPolicies } from '@/lib/shopify'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Bucks of Nebraska.',
  openGraph: {
    title: 'Terms of Service — Bucks of Nebraska',
    description: 'Terms of Service for Bucks of Nebraska.',
    images: [{ url: '/api/og?title=Terms%20of%20Service&subtitle=Bucks%20of%20Nebraska', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service — Bucks of Nebraska',
    description: 'Terms of Service for Bucks of Nebraska.',
    images: ['/api/og?title=Terms%20of%20Service&subtitle=Bucks%20of%20Nebraska'],
  },
}

export default async function TermsPage() {
  const policies = await getShopPolicies()
  const policy = policies.termsOfService

  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-[800px] mx-auto px-5 sm:px-8 py-12 sm:py-20">
        <h1 className="font-display text-[clamp(32px,6vw,48px)] text-text mb-8">
          {policy?.title || 'Terms of Service'}
        </h1>
        {policy?.body ? (
          <div
            className="font-body text-[15px] text-text-light leading-relaxed prose prose-headings:font-nav prose-headings:uppercase prose-headings:tracking-[2px] prose-headings:text-text prose-a:text-red prose-a:no-underline hover:prose-a:underline max-w-none"
            dangerouslySetInnerHTML={{ __html: policy.body }}
          />
        ) : (
          <p className="font-body text-text-light text-[15px]">
            Terms of service are not yet available. Please contact us for details.
          </p>
        )}
      </div>
    </div>
  )
}
