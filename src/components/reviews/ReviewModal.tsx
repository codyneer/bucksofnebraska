'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { ReviewStarsInput } from './ReviewStars'

type ReviewModalProps = {
  isOpen: boolean
  onClose: () => void
  prefilledProduct?: string
  products: { handle: string; title: string }[]
}

export function ReviewModal({ isOpen, onClose, prefilledProduct, products }: ReviewModalProps) {
  const [stars, setStars] = useState(5)
  const [text, setText] = useState('')
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [productHandle, setProductHandle] = useState(prefilledProduct || '')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const maxChars = 120

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
          verified_purchase: false,
        }),
      })

      if (res.ok) {
        setSubmitted(true)
        setTimeout(() => {
          onClose()
          setSubmitted(false)
          setStars(5)
          setText('')
          setName('')
          setLocation('')
        }, 2500)
      }
    } catch {
      // Fail silently
    } finally {
      setSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-[300] flex items-center justify-center p-4">
      <div className="bg-white max-w-[500px] w-full max-h-[90vh] overflow-y-auto p-5 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-5 bg-transparent border-none text-text-muted text-[24px] cursor-pointer hover:text-red transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="font-display text-[32px] text-text mb-1">
          Write a <span className="text-red">Review</span>
        </h2>

        {submitted ? (
          <div className="py-12 text-center">
            <p className="font-nav text-[15px] tracking-[2px] uppercase text-green mb-2">
              Thank you!
            </p>
            <p className="text-text-muted text-[14px]">
              Your review has been submitted and is pending moderation.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Product selector */}
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

            {/* Stars */}
            <label className="block font-nav text-[11px] tracking-[2.5px] uppercase text-text-muted">
              Rating
            </label>
            <ReviewStarsInput value={stars} onChange={setStars} />

            {/* Review text */}
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

            {/* Name */}
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

            {/* Location */}
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
        )}
      </div>
    </div>
  )
}
