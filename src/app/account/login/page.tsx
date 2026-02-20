'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LogIn } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import type { FormEvent } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/account')
    }
  }, [isAuthenticated, isLoading, router])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await login(email, password)
      router.push('/account')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) return null

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-10 max-w-[480px] mx-auto">
      <div className="text-center mb-10">
        <h1 className="font-display text-[clamp(44px,7vw,64px)] text-text leading-none">
          Sign <span className="text-red">In</span>
        </h1>
        <p className="font-nav text-[13px] tracking-[3px] uppercase text-text-muted mt-2">
          Access your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-border-light p-5 sm:p-8">
        {error && (
          <div className="mb-6 p-3 bg-red/5 border border-red/20 text-red text-[14px] font-body">
            {error}
          </div>
        )}

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

        <div className="mb-6">
          <label className="block font-nav text-[12px] tracking-[2px] uppercase text-text-muted mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
            className="w-full py-3 px-4 bg-white border border-border text-text font-body text-[15px] outline-none focus:border-red transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-6 bg-red text-white font-nav text-[13px] tracking-[2px] uppercase border-none cursor-pointer transition-all duration-300 hover:bg-red-dark disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <LogIn className="w-4 h-4" />
          {isSubmitting ? 'Signing In...' : 'Sign In'}
        </button>

        <div className="mt-6 text-center space-y-3">
          <Link
            href="/account/recover"
            className="block font-nav text-[12px] tracking-[1.5px] uppercase text-text-muted hover:text-red transition-colors"
          >
            Forgot Password?
          </Link>
          <div className="w-full h-px bg-border" />
          <p className="font-body text-[14px] text-text-light">
            Don&apos;t have an account?{' '}
            <Link href="/account/register" className="text-red hover:text-red-dark font-semibold transition-colors">
              Create one
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}
