'use client'

import { useState, useEffect } from 'react'
import { AdminPanel } from '@/components/reviews/AdminPanel'
import { Lock } from 'lucide-react'

const ADMIN_TOKEN_KEY = 'bn_admin_token'

export default function AdminPage() {
  const [isAuthed, setIsAuthed] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Check for existing session
  useEffect(() => {
    const token = localStorage.getItem(ADMIN_TOKEN_KEY)
    if (token) {
      setIsAuthed(true)
    }
    setIsChecking(false)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (res.ok) {
        const data = await res.json()
        localStorage.setItem(ADMIN_TOKEN_KEY, data.token)
        setIsAuthed(true)
      } else {
        setError('Invalid email or password')
      }
    } catch {
      setError('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY)
    setIsAuthed(false)
    setEmail('')
    setPassword('')
  }

  if (isChecking) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-red border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!isAuthed) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-5">
        <form onSubmit={handleLogin} className="w-full max-w-[360px]">
          <div className="text-center mb-8">
            <div className="w-12 h-12 mx-auto mb-4 bg-brand-black flex items-center justify-center">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-display text-[36px] text-text">Admin Access</h1>
            <p className="font-nav text-[11px] tracking-[2px] uppercase text-text-muted mt-1">
              Review moderation panel
            </p>
          </div>

          <div className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              disabled={isLoading}
              className="w-full py-3 px-4 border border-border font-body text-[15px] text-text outline-none focus:border-red transition-colors disabled:opacity-50"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              disabled={isLoading}
              className="w-full py-3 px-4 border border-border font-body text-[15px] text-text outline-none focus:border-red transition-colors disabled:opacity-50"
            />
          </div>

          {error && (
            <p className="mt-3 font-nav text-[12px] tracking-[1px] uppercase text-red text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 py-3 bg-brand-black text-white font-nav text-[13px] tracking-[2px] uppercase transition-all duration-300 hover:bg-red disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-end px-5 sm:px-10 pt-4">
        <button
          onClick={handleLogout}
          className="font-nav text-[11px] tracking-[2px] uppercase text-text-muted hover:text-red transition-colors"
        >
          Sign Out
        </button>
      </div>
      <AdminPanel initialReviews={[]} />
    </div>
  )
}
