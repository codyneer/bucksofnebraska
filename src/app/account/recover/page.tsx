'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, ArrowLeft } from 'lucide-react'
import { recoverCustomer } from '@/lib/shopify-customer'
import type { FormEvent } from 'react'

export default function RecoverPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await recoverCustomer(email)
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-10 max-w-[480px] mx-auto">
      <div className="text-center mb-10">
        <h1 className="font-display text-[clamp(44px,7vw,64px)] text-text leading-none">
          Reset <span className="text-red">Password</span>
        </h1>
        <p className="font-nav text-[13px] tracking-[3px] uppercase text-text-muted mt-2">
          We&apos;ll send you a reset link
        </p>
      </div>

      {submitted ? (
        <div className="bg-white border border-border-light p-5 sm:p-8 text-center">
          <div className="w-14 h-14 mx-auto mb-4 bg-green/10 border border-green/20 flex items-center justify-center rounded-full">
            <Mail className="w-6 h-6 text-green" />
          </div>
          <h2 className="font-nav text-[16px] tracking-[2px] uppercase text-text mb-2">
            Check Your Email
          </h2>
          <p className="font-body text-[14px] text-text-light leading-relaxed mb-6">
            If an account exists for <strong className="text-text">{email}</strong>, you&apos;ll receive a password reset link shortly.
          </p>
          <Link
            href="/account/login"
            className="inline-flex items-center gap-2 font-nav text-[12px] tracking-[2px] uppercase text-red hover:text-red-dark transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Sign In
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white border border-border-light p-5 sm:p-8">
          {error && (
            <div className="mb-6 p-3 bg-red/5 border border-red/20 text-red text-[14px] font-body">
              {error}
            </div>
          )}

          <p className="font-body text-[14px] text-text-light leading-relaxed mb-6">
            Enter the email address associated with your account and we&apos;ll send you a link to reset your password.
          </p>

          <div className="mb-6">
            <label className="block font-nav text-[12px] tracking-[2px] uppercase text-text-muted mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              className="w-full py-3 px-4 bg-white border border-border text-text font-body text-[15px] outline-none focus:border-red transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-6 bg-red text-white font-nav text-[13px] tracking-[2px] uppercase border-none cursor-pointer transition-all duration-300 hover:bg-red-dark disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Send Reset Link'}
          </button>

          <div className="mt-6 text-center">
            <Link
              href="/account/login"
              className="inline-flex items-center gap-2 font-nav text-[12px] tracking-[1.5px] uppercase text-text-muted hover:text-red transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Sign In
            </Link>
          </div>
        </form>
      )}
    </div>
  )
}
