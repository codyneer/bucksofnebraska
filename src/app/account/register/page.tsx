'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { UserPlus } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import type { FormEvent } from 'react'

export default function RegisterPage() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [acceptsMarketing, setAcceptsMarketing] = useState(true)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/account')
    }
  }, [isAuthenticated, isLoading, router])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (password.length < 5) {
      setError('Password must be at least 5 characters.')
      return
    }

    setIsSubmitting(true)

    try {
      await register({
        email,
        password,
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        acceptsMarketing,
      })
      router.push('/account')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) return null

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-10 max-w-[480px] mx-auto">
      <div className="text-center mb-10">
        <h1 className="font-display text-[clamp(44px,7vw,64px)] text-text leading-none">
          Create <span className="text-red">Account</span>
        </h1>
        <p className="font-nav text-[13px] tracking-[3px] uppercase text-text-muted mt-2">
          Join the BN community
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-border-light p-5 sm:p-8">
        {error && (
          <div className="mb-6 p-3 bg-red/5 border border-red/20 text-red text-[14px] font-body">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block font-nav text-[12px] tracking-[2px] uppercase text-text-muted mb-2">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              className="w-full py-3 px-4 bg-white border border-border text-text font-body text-[15px] outline-none focus:border-red transition-colors"
            />
          </div>
          <div>
            <label className="block font-nav text-[12px] tracking-[2px] uppercase text-text-muted mb-2">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              className="w-full py-3 px-4 bg-white border border-border text-text font-body text-[15px] outline-none focus:border-red transition-colors"
            />
          </div>
        </div>

        <div className="mb-5">
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

        <div className="mb-5">
          <label className="block font-nav text-[12px] tracking-[2px] uppercase text-text-muted mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="At least 5 characters"
            className="w-full py-3 px-4 bg-white border border-border text-text font-body text-[15px] outline-none focus:border-red transition-colors"
          />
        </div>

        <div className="mb-6">
          <label className="block font-nav text-[12px] tracking-[2px] uppercase text-text-muted mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm your password"
            className="w-full py-3 px-4 bg-white border border-border text-text font-body text-[15px] outline-none focus:border-red transition-colors"
          />
        </div>

        <label className="flex items-start gap-3 mb-6 cursor-pointer">
          <input
            type="checkbox"
            checked={acceptsMarketing}
            onChange={(e) => setAcceptsMarketing(e.target.checked)}
            className="mt-1 w-4 h-4 accent-red"
          />
          <span className="font-body text-[13px] text-text-light leading-snug">
            Sign me up for emails about new products, drops, and hunting content.
          </span>
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-6 bg-red text-white font-nav text-[13px] tracking-[2px] uppercase border-none cursor-pointer transition-all duration-300 hover:bg-red-dark disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </button>

        <div className="mt-6 text-center">
          <p className="font-body text-[14px] text-text-light">
            Already have an account?{' '}
            <Link href="/account/login" className="text-red hover:text-red-dark font-semibold transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}
