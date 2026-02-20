'use client'

import Script from 'next/script'

export function OmnisendScript() {
  const brandId = process.env.NEXT_PUBLIC_OMNISEND_BRAND_ID

  if (!brandId) return null

  return (
    <Script
      id="omnisend-script"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.omnisend = window.omnisend || [];
          omnisend.push(["accountID", "${brandId}"]);
          omnisend.push(["track", "$pageViewed"]);
          !function(){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://omnisnp.com/inshop/launcher-v2.js",var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}();
        `,
      }}
    />
  )
}
