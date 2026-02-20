'use client'

import { useState } from 'react'

export function ReferralSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <section className="py-10 sm:py-[70px] px-5 sm:px-10 max-w-[800px] mx-auto text-center">
      <div className="text-center mb-12">
        <h2 className="font-display text-[clamp(38px,5vw,56px)] text-text leading-none">
          Give $10, <span className="text-red">Get $10</span>
        </h2>
        <p className="font-nav text-[13px] tracking-[3px] uppercase text-text-muted mt-2">
          Share the hunt with your crew
        </p>
      </div>

      <div className="bg-white border-2 border-red py-6 px-5 sm:py-9 sm:px-9">
        <h3 className="font-display text-[32px] mb-1">
          Refer a <span className="text-red">Friend</span>
        </h3>
        <p className="text-text-light text-[14px] mb-[18px] leading-relaxed">
          They get $10 off. You get $10 off. Everybody wins.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-[380px] mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 py-[11px] px-[13px] border border-border font-body text-[14px] outline-none focus:border-red transition-colors"
          />
          <button
            type="submit"
            className="py-[11px] px-[22px] bg-red text-white border-none font-nav text-[12px] tracking-[2px] uppercase cursor-pointer transition-all duration-300 hover:bg-red-dark"
          >
            Get My Link
          </button>
        </form>

        {submitted && (
          <p className="mt-3 font-nav text-[12px] tracking-[1px] uppercase text-green">
            Referral link sent! Check your email.
          </p>
        )}
      </div>
    </section>
  )
}
