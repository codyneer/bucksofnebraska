'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/account/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="py-20 px-4 sm:px-10 max-w-[800px] mx-auto text-center">
        <div className="inline-block w-8 h-8 border-2 border-border border-t-red rounded-full animate-spin" />
        <p className="font-nav text-[12px] tracking-[2px] uppercase text-text-muted mt-4">
          Loading...
        </p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
