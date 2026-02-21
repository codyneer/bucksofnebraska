import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const title = searchParams.get('title') || 'Product'
  const price = searchParams.get('price') || ''
  const image = searchParams.get('image') || ''

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
          backgroundColor: '#FAF8F5',
          position: 'relative',
        }}
      >
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

        {/* Product image — left side */}
        <div
          style={{
            width: '50%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
          }}
        >
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt={title}
              width={480}
              height={480}
              style={{
                objectFit: 'contain',
                maxWidth: '100%',
                maxHeight: '100%',
              }}
            />
          ) : (
            <div
              style={{
                width: '300px',
                height: '300px',
                backgroundColor: '#F0EDE8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logoBase64}
                alt="Bucks of Nebraska"
                width={200}
                height={126}
                style={{ opacity: 0.3 }}
              />
            </div>
          )}
        </div>

        {/* Product info — right side */}
        <div
          style={{
            width: '50%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '40px 50px 40px 10px',
          }}
        >
          {/* Logo — small */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoBase64}
            alt="Bucks of Nebraska"
            width={160}
            height={101}
            style={{ marginBottom: '24px' }}
          />

          {/* Product title */}
          <div
            style={{
              fontSize: title.length > 35 ? '32px' : '38px',
              color: '#2A2A2A',
              fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              lineHeight: 1.2,
              display: 'flex',
              maxWidth: '480px',
            }}
          >
            {title}
          </div>

          {/* Price */}
          {price && (
            <div
              style={{
                fontSize: '36px',
                color: '#C41E3A',
                fontWeight: 700,
                marginTop: '16px',
                display: 'flex',
              }}
            >
              {price}
            </div>
          )}

          {/* Free shipping note */}
          <div
            style={{
              fontSize: '14px',
              color: '#999999',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              marginTop: '20px',
              display: 'flex',
            }}
          >
            Free shipping over $75
          </div>
        </div>

        {/* Domain watermark */}
        <div
          style={{
            position: 'absolute',
            bottom: '18px',
            right: '40px',
            fontSize: '13px',
            color: 'rgba(0,0,0,0.2)',
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
