'use client'

import { useState } from 'react'
import { Gift, Share2, DollarSign } from 'lucide-react'
import type { FormEvent } from 'react'

const steps = [
  {
    icon: Gift,
    number: '01',
    title: 'Sign Up',
    description: 'Enter your email below to join the referral program and get your unique link.',
  },
  {
    icon: Share2,
    number: '02',
    title: 'Share',
    description: 'Send your referral link to friends and fellow hunters.',
  },
  {
    icon: DollarSign,
    number: '03',
    title: 'Earn',
    description: 'They get $10 off. You get $10 off. Everyone wins.',
  },
]

export default function ReferralPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
    }
  }

  return (
    <div className="py-20 px-10 max-w-[800px] mx-auto">
      <div className="text-center mb-14">
        <h1 className="font-display text-[clamp(44px,7vw,64px)] text-text leading-none">
          Give $10, <span className="text-red">Get $10</span>
        </h1>
        <p className="font-nav text-[13px] tracking-[3px] uppercase text-text-muted mt-2">
          Share the brand. Earn rewards.
        </p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {steps.map((step) => (
          <div
            key={step.number}
            className="bg-white border border-border-light p-6 text-center"
          >
            <div className="w-14 h-14 mx-auto mb-4 bg-red/[0.06] border border-red/20 flex items-center justify-center">
              <step.icon className="w-6 h-6 text-red" />
            </div>
            <span className="font-display text-[36px] text-red/20 block leading-none mb-1">
              {step.number}
            </span>
            <h3 className="font-nav text-[14px] tracking-[2px] uppercase text-text mb-2">
              {step.title}
            </h3>
            <p className="text-text-light text-[14px] leading-relaxed font-body">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      {/* Email capture */}
      {submitted ? (
        <div className="text-center py-12 bg-white border border-border-light p-8">
          <p className="font-nav text-[18px] tracking-[2px] uppercase text-green mb-2">
            You&apos;re In
          </p>
          <p className="text-text-muted text-[14px] font-body mb-4">
            Check your email for your unique referral link.
          </p>
          <div className="bg-offWhite border border-border p-4 inline-block">
            <span className="font-nav text-[12px] tracking-[1px] text-text-muted">
              Your referral link:
            </span>
            <p className="font-nav text-[14px] text-red mt-1">
              bucksofnebraska.com/ref/your-code
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white border border-border-light p-8 text-center">
          <h2 className="font-display text-[28px] text-text mb-2">
            Ready to <span className="text-red">Start Earning?</span>
          </h2>
          <p className="text-text-light text-[14px] font-body mb-6">
            Enter your email to get your unique referral link.
          </p>
          <div className="flex gap-3 max-w-[420px] mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              className="flex-1 py-3 px-4 bg-white border border-border text-text font-body text-[15px] outline-none focus:border-red transition-colors"
            />
            <button
              type="submit"
              className="py-3 px-6 bg-red text-white font-nav text-[13px] tracking-[2px] uppercase border-none cursor-pointer transition-all duration-300 hover:bg-red-dark whitespace-nowrap"
            >
              Join Now
            </button>
          </div>
        </form>
      )}

      {/* Bottom note */}
      <p className="text-center text-text-muted text-[13px] font-body mt-8">
        Referral credits are applied automatically at checkout. No limit on how many friends you can refer.
      </p>
    </div>
  )
}
