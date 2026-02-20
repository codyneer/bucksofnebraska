# How to Build Bucks of Nebraska with Claude Code

## Step 1: Set Up Your Project

Open your terminal and run:

```bash
npx create-next-app@latest bucks-of-nebraska --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd bucks-of-nebraska
```

## Step 2: Add the Reference Files

```bash
mkdir -p reference
# Copy the CLAUDE.md to the project root
# Copy bucks-of-nebraska-v4.html into reference/
```

Place these files:
- `CLAUDE.md` → project root (Claude Code reads this automatically)
- `bucks-of-nebraska-v4.html` → `reference/` folder
- Your transparent logos → `public/logos/`

## Step 3: Push to GitHub + Connect Vercel

```bash
git init
git add .
git commit -m "initial setup"
# Create repo on GitHub, push
# Connect repo to Vercel at vercel.com/new
```

## Step 4: Set Up Shopify

In your Shopify admin:
1. Go to Settings → Apps and sales channels → Develop apps
2. Create a private app with Storefront API access (products, collections, cart, checkout)
3. Also enable Admin API access (read/write products, read/write metafields)
4. Copy the tokens into `.env.local`:

```
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-token
SHOPIFY_ADMIN_ACCESS_TOKEN=your-admin-token
```

Also add these to Vercel Environment Variables.

## Step 5: Open Claude Code and Paste This Prompt

```
Open Claude Code in your project directory:

```bash
claude
```

Then paste this as your first message:

---

Read the CLAUDE.md file in this project root — it contains the complete build specification for a headless Shopify storefront. There's also an HTML prototype at reference/bucks-of-nebraska-v4.html that shows the exact visual design.

Start by setting up the foundation:

1. Configure tailwind.config.ts with the exact design tokens from CLAUDE.md (colors, fonts)
2. Set up Google Fonts (Bebas Neue, Oswald, Bitter) in app/layout.tsx
3. Create lib/shopify.ts with the Storefront API client and GraphQL queries from CLAUDE.md
4. Create lib/cart-context.tsx for cart state management
5. Build the global layout components in this order: BrandBar, AnnouncementBar, Navbar (with mega menus), Footer
6. Wire them into app/layout.tsx

Follow the design tokens, component specs, and file structure from CLAUDE.md exactly. The HTML prototype is your pixel-perfect visual reference — match it.

---

## Step 6: Continue Building Component by Component

After the foundation is set, give Claude Code these follow-up prompts in order:

### Prompt 2: Products + Homepage
```
Now build the product components and homepage. Follow CLAUDE.md specs:

1. Build ProductCard.tsx and ProductGrid.tsx components
2. Create the homepage (app/page.tsx) with all sections in order: HeroSection, SocialProofBar, ProductGrid (best sellers), ReviewCarousel (use placeholder data for now), TrustBadges, LifestyleGrid, RedBanner, ReferralSection, StatePrideCards
3. ProductGrid should fetch from Shopify collection "best-sellers" using the queries in CLAUDE.md
4. ProductCard should show urgency badges when quantityAvailable < 15

Match the prototype in reference/bucks-of-nebraska-v4.html exactly.
```

### Prompt 3: Cart System
```
Build the full cart drawer system per CLAUDE.md:

1. CartDrawer.tsx — slides from right with overlay
2. FreeShippingBar.tsx — $75 threshold with animated progress bar
3. CartItem.tsx — product thumbnail, name, size, price, remove
4. OrderBump.tsx — dashed border checkbox for discounted add-on product
5. CartUpsells.tsx — "Complete Your Kit" with cart-only pricing, pull from "cart-upsells" collection
6. Wire Add to Cart and Quick Add buttons to use Shopify cart mutations
7. Checkout button should redirect to Shopify's checkoutUrl
```

### Prompt 4: Product Detail Page
```
Build the PDP at app/products/[handle]/page.tsx per CLAUDE.md:

1. 2-column layout: image gallery left, product info right
2. BundleTiers component with Buy 1/2/3+ pricing and radio selection
3. SizeSelector component
4. Add to Cart button that updates total based on selected tier
5. Urgency badge ("X people viewing")
6. Trust icons row
7. Fetch product data from Shopify by handle
8. Leave a placeholder section for product-specific reviews (we'll build that next)
```

### Prompt 5: Review System
```
Build the custom review system per CLAUDE.md — no third-party apps:

1. ReviewModal.tsx — submission form: product selector, 1-5 star input, 120 char text with counter, optional photo, name, location. Submits to Shopify product metafield as "pending"
2. ProductReviews.tsx — shows only approved reviews for the current product on PDP, with dynamic star average
3. ReviewCarousel.tsx — homepage carousel pulling all approved reviews across products
4. AdminPanel.tsx at app/admin/page.tsx — lists pending reviews with approve/deny buttons
5. lib/reviews.ts — CRUD helpers using Shopify Admin API to read/write product metafields
6. Reviews stored as JSON in product metafield (namespace: "custom", key: "reviews")
```

### Prompt 6: Remaining Pages
```
Build the remaining pages per CLAUDE.md:

1. app/shop/page.tsx — all products grid
2. app/collections/[handle]/page.tsx — dynamic collection pages
3. app/blog/page.tsx — filterable card grid (use MDX or hardcoded data to start)
4. app/recipes/page.tsx — recipe cards with cook time/servings/difficulty
5. app/podcast/page.tsx — episode list with platform links
6. app/about/page.tsx — long-form brand story
7. app/contact/page.tsx — contact form
8. app/referral/page.tsx — "Give $10 Get $10" program signup
```

### Prompt 7: Polish
```
Final polish pass:

1. Add RevealOnScroll animation wrapper using IntersectionObserver
2. Responsive breakpoints — test at lg/md/sm per CLAUDE.md
3. SEO: add metadata to each page (title, description, OG image)
4. Add loading states and error handling for Shopify API calls
5. Verify cart checkout flow works end to end with Shopify
6. Add mobile hamburger menu for < 768px
```

---

## Notes

- Claude Code reads CLAUDE.md automatically on every conversation, so it always has the full context
- Open the HTML prototype in your browser alongside development for visual comparison
- Test the Shopify connection early (after Step 5, Prompt 1) — make sure products are loading before building everything else
- If Claude Code hits issues with Shopify API, share the error and it will debug
- Each prompt builds on the previous one, so go in order
