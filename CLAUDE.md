# CLAUDE.md — Bucks of Nebraska

## Project Overview
Headless Shopify ecommerce storefront for **Bucks of Nebraska**, a Nebraska hunting apparel brand. Built with Next.js 14 (App Router) + Tailwind CSS, deployed on Vercel, powered by Shopify Storefront API.

**Reference prototype:** See `reference/bucks-of-nebraska-v4.html` in this repo — this is the pixel-perfect visual target for every component, page, and interaction.

---

## Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS with custom config
- **Commerce:** Shopify Storefront API (GraphQL) for products, cart, checkout
- **Admin:** Shopify Admin API for review metafields, order webhooks
- **Deployment:** Vercel
- **State:** React Context for cart state
- **Fonts:** Google Fonts — Bebas Neue, Oswald (400-700), Bitter (400-700)

## Environment Variables
```
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=xxxxx
SHOPIFY_ADMIN_ACCESS_TOKEN=xxxxx
```

---

## Design Tokens (tailwind.config.ts)

```ts
theme: {
  extend: {
    colors: {
      red: { DEFAULT: '#C41E3A', dark: '#9B1B30', light: '#E8354F' },
      cream: '#FAF8F5',
      offWhite: '#F5F3F0',
      charcoal: '#2C2C2C',
      brand: { black: '#1A1A1A' },
      gold: '#B8860B',
      green: '#2D7A3A',
      border: { DEFAULT: '#E5E2DD', light: '#F0EDE8' },
      text: { DEFAULT: '#2A2A2A', light: '#666666', muted: '#999999' },
    },
    fontFamily: {
      display: ['Bebas Neue', 'sans-serif'],    // headings, prices
      nav: ['Oswald', 'sans-serif'],             // nav, buttons, labels (always uppercase)
      body: ['Bitter', 'Georgia', 'serif'],      // body copy
    },
  }
}
```

