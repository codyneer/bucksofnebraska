import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact — Bucks of Nebraska',
  description: 'Get in touch with the Bucks of Nebraska team. Questions, feedback, wholesale inquiries.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
