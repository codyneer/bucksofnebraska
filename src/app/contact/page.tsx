'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'
import { useToast } from '@/components/ui/Toast'

export default function ContactPage() {
  const { showToast } = useToast()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, subject, message }),
      })

      if (res.ok) {
        setStatus('success')
        showToast('Message sent', 'success')
      } else {
        setStatus('error')
        showToast('Failed to send message', 'error')
        setTimeout(() => setStatus('idle'), 3000)
      }
    } catch {
      setStatus('error')
      showToast('Failed to send message', 'error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <div className="py-12 sm:py-20 px-5 sm:px-10 max-w-[600px] mx-auto">
      <h1 className="font-display text-[clamp(44px,7vw,64px)] text-center text-text mb-2">
        Get in <span className="text-red">Touch</span>
      </h1>
      <p className="text-center font-nav text-[13px] tracking-[3px] uppercase text-text-muted mb-12">
        Questions, feedback, or just want to talk hunting
      </p>

      {status === 'success' ? (
        <div className="text-center py-16 bg-white border border-border-light p-5 sm:p-8">
          <p className="font-nav text-[18px] tracking-[2px] uppercase text-green mb-2">
            Message Sent
          </p>
          <p className="text-text-muted text-[14px] font-body">
            We&apos;ll get back to you within 24 hours.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white border border-border-light p-5 sm:p-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-nav text-[11px] tracking-[2.5px] uppercase text-text-muted mb-1.5">
                First Name
              </label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={status === 'loading'}
                className="w-full py-3 px-3.5 bg-white border border-border text-text font-body text-[15px] outline-none focus:border-red transition-colors disabled:opacity-50"
              />
            </div>
            <div>
              <label className="block font-nav text-[11px] tracking-[2.5px] uppercase text-text-muted mb-1.5">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={status === 'loading'}
                className="w-full py-3 px-3.5 bg-white border border-border text-text font-body text-[15px] outline-none focus:border-red transition-colors disabled:opacity-50"
              />
            </div>
          </div>

          <div>
            <label className="block font-nav text-[11px] tracking-[2.5px] uppercase text-text-muted mb-1.5">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading'}
              className="w-full py-3 px-3.5 bg-white border border-border text-text font-body text-[15px] outline-none focus:border-red transition-colors disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block font-nav text-[11px] tracking-[2.5px] uppercase text-text-muted mb-1.5">
              Subject
            </label>
            <select
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              disabled={status === 'loading'}
              className="w-full py-3 px-3.5 bg-white border border-border text-text font-body text-[15px] outline-none focus:border-red transition-colors disabled:opacity-50"
            >
              <option value="">Select a topic</option>
              <option value="order">Order Question</option>
              <option value="product">Product Inquiry</option>
              <option value="wholesale">Wholesale / Partnerships</option>
              <option value="returns">Returns & Exchanges</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block font-nav text-[11px] tracking-[2.5px] uppercase text-text-muted mb-1.5">
              Message
            </label>
            <textarea
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={status === 'loading'}
              className="w-full py-3 px-3.5 bg-white border border-border text-text font-body text-[15px] outline-none focus:border-red transition-colors resize-vertical disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-4 bg-red text-white border-none font-nav text-[14px] tracking-[3px] uppercase cursor-pointer transition-all duration-300 hover:bg-red-dark disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'error' && (
            <p className="text-center font-nav text-[12px] tracking-[1px] uppercase text-red">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      )}
    </div>
  )
}
