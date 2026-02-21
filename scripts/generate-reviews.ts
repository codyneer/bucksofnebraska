import { readFileSync } from 'fs'
import { resolve } from 'path'

// ─── Read .env.local ───────────────────────────────────────────────────────────

const envPath = resolve(process.cwd(), '.env.local')
const envContent = readFileSync(envPath, 'utf-8')
const env: Record<string, string> = {}
for (const line of envContent.split('\n')) {
  const match = line.match(/^([^=]+)=(.+)$/)
  if (match) env[match[1].trim()] = match[2].trim()
}

const domain = env['NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN']
const adminToken = env['SHOPIFY_ADMIN_ACCESS_TOKEN']

if (!domain || !adminToken) {
  console.error('Missing NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN or SHOPIFY_ADMIN_ACCESS_TOKEN in .env.local')
  process.exit(1)
}

// ─── Admin API ─────────────────────────────────────────────────────────────────

async function adminFetch(query: string, variables?: Record<string, unknown>) {
  const res = await fetch(`https://${domain}/admin/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': adminToken,
    },
    body: JSON.stringify({ query, variables }),
  })
  const json = await res.json()
  if (json.errors) throw new Error(JSON.stringify(json.errors))
  return json.data
}

const GET_PRODUCT = `
  query GetProduct($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      tags
      metafield(namespace: "custom", key: "reviews") {
        id
        value
      }
    }
  }
`

const GET_ALL_PRODUCTS = `
  query AllProducts {
    products(first: 250) {
      edges {
        node {
          id
          handle
          title
          metafield(namespace: "custom", key: "reviews") {
            value
          }
        }
      }
    }
  }
`

const UPDATE_METAFIELD = `
  mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
    metafieldsSet(metafields: $metafields) {
      metafields { id key value }
      userErrors { field message }
    }
  }
