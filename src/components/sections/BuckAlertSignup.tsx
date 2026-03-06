'use client'

import { useState } from 'react'
import { Bell, CheckCircle } from 'lucide-react'

export function BuckAlertSignup() {
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
    <section className="py-10 sm:py-16 px-5 sm:px-10 max-w-[700px] mx-auto text-center">
      <div className="bg-brand-black py-8 px-5 sm:py-12 sm:px-10">
        <Bell className="w-8 h-8 text-red mx-auto mb-3" />
        <h2 className="font-display text-[clamp(28px,5vw,42px)] text-white leading-none mb-2">
          Big Nebraska <span className="text-red">Buck Alerts</span>
        </h2>
        <p className="font-body text-[14px] text-white/60 mb-6 max-w-[400px] mx-auto leading-relaxed">
          Get notified about new drops, exclusive deals, and the biggest bucks coming out of Nebraska.
        </p>

        {status === 'success' ? (
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="w-5 h-5 text-green" />
            <p className="font-nav text-[14px] tracking-[2px] uppercase text-green">
              You&apos;re signed up
            </p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-[400px] mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === 'loading'}
                className="flex-1 py-[11px] px-[13px] border border-white/20 bg-white/10 text-white font-body text-[14px] outline-none focus:border-red transition-colors placeholder:text-white/40 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="py-[11px] px-[22px] bg-red text-white border-none font-nav text-[12px] tracking-[2px] uppercase cursor-pointer transition-all duration-300 hover:bg-red-dark disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {status === 'loading' ? 'Signing Up...' : 'Sign Up'}
              </button>
            </form>

            {status === 'error' && (
              <p className="mt-3 font-nav text-[12px] tracking-[1px] uppercase text-red-light">
                Something went wrong. Please try again.
              </p>
            )}
          </>
        )}
      </div>
    </section>
  )
}
