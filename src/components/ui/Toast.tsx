'use client'

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import { X, CheckCircle, AlertCircle, ShoppingBag, Info } from 'lucide-react'

type ToastType = 'success' | 'error' | 'cart' | 'info'

type Toast = {
  id: string
  message: string
  type: ToastType
  duration?: number
}

type ToastContextType = {
  showToast: (message: string, type?: ToastType, duration?: number) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

const ICONS: Record<ToastType, typeof CheckCircle> = {
  success: CheckCircle,
  error: AlertCircle,
  cart: ShoppingBag,
  info: Info,
}

const ICON_COLORS: Record<ToastType, string> = {
  success: 'text-green',
  error: 'text-red',
  cart: 'text-red',
  info: 'text-text-muted',
}

const BORDER_COLORS: Record<ToastType, string> = {
  success: 'border-l-green',
  error: 'border-l-red',
  cart: 'border-l-red',
  info: 'border-l-text-muted',
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
  const [isExiting, setIsExiting] = useState(false)
  const [isEntering, setIsEntering] = useState(true)
  const Icon = ICONS[toast.type]
  const duration = toast.duration ?? 2500

  useEffect(() => {
    // Trigger enter animation
    const enterTimer = setTimeout(() => setIsEntering(false), 10)
    return () => clearTimeout(enterTimer)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true)
      setTimeout(() => onDismiss(toast.id), 300)
    }, duration)
    return () => clearTimeout(timer)
  }, [toast.id, duration, onDismiss])

  const handleDismiss = () => {
    setIsExiting(true)
    setTimeout(() => onDismiss(toast.id), 300)
  }

  return (
    <div
      className={`flex items-center gap-3 bg-white border border-border-light border-l-[3px] ${BORDER_COLORS[toast.type]} shadow-lg px-4 py-3 max-w-[340px] w-full transition-all duration-300 ${
        isExiting
          ? 'opacity-0 translate-x-[100px]'
          : isEntering
            ? 'opacity-0 translate-y-3'
            : 'opacity-100 translate-x-0 translate-y-0'
      }`}
    >
      <Icon className={`w-[18px] h-[18px] shrink-0 ${ICON_COLORS[toast.type]}`} />
      <p className="font-nav text-[12px] tracking-[1px] uppercase text-text flex-1 leading-snug">
        {toast.message}
      </p>
      <button
        onClick={handleDismiss}
        className="bg-transparent border-none text-text-muted hover:text-text cursor-pointer transition-colors shrink-0"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((message: string, type: ToastType = 'success', duration?: number) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
    setToasts((prev) => [...prev, { id, message, type, duration }])
  }, [])

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container — fixed bottom-right */}
      <div className="fixed bottom-5 right-5 z-[500] flex flex-col gap-2.5 items-end pointer-events-none">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem toast={toast} onDismiss={dismissToast} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