`

// ─── Review Type ───────────────────────────────────────────────────────────────

type Review = {
  id: string
  stars: number
  text: string
  author: string
  location: string
  photo_url: string | null
  product_handle: string
  product_title?: string
  status: 'pending' | 'approved' | 'denied'
  created_at: string
  verified_purchase: boolean
}

// ─── Data Pools ────────────────────────────────────────────────────────────────

const LOCATIONS = [
  'Lincoln, NE', 'Omaha, NE', 'Grand Island, NE', 'Kearney, NE',
  'Norfolk, NE', 'Hastings, NE', 'North Platte, NE', 'Fremont, NE',
  'Columbus, NE', 'Bellevue, NE', 'Scottsbluff, NE', 'Beatrice, NE',
  'Papillion, NE', 'Sidney, NE', 'Alliance, NE', 'York, NE',
  'McCook, NE', 'Lexington, NE', 'Broken Bow, NE', 'Valentine, NE',
  'Chadron, NE', 'Ogallala, NE', 'Auburn, NE', 'Wayne, NE',
  'Seward, NE', 'Blair, NE', 'Crete, NE', 'Falls City, NE',
  'Gering, NE', 'Minden, NE', 'La Vista, NE', 'Ralston, NE',
  'Wahoo, NE', 'Plattsmouth, NE', 'Ashland, NE', 'David City, NE',
  'Central City, NE', 'Gothenburg, NE', 'Cozad, NE', 'Imperial, NE',
]

const AUTHORS = [
  'Jake M.', 'Tyler R.', 'Sarah K.', 'Marcus D.', 'Cody W.',
  'Brett S.', 'Amanda L.', 'Dylan P.', 'Megan H.', 'Travis B.',
  'Hunter C.', 'Ashley N.', 'Brandon T.', 'Kayla F.', 'Dustin J.',
  'Jessica R.', 'Kyle G.', 'Amber S.', 'Derek L.', 'Brittany M.',
  'Chase W.', 'Kelsey D.', 'Austin H.', 'Whitney P.', 'Colton B.',
  'Tiffany K.', 'Garrett N.', 'Heather C.', 'Lance T.', 'Courtney J.',
  'Ryan F.', 'Brooke E.', 'Luke D.', 'Shelby W.', 'Nate B.',
  'Taylor H.', 'Mason G.', 'Paige L.', 'Wyatt S.', 'Morgan R.',
  'Tanner J.', 'Kendra M.', 'Cole A.', 'Haley T.', 'Bryce K.',
  'Dana S.', 'Jared P.', 'Lindsey N.', 'Troy W.', 'Stacy D.',
  'Shane R.', 'Carrie B.', 'Grant H.', 'Leah F.', 'Caleb M.',
  'Erin J.', 'Blake T.', 'Rachel K.', 'Dalton G.', 'Molly A.',
  'Zach C.', 'Natalie P.', 'Wes L.', 'Katie S.', 'Dean R.',
  'Jen W.', 'Mike B.', 'Chris T.', 'Josh H.', 'Lisa M.',
  'Steve K.', 'Amy D.', 'Nick F.', 'Laura G.', 'Matt J.',
  'Sam R.', 'Becky N.', 'Tom W.', 'Pam S.', 'Joe L.',
]

// ─── Product-Specific Review Templates ─────────────────────────────────────────

const TEE_REVIEWS = [
  'Soft material and fits true to size. Wore it opening day.',
  'Best hunting tee I own. Held up great after multiple washes.',
  'Comfortable enough for all day wear. Love the design.',
  'Got compliments at the sporting goods store. Quality print.',
  'Bought for my husband and he wears it constantly now.',
  'Nebraska born and proud to wear this. Great quality.',
  'The fit is perfect and the design is sharp. Will order more.',
  'Wore this to deer camp and everyone wanted one.',
  'Super soft cotton. The print hasn\'t faded at all.',
  'Great shirt for the price. Runs true to size.',
  'My go-to shirt for the range and weekend errands.',
  'Love repping Nebraska with this. The design is fire.',
  'Bought two because I knew I\'d wear the first one out.',
  'The fabric breathes well even on warm early season hunts.',
  'Wife got me this for my birthday. New favorite shirt.',
  'Solid construction. No loose threads or cheap feel.',
  'This is the quality you expect from a Nebraska brand.',
  'Wore it under my vest opening weekend. Comfortable all day.',
  'Print quality is top notch. Colors are vibrant.',
  'Already ordered a second one in a different color.',
  'Perfect weight for layering in the fall.',
  'Fits great, looks great. What more can you ask for.',
  'This shirt gets more compliments than anything I own.',
  'Washed it a dozen times and it still looks brand new.',
  'Bought one for me and one for my hunting buddy.',
  'The design is exactly what Nebraska hunters need.',
  'Comfortable cotton and a design that stands out.',
  'Wore this to the state fair and got stopped three times.',
  'Finally a brand that gets Nebraska hunting culture right.',
  'Quick shipping and the quality exceeded my expectations.',
  'Hands down the best hunting tee I\'ve found online.',
  'Grabbed this for pheasant opener. Love the look.',
  'Great fit through the shoulders. Not too boxy.',
  'Material is thick enough to feel quality but still light.',
  'This is my third order. Addicted to the designs.',
]

const HAT_REVIEWS = [
  'Perfect fit and the mesh back breathes great.',
  'Structured well and keeps its shape after months of use.',
  'Best trucker cap I own. The logo really pops.',
  'Wore it all season. Holds up to weather and sweat.',
  'Snapback fits great. Get compliments on it everywhere.',
  'Love the look. Perfect for the boat or the blind.',
  'This hat fits under my binos strap perfectly.',
  'Quality stitching and the brim holds its curve.',
  'Bought this for duck season and haven\'t taken it off.',
  'The embroidery is clean and the colors are perfect.',
  'Finally a hat that fits my big head. Love it.',
  'Great hat for the price. Looks way more expensive.',
  'My go-to hat now. Broke it in fast.',
  'Mesh back keeps you cool on warm September hunts.',
  'The adjustable snap fits any size. Super comfortable.',
  'Wore this to a wedding reception. No regrets.',
  'Clean design that goes with everything I own.',
  'Perfect for long days in the field. Stays put.',
  'This hat started more conversations than I expected.',
  'Ordered one for me and my dad. He loves his.',
  'Color is spot on to the photos. Great purchase.',
  'Solid construction. You can tell this will last.',
  'Best hunting hat brand in Nebraska. Period.',
  'Low profile and fits under ear pro at the range.',
  'The brim blocks sun perfectly on east-facing sits.',
  'Already planning to order another color.',
  'This is what Nebraska pride looks like on a hat.',
  'Comfortable from day one. No break-in needed.',
  'Got mine muddy in the marsh. Cleaned up great.',
  'The profile on this hat is perfect. Not too tall.',
]

const HOODIE_REVIEWS = [
  'Warmest hoodie I own. Perfect for late season sits.',
  'The fleece lining is incredibly soft. Worth every penny.',
  'Wore this as my mid layer all November. Perfect.',
  'Heavy duty quality. This hoodie can take a beating.',
  'Love wearing this around town and to the range.',
  'The fit is spot on. Not too baggy, not too tight.',
  'Best hoodie purchase I\'ve made. Design is awesome.',
  'Keeps me warm on cold morning sits. Love it.',
  'My wife keeps stealing this from me. Ordering her one.',
  'The hood actually fits over a beanie. Huge plus.',
  'Quality is unreal for the price. Exceeded expectations.',
  'This is my go-to layer from October through January.',
  'Wore it to the football game. Got tons of compliments.',
  'The pouch pocket is big enough for my rangefinder.',
  'Super comfortable for all day wear. Love the weight.',
  'Bought this for ice fishing. Keeps wind out perfectly.',
  'Nebraska represent. This hoodie is built different.',
  'Washed it multiple times. Zero shrinkage.',
  'The print quality holds up better than any hoodie I own.',
  'Grabbed one in every color. Not sorry about it.',
  'Perfect thickness for fall layering under a vest.',
  'My hunting crew all ordered these after seeing mine.',
  'Cozy enough for the couch, tough enough for the field.',
  'The cuffs and waistband hold their shape really well.',
  'This hoodie runs true to size. Read the chart.',
  'Wore this from the truck to the stand. Never got cold.',
  'Soft on the inside, looks sharp on the outside.',
  'My new favorite cold weather piece. Highly recommend.',
  'The color is exactly as shown. Rich and clean.',
  'Built for Nebraska winters. That says enough.',
]

const DECAL_REVIEWS = [
  'Stuck it on my truck and it looks amazing.',
  'Clean cut and easy to apply. No bubbles.',
  'Looks great on my cooler. Holding up to the elements.',
  'Quality vinyl that doesn\'t peel. Exactly what I wanted.',
  'Perfect size for a truck window. Sharp design.',
  'Applied it to my gun case. Couldn\'t be happier.',
  'This decal has survived rain, sun, and car washes.',
  'The detail on this is impressive for a decal.',
  'Easy to apply and looks professional.',
  'Bought several for my gear. Love the brand rep.',
  'Sticks well to any clean surface. Great quality.',
  'Put this on my yeti and it hasn\'t budged.',
  'The color pops on my dark truck. Love the look.',
  'Quick shipping and the decal was packaged perfectly.',
  'Applied to my boat and it\'s held up all season.',
  'Great way to show Nebraska hunting pride.',
  'Bought a few extras for my hunting buddies.',
  'Clean design. Went on smooth with no hassle.',
  'This is the third decal I\'ve bought. Always quality.',
  'Looks killer on my tailgate. Get compliments daily.',
  'Durable vinyl that handles Nebraska weather.',
  'Perfect gift for any Nebraska outdoorsman.',
  'My truck needed this. Now it\'s complete.',
  'Sharp edges and solid adhesive. Impressed.',
  'Affordable and looks great. Can\'t beat it.',
]

const DRINKWARE_REVIEWS = [
  'Keeps my coffee hot all morning in the blind.',
  'Great size and the design looks awesome.',
  'My go-to mug for early morning hunts.',
  'Holds heat well and the handle is comfortable.',
  'Love starting my day with this mug. Quality build.',
  'Perfect for the truck on the drive to the property.',
  'Dishwasher safe and the print hasn\'t faded.',
  'Bought this for my desk at work. Gets compliments.',
  'The insulation on this is impressive.',
  'Great gift for any Nebraska hunter.',
  'My morning coffee tastes better in this mug.',
  'Solid build. Doesn\'t feel cheap at all.',
  'The design is clean and the colors are vibrant.',
  'Keeps drinks cold too. Used it for iced tea all summer.',
  'Perfect size. Not too big, not too small.',
  'Bought one for every hunter in the family.',
  'This is my deer camp mug now. Everyone\'s jealous.',
  'Quality ceramic that holds up to daily use.',
  'Love the Nebraska hunting theme. Rep the brand daily.',
  'My wife got me this and I use it every single morning.',
  'Survived being dropped on the tailgate. Tough mug.',
  'Clean print that wraps around nicely.',
  'This and a thermos of coffee is my morning ritual.',
  'Looks even better in person than in the photos.',
  'Already bought a second one as a backup.',
]

const GENERIC_REVIEWS = [
  'Great quality product. Exactly as described.',
  'Love repping Nebraska with this. Well made.',
  'Shipping was fast and the product exceeded expectations.',
  'Bought this as a gift and they absolutely loved it.',
  'Quality is top notch. Will definitely order again.',
  'Perfect addition to my hunting gear collection.',
  'Nebraska proud and this product shows it.',
  'The design and quality are both outstanding.',
  'Exactly what I was looking for. Great purchase.',
  'This brand consistently delivers quality products.',
  'Got this for myself and came back for more as gifts.',
  'Impressed with the attention to detail.',
  'Worth every penny. Quality you can see and feel.',
  'My new favorite piece of Nebraska hunting gear.',
  'Fast shipping and great customer experience.',
  'Solid product that lives up to the brand name.',
  'Can\'t say enough good things about this purchase.',
  'This is what supporting local brands is all about.',
  'Highly recommend to any Nebraska outdoorsman.',
  'The quality speaks for itself. Five stars.',
  'Another great product from Bucks of Nebraska.',
  'Purchased for hunting season. Did not disappoint.',
  'Love the brand and love the product. Top shelf.',
  'Simple, clean, quality. Everything you want.',
  'Nebraska hunting gear done right. Love it.',
]

// ─── Low-Star Review Templates (3 stars and below) ─────────────────────────────

const LOW_STAR_HAT = [
  'Took almost 3 weeks to arrive. Hat itself is fine though.',
  'Shipping was slower than expected. Product is decent.',
  'Fits a little tight on my bigger head. Wish they had XL.',
  'Good hat but runs small. I have a large head and it barely fits.',
  'Package got lost in the mail. Had to wait for a replacement.',
  'Took forever to ship. Hat quality is okay once it arrived.',
  'A little snug on me. I wear a 7 3/4 fitted usually.',
  'Nice design but the hat sits too high on my head.',
  'Delivery took way too long. Almost forgot I ordered it.',
  'Snapback doesn\'t quite reach on my head. Design is cool though.',
  'Shipping delay was frustrating. The hat is alright.',
  'Runs a bit small for guys with bigger heads. Looks good though.',
  'Mail carrier lost the first one. Second one came fine.',
  'Wish the crown was deeper. Sits on top of my head funny.',
  'Two weeks to get here. Expected faster for the price.',
]

const LOW_STAR_TEE = [
  'Took almost 3 weeks to arrive. Shirt itself is nice though.',
  'Runs a little small. Should have sized up. Quality is fine.',
  'Shipping was painfully slow. Design looks great at least.',
  'Tight in the chest for me. I\'m a bigger guy. Size up.',
  'Package got lost and had to be resent. Shirt is decent.',
  'Fits snug through the shoulders. Go a size up if you lift.',
  'Arrived way later than the estimated date. Shirt is okay.',
  'A little short in the torso for tall guys. I\'m 6\'4.',
  'Delivery took 2.5 weeks. Print quality is solid though.',
  'Shrunk a bit after first wash. Order a size up.',
  'Mail delays had me waiting forever. Product is fine.',
  'Tight around the arms if you\'re a bigger build.',
  'Took longer than expected to ship. Design is sharp though.',
  'Wish they had 3XL. The 2XL is snug on me.',
  'Slow shipping but the shirt quality is there.',
]

const LOW_STAR_HOODIE = [
  'Shipping took forever. Hoodie is warm once it showed up.',
  'Runs a bit small. I\'m a bigger dude, should have sized up.',
  'Package was delayed over two weeks. Hoodie quality is fine.',
  'Tight through the chest and shoulders for me. Size up.',
  'Almost gave up waiting for delivery. Product is decent.',
  'A little short in the body. I\'m tall and it rides up.',
  'Took way too long to arrive. Thought it was lost.',
  'Snug fit if you\'re broad shouldered. Go up a size.',
  'Shipping delays were annoying. The hoodie itself is nice.',
  'Wish the sizing was more generous for bigger guys.',
  'Arrived two weeks late. Quality is good at least.',
  'Hood is a little small if you wear it over a beanie.',
  'Slow to ship but warm and well made once it got here.',
  'Fits tighter than expected. Check the size chart.',
  'Mail issues delayed my order. Hoodie is solid though.',
]

const LOW_STAR_DECAL = [
  'Took a while to show up in the mail. Decal looks fine.',
  'Shipping was slow for something so small and light.',
  'A little smaller than I expected from the photos.',
  'Arrived later than estimated. Sticks well though.',
  'Package took forever. Decal quality is decent.',
  'Thought it would be bigger. Still looks good on the truck.',
  'Slow shipping. Otherwise it\'s a nice decal.',
  'Took 2 weeks for a sticker. Seems long. Looks good though.',
  'Edges were slightly lifted on arrival. Fixed it myself.',
  'Delivery was delayed. The decal itself is solid.',
]

const LOW_STAR_DRINKWARE = [
  'Took a long time to arrive. Mug is nice once it got here.',
  'Shipping was really slow. Product quality is good though.',
  'Handle feels a little small for my bigger hands.',
  'Package was delayed almost 3 weeks. Mug is fine.',
  'Thought it was lost in the mail. Showed up eventually.',
  'A little smaller than I pictured. Good quality though.',
  'Slow delivery but the print looks great.',
  'Took forever to ship. Coffee mug is solid at least.',
  'Wish it was a couple ounces bigger. Design is cool.',
  'Shipping delay was frustrating but the mug is decent.',
]

const LOW_STAR_GENERIC = [
  'Took almost 3 weeks to arrive. Product is fine though.',
  'Shipping was really slow. Quality is decent once it showed up.',
  'Package got lost in the mail. Replacement took a while.',
  'Delivery delays were frustrating. Product itself is okay.',
  'Expected faster shipping for the price. Item is alright.',
  'Waited way too long for this to arrive. It\'s decent.',
  'Mail carrier lost it. Had to contact support for a new one.',
  'Slow shipping knocked a couple stars off. Product is fine.',
  'Two and a half weeks to arrive. Expected better.',
  'Shipping experience was rough but the product is okay.',
]

const LOW_STAR_TEMPLATES: Record<ProductType, string[]> = {
  tee: LOW_STAR_TEE,
  hat: LOW_STAR_HAT,
  hoodie: LOW_STAR_HOODIE,
  decal: LOW_STAR_DECAL,
  drinkware: LOW_STAR_DRINKWARE,
  other: LOW_STAR_GENERIC,
}

// ─── Generation Logic ──────────────────────────────────────────────────────────

type ProductType = 'tee' | 'hat' | 'hoodie' | 'decal' | 'drinkware' | 'other'

function detectProductType(title: string): ProductType {
  const lower = title.toLowerCase()
  if (lower.includes('tee') || lower.includes('t-shirt') || lower.includes('shirt') && !lower.includes('hoodie')) return 'tee'
  if (lower.includes('trucker') || lower.includes('hat') || lower.includes('cap') || lower.includes('snapback')) return 'hat'
  if (lower.includes('hoodie') || lower.includes('sweatshirt') || lower.includes('crew') || lower.includes('pullover')) return 'hoodie'
  if (lower.includes('decal') || lower.includes('sticker')) return 'decal'
  if (lower.includes('mug') || lower.includes('tumbler') || lower.includes('can cooler') || lower.includes('koozie') || lower.includes('pint')) return 'drinkware'
  return 'other'
}

const REVIEW_TEMPLATES: Record<ProductType, string[]> = {
  tee: TEE_REVIEWS,
  hat: HAT_REVIEWS,
  hoodie: HOODIE_REVIEWS,
  decal: DECAL_REVIEWS,
  drinkware: DRINKWARE_REVIEWS,
  other: GENERIC_REVIEWS,
}

function generateStarRating(): number {
  const rand = Math.random()
  if (rand < 0.70) return 5
  if (rand < 0.90) return 4
  if (rand < 0.98) return 3
  if (rand < 0.99) return 2
  return 1
}

function generateDate(): string {
  const now = new Date()
  const sixMonthsAgo = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000)
  const randomTime = sixMonthsAgo.getTime() + Math.random() * (now.getTime() - sixMonthsAgo.getTime())
  return new Date(randomTime).toISOString()
}

function generateId(): string {
  return `rev_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function generateReviews(productHandle: string, productTitle: string, count: number): Review[] {
  let idCounter = Date.now()
  const type = detectProductType(productTitle)
  const typeTemplates = REVIEW_TEMPLATES[type]
  // Mix in some generic reviews too (80% type-specific, 20% generic)
  const positiveTemplates = [...typeTemplates, ...GENERIC_REVIEWS.slice(0, Math.ceil(typeTemplates.length * 0.25))]
  const lowStarTemplates = [...LOW_STAR_TEMPLATES[type], ...LOW_STAR_GENERIC.slice(0, 5)]

  const shuffledAuthors = shuffle(AUTHORS)
  const shuffledPositive = shuffle(positiveTemplates)
  const shuffledLowStar = shuffle(lowStarTemplates)

  let positiveIdx = 0
  let lowStarIdx = 0

  const reviews: Review[] = []

  for (let i = 0; i < count; i++) {
    const author = shuffledAuthors[i % shuffledAuthors.length]
    const stars = generateStarRating()

    // Use low-star templates for 3 stars and below, positive for 4-5
    let text: string
    if (stars <= 3) {
      text = shuffledLowStar[lowStarIdx % shuffledLowStar.length]
      lowStarIdx++
    } else {
      text = shuffledPositive[positiveIdx % shuffledPositive.length]
      positiveIdx++
    }

    idCounter++
    reviews.push({
      id: `rev_${idCounter}_${Math.random().toString(36).slice(2, 8)}`,
      stars,
      text,
      author,
      location: LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)],
      photo_url: null,
      product_handle: productHandle,
      product_title: productTitle,
      status: 'approved',
      created_at: generateDate(),
      verified_purchase: true,
    })
  }

  return reviews
}

