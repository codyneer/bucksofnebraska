'use client'

import { useState } from 'react'
import { CheckCircle } from 'lucide-react'

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
      <h4 className="font-nav text-[12px] font-semibold tracking-[3px] uppercase text-red mb-3.5">
        Buck Alerts
      </h4>
      <p className="font-body text-[13px] text-white/50 leading-relaxed mb-4">
        Get notified about new drops, deals, and the biggest bucks in Nebraska.
      </p>

      {status === 'success' ? (
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green" />
          <p className="font-nav text-[12px] tracking-[1.5px] uppercase text-green">
            You&apos;re signed up!
          </p>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === 'loading'}
              className="w-full py-2.5 px-3 border border-white/20 bg-white/10 text-white font-body text-[13px] outline-none focus:border-red transition-colors placeholder:text-white/40 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-2.5 bg-red text-white border-none font-nav text-[11px] tracking-[2px] uppercase cursor-pointer transition-all duration-300 hover:bg-red-dark disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>

          {status === 'error' && (
            <p className="mt-2 font-nav text-[11px] tracking-[1px] uppercase text-red-light">
              Something went wrong.
            </p>
          )}
        </>
      )}
    </div>
  )
}
