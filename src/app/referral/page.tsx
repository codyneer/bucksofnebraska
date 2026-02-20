'use client'

import { useState } from 'react'
import { Gift, Share2, DollarSign, Copy, Check } from 'lucide-react'
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
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [referralData, setReferralData] = useState<{ code: string; link: string } | null>(null)
  const [copied, setCopied] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')

    try {
      const res = await fetch('/api/referral/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        const data = await res.json()
        setReferralData({ code: data.code, link: data.link })
        setStatus('success')
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 3000)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  const handleCopy = () => {
    if (!referralData) return
    navigator.clipboard.writeText(referralData.link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="py-12 sm:py-20 px-5 sm:px-10 max-w-[800px] mx-auto">
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

      {/* Email capture / Success state */}
      {status === 'success' && referralData ? (
        <div className="text-center bg-white border border-border-light p-5 sm:p-8">
          <p className="font-nav text-[18px] tracking-[2px] uppercase text-green mb-2">
            You&apos;re In
          </p>
          <p className="text-text-muted text-[14px] font-body mb-6">
            Share your link with friends. They get $10 off their first order of $40+, and you earn $10 credit.
          </p>

          <div className="bg-offWhite border border-border p-5 max-w-[460px] mx-auto">
            <span className="font-nav text-[11px] tracking-[1.5px] text-text-muted block mb-1 uppercase">
              Your referral code
            </span>
            <p className="font-display text-[28px] text-red mb-4">
              {referralData.code}
            </p>

            <span className="font-nav text-[11px] tracking-[1.5px] text-text-muted block mb-2 uppercase">
              Your shareable link
            </span>
            <div className="flex items-center gap-2">
              <input
                readOnly
                value={referralData.link}
                className="flex-1 py-2.5 px-3 border border-border font-body text-[13px] text-text bg-white min-w-0"
              />
              <button
                onClick={handleCopy}
                className="py-2.5 px-4 bg-brand-black text-white font-nav text-[11px] tracking-[2px] uppercase flex items-center gap-1.5 transition-all duration-300 hover:bg-red whitespace-nowrap"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white border border-border-light p-5 sm:p-8 text-center">
          <h2 className="font-display text-[28px] text-text mb-2">
            Ready to <span className="text-red">Start Earning?</span>
          </h2>
          <p className="text-text-light text-[14px] font-body mb-6">
            Enter your email to get your unique referral link.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-[420px] mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === 'loading'}
              placeholder="your@email.com"
              className="flex-1 py-3 px-4 bg-white border border-border text-text font-body text-[15px] outline-none focus:border-red transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="py-3 px-6 bg-red text-white font-nav text-[13px] tracking-[2px] uppercase border-none cursor-pointer transition-all duration-300 hover:bg-red-dark whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Creating...' : 'Join Now'}
            </button>
          </div>
          {status === 'error' && (
            <p className="mt-3 font-nav text-[12px] tracking-[1px] uppercase text-red">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      )}

      {/* Bottom note */}
      <p className="text-center text-text-muted text-[13px] font-body mt-8">
        Referral credits are applied automatically at checkout. $40 minimum purchase required. No limit on how many friends you can refer.
      </p>
    </div>
  )
}
