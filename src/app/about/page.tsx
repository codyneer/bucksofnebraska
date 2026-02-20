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
        The Best of The Heartland. Rep Nebraska.
      </p>

      {/* Founder photo */}
      <div className="mb-12 flex justify-center">
        <div className="relative w-full max-w-[560px] overflow-hidden rounded-sm" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.12)' }}>
          <Image
            src="/images/cody-neer.jpg"
            alt="Cody Neer, founder of Bucks of Nebraska, with a whitetail buck"
            width={1280}
            height={856}
            className="w-full h-auto"
          />
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent px-4 py-3">
            <p className="font-handwritten text-white/90 text-[16px]">
              Cody Neer &mdash; Founder, Bucks of Nebraska
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8 text-text-light text-[16px] leading-relaxed font-body">
        <p>
          Bucks of Nebraska started the way most good things do in this state &mdash; from good people.
          <a href="#founders-letter" className="text-red hover:text-red-dark underline underline-offset-2">Read the story of how we started in the letter below.</a> Since 2013, we&apos;ve grown this brand
          from a grassroots effort all the way to a 7 figure company. Tying the two things people
          are most passionate about in this state &mdash; the Huskers and Deer Hunting. We were tired of
          wearing gear that didn&apos;t represent us. Every brand was coastal, every logo was generic,
          and nothing said &quot;Nebraska&quot; the way we live it.
        </p>

        <h2 className="font-display text-[32px] text-text mt-12">
          More Than a <span className="text-red">Logo</span>
        </h2>
        <p>
          We&apos;re not just slapping a deer on a hat and calling it a brand. Everything we make
          represents Nebraska and The Good Life. From early season pronghorn hunts out west, to
          dove hunts in the Platte River Valley to prime rut November sits in the Cedar River
          bottoms, all the way to Memorial Stadium on a Saturday, what we create represents who
          we are any place at any time. When you come to Nebraska, look for that Red N with
          Antlers on the back of pickups &mdash; we&apos;ve made and shipped over 750,000 of them since
          we started.
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
      <div id="founders-letter" className="mt-20 relative scroll-mt-32">
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
              Story time: Throwback to December 1, 2013&mdash;to the first deer picture we ever shared on our Facebook page.
            </p>

            <p className="italic text-[#6b5e4f]">
              Thanks to Billy Hulse for sharing this pic.
            </p>

            <p>
              It was cold as all hell on November 30, 2013. I&apos;ll never forget that Saturday night, sitting in a metal ladder stand until dark, full of &quot;What in the F am I going to do with my life?&quot; thoughts.
            </p>

            <p>
              I&apos;d already spent about 45 days in the stand that season. I was 27 years old and had just moved back to Nebraska in August&mdash;from Minneapolis, Minnesota, to Lincoln, Nebraska.
            </p>

            <p>
              I had no real money and no job. That weekend, I was sleeping upstairs in my (now wife&apos;s) childhood bedroom at her parents&apos; house.
            </p>

            <p>
              That long, cold sit in that metal ladder stand was where I had the epiphany: I was going to do something involving what I loved most&mdash;deer hunting.
            </p>

            <p>
              If you&apos;re reading this and thinking, &quot;Yeah, don&apos;t we all wish we could do something in the hunting industry?&quot; sure. But I&apos;m telling you, on that night I did what I&apos;d only done two other times in my life: once when I said I was going to play professional baseball, and once when I said I was going to make money online. I obsessively studied, practiced, trained, and dedicated 20+ hours a day for years until I did it.
            </p>

            <p>
              And I did. Both. Successfully.
            </p>

            <p>
              I&apos;m so thankful I did, because when my idea met execution with the skills I had 13 years ago, I was committed to mastering it.
            </p>

            {/* Divider */}
            <div className="flex items-center gap-4 py-2">
              <div className="flex-1 border-t border-[#d4c9b8]" />
              <span className="text-[#b8a88e] text-[16px]">&#10038;</span>
              <div className="flex-1 border-t border-[#d4c9b8]" />
            </div>

            <p>
              So you all understand&mdash;I grew up in Florida, the youngest of five kids, with a dad who poured concrete for a living and deer hunted religiously. I traveled all over, state to state, with my two brothers and him, killing deer everywhere with every weapon.
            </p>

            <p>
              I shot my first deer at age 8 with a single-shot 20-gauge and 00 buckshot. My first archery deer by 10. My first deer with my Knight &amp; Hale .50 cal muzzleloader by 12. By age 18, I&apos;d killed so many deer across 15 states&mdash;back when some states let you kill a buck and a doe a day, and I did, many days&mdash;that I had piles of racks from the Wabash River in Indiana to the clay dirt roads in South Georgia.
            </p>

            <p>
              On weekends growing up in Florida, most kids were at the beach. I was shooting hogs, turkeys, deer, and alligators with my brothers. If I wasn&apos;t playing baseball, I was in the woods.
            </p>

            <p>
              I eventually played baseball for the Florida Gators during their prime era&mdash;College World Series finals, two football national championships (Tim Tebow), and back-to-back basketball national championships. After our head coach at Florida got fired&mdash;just two years after going to the CWS&mdash;I transferred to Nebraska to play for the Cornhuskers.
            </p>

            <p>
              Back then, if your coach got fired and you transferred out of conference, you could play right away. No SEC programs were an option. It was ACC or Big 12&mdash;the best conferences outside the SEC at the time. That landed me a spot with the Huskers.
            </p>

            <p>
              I remember coming to Nebraska on a visit and thinking only one thing: &quot;I bet there are some absolute hammers for deer out here.&quot; I asked the coaches and even a guy behind the counter at a coffee shop if there were big deer to hunt here. They all said yes. That made my decision easy. I&apos;d hunted all over, but Nebraska had never been one of them.
            </p>

            <p>
              Anyway, I played a couple years at Nebraska&mdash;GBR&mdash;then went on to play professionally for a few years until, one day, it was just over. Released. And no teams ever called again.
            </p>

            {/* Baseball photo */}
            <div className="flex justify-center py-2">
              <div className="relative w-full max-w-[400px] overflow-hidden rounded-sm" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}>
                <Image
                  src="/images/swing.jpg"
                  alt="Cody Neer playing baseball"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>

            <p>
              So I got a job skinning deer at a processor and spent nights chasing coyotes and coons. That&apos;s when I had that other moment&mdash;I Googled, &quot;how to make money online.&quot;
            </p>

            <p>
              A few years later&hellip;
            </p>

            {/* Divider */}
            <div className="flex items-center gap-4 py-2">
              <div className="flex-1 border-t border-[#d4c9b8]" />
              <span className="text-[#b8a88e] text-[16px]">&#10038;</span>
              <div className="flex-1 border-t border-[#d4c9b8]" />
            </div>

            <p>
              I was leaving a dream job as the Paid Social Ads Manager for Target Corporation.
            </p>

            <p>
              I built an entire team that ran all Facebook, Twitter, and even Pinterest ads selling products on Target.com. I launched their Cartwheel app and got millions of users to download it within the first three months. Millions and millions in sales running ads.
            </p>

            <p>
              I led a full campaign launch with Justin Timberlake and his wife, Jessica Biel, for her company. I sat in the same boardroom as Ellen DeGeneres while she pitched ideas to Target leadership and our social team.
            </p>

            <p>
              At the time, I thought I was doing what I was supposed to be doing in life. I moved to Minneapolis and used the marketing skills I&apos;d built. But in what felt like the blink of an eye, a few years later, I was unfulfilled and miserable.
            </p>

            <p>
              September came. The leaves started changing in October. The rut kicked in full steam in November. And I was sitting on the 23rd floor of the Target building in downtown Minneapolis, overlooking the Twins stadium, working in penny loafers.
            </p>

            <p>
              Whatever I was doing was so far from where my mind was&mdash;which was hunting. My only passion was deer hunting. I had zero hobbies besides hunting. Baseball was gone.
            </p>

            <p>
              For those few years in my mid-twenties, I chose work over what I was passionate about.
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
              So that night in the ladder stand, I asked myself, &quot;WTF do I enjoy, and what could make money?&quot;
            </p>

            <p>
              The only things I knew were baseball, hunting, and marketing.
            </p>

            <p>
              I landed on the idea of designing decals, shirts, and hats that combined those things.
            </p>

            <p>
              That&apos;s how Bucks of Nebraska was created. Right there in the stand, I pulled out my phone and made the page. One of my favorite hunting TV personalities was David Morris from Bucks of Tecomate, and I&apos;d watched every hour of his shows during those 45 days of doing nothing after moving back to Nebraska from Minnesota. That&apos;s why I named it what it is.
            </p>

            <p>
              Thirteen-plus years and tens of millions in sales later, it all started with this first picture attached. I had no products yet. I just knew I needed to start somewhere.
            </p>

            {/* Divider */}
            <div className="flex items-center gap-4 py-2">
              <div className="flex-1 border-t border-[#d4c9b8]" />
              <span className="text-[#b8a88e] text-[16px]">&#10038;</span>
              <div className="flex-1 border-t border-[#d4c9b8]" />
            </div>

            <p>
              Bucks of Nebraska was the beginning of a brand I later turned into Bucks of America. At one point, we had 30 states rocking the same way you see Nebraska doing now. Many of those other pages still exist, and some are even bigger than Nebraska&apos;s. You can go look. I started all of them or turned the name over if they were called something else before.
            </p>

            <p>
              Within a couple of years, we were a full online retailer under bucksof.com (which doesn&apos;t exist anymore), selling everything from Leupold scopes to Under Armour apparel. It looked like what Sportsman&apos;s Warehouse looks like online now.
            </p>

            <p>
              By 2019, we were doing eight figures a year. Then along came a private equity e-commerce group that acquired the bucksof.com brand and online business.
            </p>

            <p>
              They had more money than sense and were&mdash;like they say in Texas&mdash;&quot;all hat, no cattle&quot; when it came to running a hunting business.
            </p>

            <p>
              They took so much money from investors to buy up businesses like mine but didn&apos;t have the chops to run them or pay those investors back. They went bankrupt.
            </p>

            <p>
              Hell, I even got sued during that process because they tried to claw back money they&apos;d paid me. They lost, of course&mdash;but not before a couple years of legal BS. During that lawsuit, I got bucksof.com back from them&hellip; and Bucks of Nebraska.
            </p>

            <p>
              They sued me, lost, and I took back what they&apos;d bought from me in the process.
            </p>

            {/* Divider */}
            <div className="flex items-center gap-4 py-2">
              <div className="flex-1 border-t border-[#d4c9b8]" />
              <span className="text-[#b8a88e] text-[16px]">&#10038;</span>
              <div className="flex-1 border-t border-[#d4c9b8]" />
            </div>

            <p>
              That brings us to 2023, when I got a call from my mom saying my dad wasn&apos;t doing well and that I needed to come home. He&apos;d gotten one of those government-mandated arm pricks, and within months he was gone&mdash;heart attack, liver failure, kidney failure. All the things we now know happen.
            </p>

            <p>
              He passed on March 10, 2023.
            </p>

            <p>
              In 2025, we&apos;ll celebrate our 10-year wedding anniversary with the same woman whose childhood bedroom I was sleeping in back in 2013, with no clue what I was going to do with my life.
            </p>

            <p>
              We&apos;re about to have our third child in January, and we built a home directly across from her parents&apos; house to stay close and raise our kids near family.
            </p>

            <p>
              Now I&apos;m back to chasing deer, coyotes, turkeys, and whatever else is in season.
            </p>

            <p>
              I hired a few people to help run this page and brand again. They&apos;re not expert deer hunters like many of you folks on here think you are, but they do a great job keeping it flowing while I&apos;m figuring out this social media algorithm and working on what&apos;s next for Bucks of Nebraska as a brand.
            </p>

            <p>
              What I can say is this: I&apos;m definitely not rich and certainly not poor. But what I&apos;ve been building over the last year&mdash;with new products coming in 2026&mdash;might very well make me one or the other. And as I pray over my third child, I&apos;m hoping it&apos;s not the latter.
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
              I promise I&apos;ll keep sharing everything Nebraska&mdash;from deer to ducks to dogs. You might see some weird AI or non-Nebraska stuff from time to time, but just know it&apos;s the team trying to figure out how to grow this following and brand.
            </p>

            <p>
              And I promise I&apos;ll never sell this thing out to the hippies from the cities ever again.
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
