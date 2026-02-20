'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { ReviewStarsInput } from '@/components/reviews/ReviewStars'

function ReviewForm() {
  const searchParams = useSearchParams()
  const prefilledProduct = searchParams.get('product') || ''

  const [products, setProducts] = useState<{ handle: string; title: string }[]>([])
  const [stars, setStars] = useState(5)
  const [text, setText] = useState('')
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [productHandle, setProductHandle] = useState(prefilledProduct)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const maxChars = 120

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products-list')
        if (res.ok) {
          const data = await res.json()
          setProducts(data.products || [])
        }
      } catch {
        // Fail silently
      }
    }
    fetchProducts()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!productHandle || !text || !name || stars === 0) return

    setSubmitting(true)
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_handle: productHandle,
          stars,
          text,
          author: name,
          location,
          photo_url: null,
          verified_purchase: true,
        }),
      })

      if (res.ok) {
        setSubmitted(true)
      }
    } catch {
      // Fail silently
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-16 bg-white border border-border-light p-8">
        <p className="font-nav text-[18px] tracking-[2px] uppercase text-green mb-2">
          Thank you!
        </p>
        <p className="text-text-muted text-[14px] font-body">
          Your review has been submitted and will appear after moderation.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-border-light p-8">
      <div className="mb-4">
        <label className="block font-nav text-[11px] tracking-[2.5px] uppercase text-text-muted mb-1.5">
          Product
        </label>
        <select
          value={productHandle}
          onChange={(e) => setProductHandle(e.target.value)}
          required
          className="w-full py-3 px-3.5 bg-white border border-border text-text font-body text-[15px] outline-none focus:border-red transition-colors"
        >
          <option value="">Select a product</option>
          {products.map((p) => (
            <option key={p.handle} value={p.handle}>
              {p.title}
            </option>
          ))}
        </select>
      </div>

      <label className="block font-nav text-[11px] tracking-[2.5px] uppercase text-text-muted">
        Rating
      </label>
      <ReviewStarsInput value={stars} onChange={setStars} />

      <div className="mb-4">
        <label className="block font-nav text-[11px] tracking-[2.5px] uppercase text-text-muted mb-1.5">
          Your Review
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, maxChars))}
          required
          placeholder="Tell us what you think..."
          className="w-full py-3 px-3.5 bg-white border border-border text-text font-body text-[15px] outline-none focus:border-red transition-colors min-h-[80px] resize-vertical"
        />
        <div className="font-nav text-[11px] text-text-muted tracking-[1px] text-right mt-1">
          {text.length}/{maxChars}
        </div>
      </div>

      <div className="mb-4">
        <label className="block font-nav text-[11px] tracking-[2.5px] uppercase text-text-muted mb-1.5">
          Your Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Jake M."
          className="w-full py-3 px-3.5 bg-white border border-border text-text font-body text-[15px] outline-none focus:border-red transition-colors"
        />
      </div>

      <div className="mb-4">
        <label className="block font-nav text-[11px] tracking-[2.5px] uppercase text-text-muted mb-1.5">
          Location
        </label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Lincoln, NE"
          className="w-full py-3 px-3.5 bg-white border border-border text-text font-body text-[15px] outline-none focus:border-red transition-colors"
        />
      </div>

      <p className="text-[12px] text-text-muted mb-4 font-body">
        Reviews are moderated before publishing.
      </p>

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 bg-red text-white border-none font-nav text-[14px] tracking-[3px] uppercase cursor-pointer transition-all duration-300 hover:bg-red-dark disabled:opacity-50"
      >
        {submitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  )
}

export default function ReviewPage() {
  return (
    <div className="pt-10 pb-20 px-10 max-w-[500px] mx-auto">
      <h1 className="font-display text-[clamp(44px,7vw,64px)] text-center text-text mb-2">
        Write a <span className="text-red">Review</span>
      </h1>
      <p className="text-center text-text-light text-[15px] mb-10 leading-relaxed font-body">
        We&apos;d love to hear about your experience with our gear.
      </p>

      <Suspense fallback={<div className="h-[400px]" />}>
        <ReviewForm />
      </Suspense>
    </div>
  )
}
