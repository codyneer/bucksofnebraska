'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export function ReferralSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [referralData, setReferralData] = useState<{ code: string; link: string } | null>(null)
  const [copied, setCopied] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
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
        {status === 'success' && referralData ? (
          <>
            <p className="font-nav text-[16px] tracking-[2px] uppercase text-green mb-1">
              You&apos;re In
            </p>
            <p className="text-text-muted text-[13px] font-body mb-5">
              Share your link — friends get $10 off, you earn $10 credit.
            </p>

            <p className="font-display text-[24px] text-red mb-3">
              {referralData.code}
            </p>

            <div className="flex items-center gap-2 max-w-[400px] mx-auto">
              <input
                readOnly
                value={referralData.link}
                className="flex-1 py-2 px-3 border border-border font-body text-[13px] text-text bg-offWhite min-w-0"
              />
              <button
                onClick={handleCopy}
                className="py-2 px-4 bg-brand-black text-white font-nav text-[11px] tracking-[2px] uppercase flex items-center gap-1.5 transition-all duration-300 hover:bg-red whitespace-nowrap"
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
          </>
        ) : (
          <>
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
                disabled={status === 'loading'}
                className="flex-1 py-[11px] px-[13px] border border-border font-body text-[14px] outline-none focus:border-red transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="py-[11px] px-[22px] bg-red text-white border-none font-nav text-[12px] tracking-[2px] uppercase cursor-pointer transition-all duration-300 hover:bg-red-dark disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Creating...' : 'Get My Link'}
              </button>
            </form>

            {status === 'error' && (
              <p className="mt-3 font-nav text-[12px] tracking-[1px] uppercase text-red">
                Something went wrong. Please try again.
              </p>
            )}
          </>
        )}
      </div>
    </section>
  )
}
