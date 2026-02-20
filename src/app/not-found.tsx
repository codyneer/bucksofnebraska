import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-10">
      <div className="text-center">
        <h1 className="font-display text-[120px] text-red/20 leading-none">404</h1>
        <h2 className="font-display text-[32px] text-text mb-2">
          Page Not <span className="text-red">Found</span>
        </h2>
        <p className="text-text-muted text-[15px] font-body mb-8">
          Looks like this trail went cold. Let&apos;s get you back on track.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/"
            className="py-3 px-6 bg-red text-white font-nav text-[13px] tracking-[2px] uppercase transition-all duration-300 hover:bg-red-dark"
          >
            Go Home
          </Link>
          <Link
            href="/shop"
            className="py-3 px-6 bg-transparent text-text font-nav text-[13px] tracking-[2px] uppercase border-2 border-border transition-all duration-300 hover:border-red hover:text-red"
          >
            Shop All
          </Link>
        </div>
      </div>
    </div>
  )
}
