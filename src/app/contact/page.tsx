'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="py-12 sm:py-20 px-5 sm:px-10 max-w-[600px] mx-auto">
      <h1 className="font-display text-[clamp(44px,7vw,64px)] text-center text-text mb-2">
        Get in <span className="text-red">Touch</span>
      </h1>
      <p className="text-center font-nav text-[13px] tracking-[3px] uppercase text-text-muted mb-12">
        Questions, feedback, or just want to talk hunting
      </p>

      {submitted ? (
        <div className="text-center py-16 bg-white border border-border-light p-5 sm:p-8">
          <p className="font-nav text-[18px] tracking-[2px] uppercase text-green mb-2">
            Message Sent
          </p>
          <p className="text-text-muted text-[14px] font-body">
            We&apos;ll get back to you within 24 hours.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white border border-border-light p-5 sm:p-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-nav text-[11px] tracking-[2.5px] uppercase text-text-muted mb-1.5">
                First Name
              </label>
              <input
                type="text"
                required
                className="w-full py-3 px-3.5 bg-white border border-border text-text font-body text-[15px] outline-none focus:border-red transition-colors"
              />
            </div>
            <div>
              <label className="block font-nav text-[11px] tracking-[2.5px] uppercase text-text-muted mb-1.5">
                Last Name
              </label>
              <input
                type="text"
                required
                className="w-full py-3 px-3.5 bg-white border border-border text-text font-body text-[15px] outline-none focus:border-red transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block font-nav text-[11px] tracking-[2.5px] uppercase text-text-muted mb-1.5">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full py-3 px-3.5 bg-white border border-border text-text font-body text-[15px] outline-none focus:border-red transition-colors"
            />
          </div>

          <div>
            <label className="block font-nav text-[11px] tracking-[2.5px] uppercase text-text-muted mb-1.5">
              Subject
            </label>
            <select
              required
              className="w-full py-3 px-3.5 bg-white border border-border text-text font-body text-[15px] outline-none focus:border-red transition-colors"
            >
              <option value="">Select a topic</option>
              <option value="order">Order Question</option>
              <option value="product">Product Inquiry</option>
              <option value="wholesale">Wholesale / Partnerships</option>
              <option value="returns">Returns & Exchanges</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block font-nav text-[11px] tracking-[2.5px] uppercase text-text-muted mb-1.5">
              Message
            </label>
            <textarea
              required
              rows={5}
              className="w-full py-3 px-3.5 bg-white border border-border text-text font-body text-[15px] outline-none focus:border-red transition-colors resize-vertical"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-red text-white border-none font-nav text-[14px] tracking-[3px] uppercase cursor-pointer transition-all duration-300 hover:bg-red-dark"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  )
}
