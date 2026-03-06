'use client'

import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'

export function FooterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 3000)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <div>
      <h3 className="font-display text-[clamp(28px,4vw,38px)] text-white leading-none mb-2">
        Big Nebraska <span className="text-red">Buck Alerts</span>
      </h3>
      <p className="font-body text-[14px] text-white/50 leading-relaxed mb-5 max-w-[420px]">
        Get early access to new drops, exclusive deals, and the biggest bucks coming out of Nebraska.
      </p>

      {status === 'success' ? (
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green" />
          <p className="font-nav text-[13px] tracking-[2px] uppercase text-green">
            You&apos;re signed up!
          </p>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-[460px]">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === 'loading'}
              className="flex-1 py-3 px-4 border border-white/20 bg-white/[0.07] text-white font-body text-[14px] outline-none focus:border-red transition-colors placeholder:text-white/40 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="py-3 px-7 bg-red text-white border-none font-nav text-[12px] tracking-[2.5px] uppercase cursor-pointer transition-all duration-300 hover:bg-red-dark disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {status === 'loading' ? 'Signing Up...' : 'Subscribe'}
            </button>
          </form>

          <p className="mt-3 font-body text-[11px] text-white/30 leading-relaxed max-w-[460px]">
            By providing your email, you agree to receive emails from us. View our{' '}
            <Link href="/privacy" className="text-white/40 underline underline-offset-2 hover:text-white/60 transition-colors">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link href="/terms" className="text-white/40 underline underline-offset-2 hover:text-white/60 transition-colors">
              Terms of Use
            </Link>
            .
          </p>

          {status === 'error' && (
            <p className="mt-2 font-nav text-[11px] tracking-[1px] uppercase text-red-light">
              Something went wrong. Please try again.
            </p>
          )}
        </>
      )}
    </div>
  )
}
