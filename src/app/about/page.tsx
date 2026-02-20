import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About — Bucks of Nebraska',
  description: 'The story behind Bucks of Nebraska. Born in the heartland, built for the hunt.',
}

export default function AboutPage() {
  return (
    <div className="py-20 px-6 sm:px-10 max-w-[720px] mx-auto">
      <h1 className="font-display text-[clamp(44px,7vw,64px)] text-center text-text mb-2">
        About <span className="text-red">Bucks of Nebraska</span>
      </h1>
      <p className="text-center font-nav text-[13px] tracking-[3px] uppercase text-text-muted mb-12">
        Born in the heartland. Built for the hunt.
      </p>

      <div className="space-y-8 text-text-light text-[16px] leading-relaxed font-body">
        <p>
          Bucks of Nebraska started the way most good things do in this state &mdash; around a campfire,
          after a long day in the timber. We were tired of wearing gear that didn&apos;t represent us.
          Every brand was coastal, every logo was generic, and nothing said &quot;Nebraska&quot; the way
          we live it.
        </p>

        <h2 className="font-display text-[32px] text-text mt-12">
          More Than a <span className="text-red">Logo</span>
        </h2>
        <p>
          We&apos;re not just slapping a deer on a hat and calling it a brand. Every piece of Bucks
          of Nebraska gear is designed with intention &mdash; the fit, the fabric, the details. We test
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
          Nebraska, you&apos;re not just wearing a brand &mdash; you&apos;re carrying a piece of the Good Life.
        </p>

        <h2 className="font-display text-[32px] text-text mt-12">
          The <span className="text-red">Mission</span>
        </h2>
        <p>
          Build the best hunting apparel brand in the Midwest. Give Nebraska hunters something
          to be proud of. And never forget that the best days are spent outside, boots muddy,
          coffee hot, and surrounded by the people and the places that matter most.
        </p>

        <p className="font-nav text-[13px] tracking-[3px] uppercase text-text-muted text-center mt-16">
          Hunt hard. Rep Nebraska.
        </p>
      </div>

      {/* ─── Handwritten Note from Cody ─── */}
      <div className="mt-20 relative">
        {/* Paper background */}
        <div
          className="relative bg-[#faf6ef] rounded-sm px-8 sm:px-12 py-10 sm:py-14"
          style={{
            boxShadow: '0 2px 20px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)',
            backgroundImage: 'linear-gradient(to bottom, transparent 0%, rgba(196,30,58,0.02) 100%)',
          }}
        >
          {/* Subtle red tape accent at top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-red/30 rounded-b-sm" />

          {/* Photo */}
          <div className="mb-8 flex justify-center">
            <div
              className="relative w-full max-w-[400px] overflow-hidden rounded-sm"
              style={{
                boxShadow: '0 4px 20px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)',
              }}
            >
              <Image
                src="/images/first-buck-2013.jpg"
                alt="First deer photo ever shared on the Bucks of Nebraska Facebook page — York, Nebraska, December 1, 2013"
                width={600}
                height={500}
                className="w-full h-auto"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
                <p className="font-handwritten text-white/90 text-[15px]">
                  York, NE &mdash; December 1, 2013
                </p>
              </div>
            </div>
          </div>

          {/* Letter content */}
          <div className="font-body text-[16px] sm:text-[17px] leading-[1.85] text-[#3a3226] space-y-5">
            <p>
              Story time: Throwback to December 1st, 2013&mdash;to the first deer picture we ever shared on our Facebook page.
            </p>

            <p className="italic text-[#6b5e4f]">
              (Tag this guy if you know him! I owe you some free swag)
            </p>

            <p>
              It was cold as all hell on November 30th, 2013, and I&apos;ll never forget it was a Saturday night full of &quot;what in the F am I going to do with my life&quot; thoughts, sitting in a ladder stand till dark.
            </p>

            <p>
              I&apos;d already spent about 45 days in the stand that season. I was 27 years old and had just moved back to Nebraska in August&mdash;from Minneapolis, Minnesota, to Lincoln, Nebraska.
            </p>

            <p>
              I had no real money, no job, and that weekend I was sleeping upstairs in my (now wife) girlfriend&apos;s childhood bedroom at her parents&apos; house.
            </p>

            <p>
              That long, cold sit in the metal ladder stand that night was where I had the epiphany: I was going to do something that involved what I loved most&mdash;deer hunting. If you&apos;re reading this and thinking, &quot;Yeah, don&apos;t we all wish we could do something in the hunting industry?&quot; Sure, but I&apos;m telling you, on this night I did what I&apos;d only done two other times in my life (once when I said I was going to play professional baseball and once when I said I was going to make money online): I obsessively studied, practiced, trained, and dedicated 20+ hours a day for years until I did it. And I did. Both. Successfully.
            </p>

            <p>
              I&apos;m so thankful I did too, because when my idea met execution with the skills I had 13 years ago, I was committed to mastering it.
            </p>

            {/* Divider */}
            <div className="flex items-center gap-4 py-2">
              <div className="flex-1 border-t border-[#d4c9b8]" />
              <span className="text-[#b8a88e] text-[16px]">&#10038;</span>
              <div className="flex-1 border-t border-[#d4c9b8]" />
            </div>

            <p>
              So just so you all understand&mdash;I grew up in Florida, youngest of five kids, with a dad who poured concrete for a living and deer hunted religiously. I&apos;d travel all over, state to state, with my two brothers and him, killing deer everywhere with every weapon. Shot my first deer at age 8 with a single-shot 20-gauge and 00 buckshot. First archery deer by 10, first deer with my Knight &amp; Hale .50 cal muzzleloader by 12. By age 18 I&apos;d killed so many deer across 15 states (back then some states let you kill a buck and a doe a day&mdash;and I did, many days) that I had piles of racks from the Wabash River in Indiana to the clay dirt roads in South Georgia. On weekends growing up in Florida, most kids were at the beach and I was shooting hogs, turkeys, deer, and alligators with my brothers. If I wasn&apos;t playing baseball, I was in the woods.
            </p>

            <p>
              I eventually played baseball for the Florida Gators in the prime era&mdash;College World Series finals, two football national championships (Tim Tebow), back-to-back basketball national championships. Transferred to Nebraska to play for the Cornhuskers after our head coach at Florida got fired&mdash;just two years after going to the CWS! He was gone, and I was one of the only players in that NCAA era who could transfer and play right away (they let you if your coach was fired and you went out of conference), so no SEC programs were an option. It was ACC or Big 12, the best conferences outside the SEC back then. Landed me a spot on the Huskers. I remember coming to Nebraska on a visit and only thinking, &quot;I bet there are some absolute hammers for deer out here.&quot; I even asked the coaches and a guy behind the counter at the coffee shop if there were big deer to hunt here. They all said yes, so that made my decision real easy. I&apos;d already hunted all over, but Nebraska was never one of them.
            </p>

            <p>
              Anyway, I played a couple years at Nebraska&mdash;GBR&mdash;then went on to play professionally a few years until one day it was just over. Released, and no teams called again.
            </p>

            <p>
              So I got a job skinning deer at the processor and spent nights chasing coyotes and coons. That&apos;s when I had that other moment&mdash;I Googled &quot;how to make money online&quot;&mdash;and a few years later&hellip;
            </p>

            {/* Divider */}
            <div className="flex items-center gap-4 py-2">
              <div className="flex-1 border-t border-[#d4c9b8]" />
              <span className="text-[#b8a88e] text-[16px]">&#10038;</span>
              <div className="flex-1 border-t border-[#d4c9b8]" />
            </div>

            <p>
              I was leaving a dream job as the Paid Social Ads Manager for Target Corporation. I built an entire team that ran all Facebook, Twitter, and even Pinterest ads selling products on Target.com. I even launched their Cartwheel app&mdash;got millions of users to download it within the first three months. Millions and millions in sales running ads.
            </p>

            <p>
              I led an entire campaign launch with Justin Timberlake and his wife Jessica Biel for her company. Sat in the same boardroom as Ellen DeGeneres while she pitched ideas to Target leadership and our social team. At the time I just thought I was doing what I was supposed to be doing in life. Moved to Minneapolis, took the marketing skills I&apos;d built&mdash;it seemed like in the blink of an eye a few years later I was unfulfilled and miserable because as September came and the leaves started changing in October, the rut kicked in full steam in November, and I was sitting on the 23rd floor of the Target building in downtown Minneapolis, overlooking the Twins stadium, working in penny loafers. Whatever I was doing, it was so far from where my mind was&mdash;which was on hunting. My only passion was deer hunting. I had zero hobbies besides hunting. Baseball was gone.
            </p>

            <p>
              And for those few years in my mid-twenties, I chose work and NOT what I was passionate about.
            </p>

            <p>
              It took a few conversations and a couple months of planning, but I eventually walked out of that job and never went back.
            </p>

            {/* Divider */}
            <div className="flex items-center gap-4 py-2">
              <div className="flex-1 border-t border-[#d4c9b8]" />
              <span className="text-[#b8a88e] text-[16px]">&#10038;</span>
              <div className="flex-1 border-t border-[#d4c9b8]" />
            </div>

            <p>
              So that night in the ladder stand, I asked myself, &quot;WTF do I enjoy and what could make money?&quot; Well, the only things I knew were baseball, hunting, and marketing.
            </p>

            <p>
              I landed on the idea of designing decals, shirts, and hats that combined those things.
            </p>

            <p>
              That&apos;s how Bucks of Nebraska was created. Right there in the stand I pulled out my phone and made the page. One of my favorite hunting TV personalities was David Morris from Bucks of Tecomate, and I&apos;d watched every hour of his shows during those 45 days of doing nothing after moving back to Nebraska from Minnesota&mdash;that&apos;s why I named it what it is.
            </p>

            <p>
              13+ years and tens of millions in sales later&mdash;it all started with this first picture attached. Had no products yet, I just knew I needed to start somewhere.
            </p>

            {/* Divider */}
            <div className="flex items-center gap-4 py-2">
              <div className="flex-1 border-t border-[#d4c9b8]" />
              <span className="text-[#b8a88e] text-[16px]">&#10038;</span>
              <div className="flex-1 border-t border-[#d4c9b8]" />
            </div>

            <p>
              Bucks of Nebraska was the beginning of a brand I turned into Bucks of America. At one point we had 30 states rocking the same way you see Nebraska doing now! Many of those other pages still exist and some are even bigger than Nebraska&apos;s now&mdash;you can go look. I started all of them or turned the name over if they were called something else before.
            </p>

            <p>
              Within a couple years we were a full online retailer under bucksof.com (doesn&apos;t exist anymore), and I was selling everything from Leupold scopes to Under Armour apparel. Looked like what Sportsman&apos;s Warehouse looks like online now.
            </p>

            <p>
              By 2019 we were doing eight figures a year, and along came a private equity e-commerce group that acquired the bucksof.com brand and online business.
            </p>

            <p>
              They had more money than sense and were&mdash;like they say in Texas&mdash;&quot;all hat, no cattle&quot; when it came to running a hunting business.
            </p>

            <p>
              They eventually took so much money from investors to buy up businesses like mine but didn&apos;t have the chops to run it or pay back those investors&mdash;they went bankrupt! Hell, I even got sued during that process because they tried to claw back money they&apos;d paid me. They lost, of course, but not before a couple years of legal BS. During that lawsuit I got bucksof.com back from them&hellip; and Bucks of Nebraska. Haha&mdash;they sued me, lost, and I took back what they&apos;d bought from me in the process.
            </p>

            {/* Divider */}
            <div className="flex items-center gap-4 py-2">
              <div className="flex-1 border-t border-[#d4c9b8]" />
              <span className="text-[#b8a88e] text-[16px]">&#10038;</span>
              <div className="flex-1 border-t border-[#d4c9b8]" />
            </div>

            <p>
              So that puts us into 2023 when I got a call from my mom saying my dad wasn&apos;t doing well and to come home. He&apos;d gotten one of those government-mandated arm pricks and it took him within months&mdash;heart attack, liver failure, kidney failure, all the things we now know happen.
            </p>

            <p>
              He passed March 10th, 2023.
            </p>

            <p>
              2025 is my 10-year wedding anniversary to that same woman I was sleeping in her childhood bed with back in 2013, no clue what I was going to do with my life.
            </p>

            <p>
              We&apos;re about to have our third child in January, and we built a home directly across from her parents&apos; house to stay close with the kids.
            </p>

            <p>
              Now I&apos;m back to chasing deer, coyotes, turkeys, and whatever else is in season.
            </p>

            <p>
              I hired a few people to help run this page and brand again. They&apos;re not expert deer hunters like many of you folks on here think you are, but they do a great job keeping it flowing in between the time I&apos;m on here figuring out this social media algorithm and working on what&apos;s next for &quot;Bucks of Nebraska&quot; as a brand.
            </p>

            <p>
              What I can say is&mdash;I&apos;m definitely not rich and certainly not poor, but what I&apos;m working on right now and have been building over the last year with the new products coming in 2026 might very well make me one or the other, and I&apos;m praying on my third child it&apos;s not the latter.
            </p>

            {/* Divider */}
            <div className="flex items-center gap-4 py-2">
              <div className="flex-1 border-t border-[#d4c9b8]" />
              <span className="text-[#b8a88e] text-[16px]">&#10038;</span>
              <div className="flex-1 border-t border-[#d4c9b8]" />
            </div>

            <p>
              Cheers to a 12-year journey together.
            </p>

            <p>
              I promise I&apos;ll keep sharing everything Nebraska&mdash;from deer, ducks, and dogs. Maybe you&apos;ll see some weird AI or non-Nebraska stuff from time to time, but just know it&apos;s the team trying to figure out how to grow this following and brand.
            </p>

            <p>
              Oh, and I promise I&apos;ll never sell this thing out to the hippies from the cities ever again.
            </p>

            {/* Signature */}
            <div className="pt-6 flex flex-col items-end">
              <span className="font-handwritten text-[36px] sm:text-[42px] font-bold text-[#2a2420] leading-none">
                -Cody
              </span>
              <span className="text-[14px] text-[#9a8d7d] mt-1 font-body tracking-wide">
                Founder, Bucks of Nebraska
              </span>
            </div>
          </div>

          {/* Corner fold effect */}
          <div
            className="absolute bottom-0 right-0 w-8 h-8"
            style={{
              background: 'linear-gradient(225deg, #FAF8F5 45%, #e8dfd1 45%, #e8dfd1 55%, #faf6ef 55%)',
            }}
          />
        </div>
      </div>
    </div>
  )
}