### Design Rules
- **Light cream (#FAF8F5)** background for all shopping/ecom pages
- **Dark (#1A1A1A)** background ONLY for: hero section, footer, brand bar
- **Red (#C41E3A)** = primary accent for CTAs, prices, urgency, active states
- All nav/button/label text: Oswald, uppercase, letter-spacing 2-3px
- All headings/prices: Bebas Neue
- All body copy: Bitter serif
- No emojis in production components (used in prototype for placeholder icons only — replace with Lucide icons or SVGs)

---

## File Structure

```
/app
  layout.tsx               → BrandBar + AnnouncementBar + Navbar + Footer
  page.tsx                 → Homepage
  /shop/page.tsx           → Shop All
  /collections/[handle]/page.tsx → Dynamic collection pages
  /products/[handle]/page.tsx    → Product Detail Page
  /blog/page.tsx
  /recipes/page.tsx
  /podcast/page.tsx
  /about/page.tsx
  /contact/page.tsx
  /referral/page.tsx
  /review/page.tsx         → Review submission (linked from post-purchase email)
  /admin/page.tsx          → Review moderation (hidden)
/components
  /layout
    BrandBar.tsx           → Black bar: "An Outdoor Brand Co. Family" + brand links
    AnnouncementBar.tsx    → Red scrolling marquee bar
    Navbar.tsx             → Sticky nav with mega menus + cart icon
    MegaMenu.tsx           → Dropdown mega menu component
    Footer.tsx             → Black footer, 4 columns
  /product
    ProductCard.tsx        → Card with image, name, price, tag, urgency, quick-add
    ProductGrid.tsx        → 3-column responsive grid
    BundleTiers.tsx        → Buy 1/2/3+ tiered pricing selector
    SizeSelector.tsx       → Size button row
  /cart
    CartDrawer.tsx         → Slide-in drawer with all cart features
    CartItem.tsx           → Individual cart line item
    FreeShippingBar.tsx    → Progress bar ($75 threshold)
    OrderBump.tsx          → Dashed-border checkbox upsell
    CartUpsells.tsx        → "Complete Your Kit" product suggestions
  /reviews
    ReviewCarousel.tsx     → Homepage horizontal scrolling reviews
    ReviewCard.tsx         → Individual review display card
    ReviewModal.tsx        → Review submission form modal
    ReviewStars.tsx        → Star display + interactive star input
    ProductReviews.tsx     → PDP review list for specific product
    AdminPanel.tsx         → Approve/deny pending reviews
  /sections
    HeroSection.tsx        → Full-viewport hero with background image
    SocialProofBar.tsx     → Stats bar below hero
    TrustBadges.tsx        → 4 trust icons row
    LifestyleGrid.tsx      → CSS grid photo layout
    RedBanner.tsx          → Full-width red CTA section
    ReferralSection.tsx    → "Give $10 Get $10" with email capture
    StatePrideCards.tsx    → 3 numbered cards
  /ui
    Button.tsx             → Primary, outline, outline-dark variants
    Toast.tsx              → Bottom-right notification
    SectionHeader.tsx      → Centered h2 + subtitle pattern
    RevealOnScroll.tsx     → Intersection observer animation wrapper
/lib
  shopify.ts              → Storefront API client, GraphQL queries
  shopify-admin.ts        → Admin API client for reviews
  reviews.ts              → Review CRUD helpers
  cart-context.tsx        → Cart React Context provider
  utils.ts                → formatPrice, calculateShipping, etc.
/reference
  bucks-of-nebraska-v4.html → Visual prototype (keep for reference)
/public
  /logos                   → Brand logos (transparent PNGs)
```

---

## Component Specifications

### BrandBar
- Full-width, `bg-brand-black`, padding 5px 20px, flex centered, gap 20px
- Label: "An Outdoor Brand Co. Family" — font-nav text-[9px] tracking-[2px] uppercase, white 35% opacity
- Links separated by 1px white/10% dividers:
  - Outdoor Brand Co. → outdoorbrandcompany.com (external)
  - Bucks of Nebraska → highlighted red-light, shows small N-antler icon image
  - GB2 Outdoors, On Point Land Mgmt, BN Properties → external links
- All links: font-nav text-[10px] tracking-[1.5px] uppercase, white 50% opacity, hover → white

### AnnouncementBar
- Full-width `bg-red`, white text
- CSS marquee animation (translateX, 22s linear infinite, duplicated content)
- Messages: free shipping, new collection, star rating, podcast episode

### Navbar
- `sticky top-0 z-100 bg-white border-b`, adds shadow on scroll
- 3-column CSS grid: `grid-template-columns: 1fr auto 1fr`
- Left: Shop dropdown, Community dropdown, Podcast link
- Center: Deer head logo (transparent PNG), shrinks on scroll (h-14 → h-11)
- Right: Blog link, About link, cart button with red count badge
- **Mega menus:** absolute positioned, white bg, border, shadow-lg. Fade in on hover (opacity/visibility transition 250ms). Shop = 3 columns, Community = 2 columns.

### ProductCard
- White bg, 1px border-light, overflow hidden, cursor pointer
- Hover: shadow-lg, translateY(-3px), image scale(1.03)
- Image: aspect-ratio 1/1.15, object-cover
- Tag badges: absolute top-left. "Best Seller" (red bg), "New" (black bg), "Save X%" (green bg)
- Body: product name (font-nav 14px uppercase), price (font-display 20px red)
- If `compareAtPrice` exists: show crossed-out price + green "Save $X" badge
- Urgency: show "Only X left" with pulsing red dot when `quantityAvailable < 15`
- Quick Add button: full-width, black bg, font-nav uppercase, hover → red. Adds default variant to cart.

### CartDrawer
- Fixed right, 410px width, white bg, slides from right (transform transition)
- 2px red left border
- Overlay: fixed inset-0 black/40%, click to close
- **Free Shipping Bar:** dynamic text ("$X away from FREE SHIPPING" or "🎉 Unlocked!"), 5px track with red→green gradient fill, $75 threshold
- **Items list:** scrollable, each item = 70px thumbnail + name/size/price/remove
- **Order Bump:** 2px dashed red border, checkbox toggle, shows when cart has items. Specific product (decal) at cart-only discount price.
- **Upsells:** "Complete Your Kit" header, 2 product cards with exclusive pricing, "Add" buttons. Pull from Shopify collection "cart-upsells".
- **Footer:** savings banner (green), subtotal, shipping (FREE if >$75 else $5.99), total (font-display 26px red), checkout button → Shopify checkout URL

### BundleTiers (PDP)
- 2px red border container
- Red header: "🔥 Bundle & Save" + "Most Popular ↓"
- 3 tiers with radio-style selection:
  - Buy 1: standard price
  - Buy 2: discounted /ea, "Save 14%" green badge, "Most popular" subtitle — PRE-SELECTED
  - Buy 3+: best value /ea, "Save 29%" green badge
- Selected tier: light red bg, 3px red left border, filled red radio dot
- Add to Cart button total updates based on selected tier × quantity

### ReviewCarousel (Homepage)
- Section header: "What Hunters Are Saying"
- Summary row: large gold stars + big average number + "Based on X reviews"
- Horizontal scroll container (overflow-x auto, scroll-snap, hidden scrollbar)
- Left/right arrow buttons
- Each ReviewCard: 300px min-width, white bg, border, hover → shadow + red border
  - Star rating (gold), italic review text, author + location, product name (red), "✓ Verified Purchase" (green badge)
  - Click → navigates to that product's PDP
- "Write a Review" button below → opens ReviewModal

### ReviewModal
- Fixed overlay, centered modal, max-width 500px
- Fields: Product selector (dropdown, pre-filled if from email), 1-5 star input (clickable, gold active), review text (120 char max with live counter), photo upload (optional), name, location
- Submit → stores as pending, shows toast confirmation
- "Reviews are moderated before publishing" note

### ProductReviews (PDP)
- Shows ONLY reviews where `product_handle` matches current product AND `status === 'approved'`
- Dynamic star average calculated from this product's reviews only
- "Write Review" button
- Individual review entries: stars, italic text, author, verified badge

### AdminPanel (/admin)
- List of reviews where `status === 'pending'`
- Each: stars, text, author, product name, Approve (green) / Deny (red outline) buttons
- Approve → updates to `status: 'approved'` via Admin API
- Deny → updates to `status: 'denied'`
- Animated removal (fade + slide)
- Empty state: "All caught up!"

---

## Shopify API Integration

### Storefront API Queries

```graphql
# Get products by collection
query CollectionProducts($handle: String!, $first: Int = 20) {
  collectionByHandle(handle: $handle) {
    title description
    products(first: $first) {
      edges { node {
        id handle title description
        priceRange { minVariantPrice { amount currencyCode } }
        compareAtPriceRange { minVariantPrice { amount } }
        images(first: 5) { edges { node { url altText width height } } }
        variants(first: 10) { edges { node {
          id title availableForSale quantityAvailable
          price { amount } compareAtPrice { amount }
          selectedOptions { name value }
        } } }
        tags
        metafield(namespace: "custom", key: "reviews") { value }
      } }
    }
  }
}

# Get single product
query Product($handle: String!) {
  productByHandle(handle: $handle) {
    id handle title descriptionHtml
    images(first: 10) { edges { node { url altText width height } } }
    variants(first: 20) { edges { node {
      id title availableForSale quantityAvailable
      price { amount } compareAtPrice { amount }
      selectedOptions { name value }
    } } }
    tags
    metafield(namespace: "custom", key: "reviews") { value }
  }
}

# Cart mutations
mutation CartCreate {
  cartCreate { cart { id checkoutUrl ...CartFields } }
}
mutation CartAdd($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ...CartFields } }
}
mutation CartRemove($cartId: ID!, $lineIds: [ID!]!) {
  cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { ...CartFields } }
}
fragment CartFields on Cart {
  id checkoutUrl
  cost { totalAmount { amount } subtotalAmount { amount } }
  lines(first: 20) { edges { node {
    id quantity
    merchandise { ... on ProductVariant {
      id title price { amount }
      product { title handle }
      image { url altText }
    } }
  } } }
}
```

### Review Data Model (Shopify Metafields)
Store on each product as `custom.reviews` (JSON):
```json
[{
  "id": "rev_001",
  "stars": 5,
  "text": "Best hunting tee I own.",
  "author": "Jake M.",
  "location": "Lincoln, NE",
  "photo_url": null,
  "product_handle": "forest-green-tee",
  "status": "approved",
  "created_at": "2026-02-15T10:30:00Z",
  "verified_purchase": true
}]
```
- Pending reviews: `status: "pending"` — visible only on /admin
- Approved reviews: `status: "approved"` — visible on PDP + homepage
- Star averages: calculated client-side from approved reviews

### Review Flow
1. Customer purchases → Shopify Flow triggers review request email 7 days after fulfillment
2. Email contains link: `yoursite.com/review?product=forest-green-tee`
3. Customer submits → stored as `pending` via Admin API metafield update
4. Admin visits /admin → approves or denies
5. Approved reviews appear on PDP (product-specific) and homepage carousel (all products)

---

## Page Specifications

### Homepage (`/`)
Sections in order:
1. HeroSection — 90vh, bg image with brightness(0.35), gradient overlay fading to cream. Staggered fade-up animations. CTA buttons: "Shop the Collection" (red primary), "Our Story" (white outline).
2. SocialProofBar — off-white bg, centered stats row
3. ProductGrid — "Shop Best Sellers", pull from `best-sellers` collection
4. ReviewCarousel — "What Hunters Are Saying", horizontal scroll
5. TrustBadges — 4 items: Free Shipping, Easy Returns, Nebraska Made, 500+ Reviews
6. LifestyleGrid — CSS grid 2fr 1fr 1fr, first image spans 2 rows
7. RedBanner — "Wear Your State. Hunt Your Land." full-width red
8. ReferralSection — "Give $10, Get $10" with email capture
9. StatePrideCards — 3 numbered cards (Nebraska Born, Hunter Built, Community Driven)

### Shop All (`/shop`)
- SectionHeader: "Shop All"
- ProductGrid pulling all products

### Collection (`/collections/[handle]`)
- Dynamic: tees, hats, hoodies, new-arrivals, etc.
- SectionHeader with collection title
- ProductGrid filtered by collection

### PDP (`/products/[handle]`)
- 2-column grid (image gallery | product info), max-w-[1060px]
- Left: main image + thumbnail strip from Shopify
- Right: breadcrumb, title, dynamic star rating from reviews, price, description, BundleTiers, SizeSelector, Add to Cart button (total updates with tier), urgency ("X people viewing"), trust icons, ProductReviews section

### Blog (`/blog`)
- Filter buttons: All, Hunting, Gear, Nebraska, News
- 3-column card grid: gradient thumbnail, category tag, title, description, date + read time
- Content from MDX files or Shopify blog

### Recipes (`/recipes`)
- 3-column card grid: gradient thumbnail with food icon, category (Venison/Waterfowl/Upland), recipe name, description, footer with cook time + servings + difficulty

### Podcast (`/podcast`)
- Platform buttons: Spotify, Apple Podcasts, YouTube
- Episode cards: number, title, description, duration, play button

### About (`/about`)
- Long-form brand story, Bitter serif, lifestyle images
- Subheadings: "More Than a Logo", "Nebraska Proud"

### Contact (`/contact`)
- Form: First/Last name (2-col), Email, Subject dropdown, Message textarea, Submit

### Referral (`/referral`)
- "Give $10, Get $10" — 3-step flow (Sign Up → Share → Earn), email capture

### Admin (`/admin`)
- Hidden page, no nav link (accessed directly or via tiny footer link)
- Pending review list with approve/deny

---

## Animations
- **RevealOnScroll:** opacity 0→1, translateY 25→0, IntersectionObserver at 10% threshold, 70ms stagger
- **Nav:** shadow + logo shrink on scroll > 50px
- **Mega menus:** opacity/visibility 250ms on hover
- **Cart drawer:** translateX with cubic-bezier(0.25,0.46,0.45,0.94)
- **Toast:** fixed bottom-right, slide up, auto-dismiss 2.5s
- **Product cards:** image zoom + shadow lift on hover
- **Announcement:** CSS marquee infinite scroll
- **Urgency dots:** opacity pulse 1→0.3→1, 1.5s infinite
- **Admin moderation:** fade + slide on approve/deny

## Responsive Breakpoints
- `lg (>1024px)`: Full 3-col grids, mega menus, 2-col PDP
- `md (768-1024px)`: 2-col product grids, stacked PDP, no mega menus
- `sm (<768px)`: 2-col products tight gap, stacked forms, mobile menu

---

## Build Order
1. Tailwind config + fonts + global layout (BrandBar, AnnouncementBar, Navbar, Footer)
2. Shopify client (`lib/shopify.ts`) + cart context
3. ProductCard + ProductGrid + homepage sections
4. CartDrawer with FreeShippingBar, OrderBump, CartUpsells
5. PDP with BundleTiers, SizeSelector, product-specific reviews
6. Collection pages (dynamic routing)
7. Blog, Recipes, Podcast, About, Contact pages
8. Review system (modal, submission, admin panel)
9. Referral page
10. Polish: animations, responsive, SEO meta tags, OG images
