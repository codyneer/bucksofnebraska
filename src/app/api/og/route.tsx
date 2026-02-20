import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const title = searchParams.get('title') || 'Bucks of Nebraska'
  const subtitle = searchParams.get('subtitle') || 'Nebraska Hunting Apparel'

  // Load the deer head logo from public directory
  const logoUrl = new URL('/logos/bn-deer-logo.png', req.url)
  const logoData = await fetch(logoUrl).then((res) => res.arrayBuffer())
  const logoBase64 = `data:image/png;base64,${Buffer.from(logoData).toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1A1A1A',
          position: 'relative',
        }}
      >
        {/* Subtle background texture */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 50% 40%, #2C2C2C 0%, #1A1A1A 70%)',
            display: 'flex',
          }}
        />

        {/* Top red accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            backgroundColor: '#C41E3A',
            display: 'flex',
          }}
        />

        {/* Bottom red accent bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '6px',
            backgroundColor: '#C41E3A',
            display: 'flex',
          }}
        />

        {/* Content container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1,
            padding: '40px 60px',
          }}
        >
          {/* Logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoBase64}
            alt="Bucks of Nebraska"
            width={320}
            height={202}
            style={{
              marginBottom: '36px',
            }}
          />

          {/* Title */}
          <div
            style={{
              fontSize: title.length > 40 ? '36px' : '44px',
              color: '#FFFFFF',
              textAlign: 'center',
              fontWeight: 700,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              lineHeight: 1.15,
              maxWidth: '900px',
              display: 'flex',
            }}
          >
            {title}
          </div>

          {/* Subtitle */}
          {subtitle && (
            <div
              style={{
                fontSize: '20px',
                color: '#C41E3A',
                textAlign: 'center',
                letterSpacing: '4px',
                textTransform: 'uppercase',
                marginTop: '16px',
                display: 'flex',
              }}
            >
              {subtitle}
            </div>
          )}
        </div>

        {/* Domain watermark */}
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            right: '40px',
            fontSize: '14px',
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            display: 'flex',
          }}
        >
          bucksofnebraska.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
