import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — Bucks of Nebraska',
  description: 'The story behind Bucks of Nebraska. Born in the heartland, built for the hunt.',
}

export default function AboutPage() {
  return (
    <div className="py-20 px-10 max-w-[720px] mx-auto">
      <h1 className="font-display text-[clamp(44px,7vw,64px)] text-center text-text mb-2">
        About <span className="text-red">Bucks of Nebraska</span>
      </h1>
      <p className="text-center font-nav text-[13px] tracking-[3px] uppercase text-text-muted mb-12">
        Born in the heartland. Built for the hunt.
      </p>

      <div className="space-y-8 text-text-light text-[16px] leading-relaxed font-body">
        <p>
          Bucks of Nebraska started the way most good things do in this state — around a campfire,
          after a long day in the timber. We were tired of wearing gear that didn&apos;t represent us.
          Every brand was coastal, every logo was generic, and nothing said &quot;Nebraska&quot; the way
          we live it.
        </p>

        <h2 className="font-display text-[32px] text-text mt-12">
          More Than a <span className="text-red">Logo</span>
        </h2>
        <p>
          We&apos;re not just slapping a deer on a hat and calling it a brand. Every piece of Bucks
          of Nebraska gear is designed with intention — the fit, the fabric, the details. We test
          everything in the field because that&apos;s where it matters. From early-season dove hunts
          in the Platte River Valley to late-November sits in the Cedar River bottoms, our gear
          holds up because we built it to.
        </p>

        <h2 className="font-display text-[32px] text-text mt-12">
          Nebraska <span className="text-red">Proud</span>
        </h2>
        <p>
          This state gets overlooked. People drive through it on I-80 and see flat land and
          cornfields. We see something different. We see public land loaded with whitetails,
          creek bottoms thick with timber, and sunrises that stop you in your tracks. Nebraska
          is one of the best-kept secrets in hunting, and we&apos;re building a brand that does it
          justice.
        </p>

        <p>
          Every order ships from Nebraska. Every dollar supports a small, veteran-owned business
          that pours everything back into the land and the community. When you wear Bucks of
          Nebraska, you&apos;re not just wearing a brand — you&apos;re carrying a piece of the Good Life.
        </p>

        <h2 className="font-display text-[32px] text-text mt-12">
          The <span className="text-red">Mission</span>
        </h2>
        <p>
          Build the best hunting apparel brand in the Midwest. Give Nebraska hunters something
          to be proud of. And never forget that the best days are spent outside, boots muddy,
          coffee hot, and surrounded by the people and the places that matter most.
        </p>

        <p className="font-nav text-[13px] tracking-[2px] uppercase text-text-muted text-center mt-16">
          Hunt hard. Rep Nebraska.
        </p>
      </div>
    </div>
  )
}