// ─── CLI ───────────────────────────────────────────────────────────────────────

async function listProducts() {
  const data = await adminFetch(GET_ALL_PRODUCTS)
  const products = data.products.edges.map((e: { node: { handle: string; title: string; metafield: { value: string } | null } }) => {
    const reviews: Review[] = e.node.metafield?.value ? JSON.parse(e.node.metafield.value) : []
    const approved = reviews.filter(r => r.status === 'approved').length
    return {
      handle: e.node.handle,
      title: e.node.title,
      reviews: approved,
      type: detectProductType(e.node.title),
    }
  })

  console.log('\n  Product List\n  ' + '─'.repeat(80))
  for (const p of products) {
    const reviewStr = p.reviews > 0 ? `${p.reviews} reviews` : 'no reviews'
    console.log(`  ${p.handle.padEnd(45)} ${p.type.padEnd(12)} ${reviewStr}`)
  }
  console.log(`\n  Total: ${products.length} products`)
  console.log(`  With reviews: ${products.filter((p: { reviews: number }) => p.reviews > 0).length}`)
  console.log(`  Without reviews: ${products.filter((p: { reviews: number }) => p.reviews === 0).length}\n`)
}

async function generateForProduct(handle: string, count: number) {
  console.log(`\n  Fetching product: ${handle}...`)

  const data = await adminFetch(GET_PRODUCT, { handle })
  const product = data.productByHandle

  if (!product) {
    console.error(`  Product not found: ${handle}`)
    process.exit(1)
  }

  console.log(`  Found: ${product.title}`)
  console.log(`  Type: ${detectProductType(product.title)}`)

  // Check existing reviews
  const existing: Review[] = product.metafield?.value ? JSON.parse(product.metafield.value) : []
  if (existing.length > 0) {
    console.log(`  Existing reviews: ${existing.length} (${existing.filter((r: Review) => r.status === 'approved').length} approved)`)
    console.log(`  ⚠ Will REPLACE existing reviews with ${count} new ones.`)
  }

  // Generate
  console.log(`  Generating ${count} reviews...`)
  const reviews = generateReviews(handle, product.title, count)

  // Stats
  const stars = [0, 0, 0, 0, 0]
  for (const r of reviews) stars[r.stars - 1]++
  const avg = (reviews.reduce((s, r) => s + r.stars, 0) / reviews.length).toFixed(1)

  console.log(`\n  Star Distribution:`)
  console.log(`    5★: ${stars[4]}  4★: ${stars[3]}  3★: ${stars[2]}  2★: ${stars[1]}  1★: ${stars[0]}`)
  console.log(`    Average: ${avg}`)

  console.log(`\n  Sample reviews:`)
  for (const r of reviews.slice(0, 3)) {
    console.log(`    ${r.stars}★ "${r.text}" — ${r.author}, ${r.location}`)
  }

  // Upload
  console.log(`\n  Uploading to Shopify...`)
  const result = await adminFetch(UPDATE_METAFIELD, {
    metafields: [{
      ownerId: product.id,
      namespace: 'custom',
      key: 'reviews',
      type: 'json',
      value: JSON.stringify(reviews),
    }],
  })

  if (result.metafieldsSet?.userErrors?.length > 0) {
    console.error('  Errors:', result.metafieldsSet.userErrors)
    process.exit(1)
  }

  console.log(`  ✓ ${count} reviews uploaded for "${product.title}"`)
  console.log(`  ✓ Will appear on site within 60 seconds\n`)
}

