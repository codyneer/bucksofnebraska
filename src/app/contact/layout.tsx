import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the Bucks of Nebraska team. Questions, feedback, wholesale inquiries.',
  openGraph: {
    title: 'Contact — Bucks of Nebraska',
    description: 'Get in touch with the Bucks of Nebraska team.',
    images: [{ url: '/api/og?title=Get%20in%20Touch&subtitle=Questions%2C%20Feedback%2C%20or%20Wholesale%20Inquiries', width: 1200, height: 630 }],
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
