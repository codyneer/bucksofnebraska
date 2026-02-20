import { HeroSection } from '@/components/sections/HeroSection'
import { SocialProofBar } from '@/components/sections/SocialProofBar'
import { ProductGrid } from '@/components/product/ProductGrid'
import { ReviewCarousel } from '@/components/reviews/ReviewCarousel'
import { TrustBadges } from '@/components/sections/TrustBadges'
import { LifestyleGrid } from '@/components/sections/LifestyleGrid'
import { RedBanner } from '@/components/sections/RedBanner'
import { ReferralSection } from '@/components/sections/ReferralSection'
import { StatePrideCards } from '@/components/sections/StatePrideCards'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getCollectionProducts, getAllProducts, type ShopifyProduct } from '@/lib/shopify'
import { getAllApprovedReviews, type Review } from '@/lib/reviews'

export default async function Home() {
  let products: ShopifyProduct[] = []
  let reviews: Review[] = []

  try {
    // Try best-sellers collection first, fall back to all products
    const collection = await getCollectionProducts('best-sellers', 6)
    if (collection && collection.products.edges.length > 0) {
      products = collection.products.edges.map((e) => e.node)
    } else {
      const allProducts = await getAllProducts(6)
      products = allProducts
    }
  } catch (error) {
    console.error('Failed to fetch products:', error)
    try {
      const allProducts = await getAllProducts(6)
      products = allProducts
    } catch {
      // Products will be empty, grid shows "No products found"
    }
  }

  try {
    reviews = await getAllApprovedReviews()
  } catch {
    // Reviews will be empty, carousel shows placeholder data
  }

  return (
    <div className="min-h-screen">
      <HeroSection />
      <SocialProofBar />

      {/* Best Sellers */}
      <section className="py-20 px-10 max-w-[1300px] mx-auto">
        <SectionHeader
          title="Shop"
          highlight="Best Sellers"
          subtitle="The gear Nebraska hunters reach for first"
        />
        <ProductGrid products={products} />
      </section>

      <ReviewCarousel reviews={reviews} />
      <TrustBadges />

      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent max-w-[1200px] mx-auto" />

      <LifestyleGrid />
      <RedBanner />
      <ReferralSection />
      <StatePrideCards />
    </div>
  )
}