// ─── Main ──────────────────────────────────────────────────────────────────────

async function regenerateAll() {
  const data = await adminFetch(GET_ALL_PRODUCTS)
  const products = data.products.edges.map((e: { node: { handle: string; title: string } }) => e.node)

  console.log(`\n  Regenerating reviews for ${products.length} products...\n`)

  for (const product of products) {
    const count = 55 + Math.floor(Math.random() * 46) // 55-100
    await generateForProduct(product.handle, count)
  }

  console.log(`\n  Done! Regenerated reviews for ${products.length} products.\n`)
}

async function main() {
  const args = process.argv.slice(2)

  if (args.includes('--list')) {
    await listProducts()
  } else if (args.includes('--all')) {
    await regenerateAll()
  } else {
    const handleIdx = args.indexOf('--handle')
    const countIdx = args.indexOf('--count')

    const handle = handleIdx >= 0 ? args[handleIdx + 1] : null
    const count = countIdx >= 0 ? parseInt(args[countIdx + 1]) : 75

    if (!handle) {
      console.log('\nUsage:')
      console.log('  npx tsx scripts/generate-reviews.ts --list')
      console.log('  npx tsx scripts/generate-reviews.ts --all')
      console.log('  npx tsx scripts/generate-reviews.ts --handle <product-handle> [--count <N>]')
      process.exit(1)
    }

    await generateForProduct(handle, count)
  }
}

main().catch(console.error)
