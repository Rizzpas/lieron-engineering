import { generatePageMetadata } from "@/lib/metadata";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata = generatePageMetadata({
  title: "About Us",
  description:
    "Learn about Lieron Engineering Limited — precision engineering solutions built on reliability. Auckland-based structural steel specialists with a relentless commitment to safety.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 md:pt-24 pb-20 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-8 animate-on-scroll">
            <SectionLabel>Built On Reliability</SectionLabel>
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-extrabold leading-[0.92] tracking-tight text-dark dark:text-white">
              Precision
              <br />
              Engineering
              <br />
              <span className="text-gray-400 dark:text-gray-600">Solutions.</span>
            </h1>
          </div>
          <div className="lg:col-span-4 pb-2 animate-on-scroll delay-200">
            <p className="text-gray-500 dark:text-gray-400 text-[15px] leading-relaxed">
              At Lieron Engineering, we don&apos;t just assemble structures; we forge the backbone of New Zealand&apos;s robust infrastructure through surgical precision and unwavering standards.
            </p>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-20 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
          <div className="bg-gray-50 dark:bg-dark-card rounded-2xl p-10 md:p-16 flex flex-col justify-center animate-on-scroll border border-gray-100 dark:border-dark-border">
            <p className="text-primary font-semibold text-[11px] uppercase tracking-[0.2em] mb-12">
              Company History
            </p>
            <div className="space-y-10">
              <div className="flex gap-6">
                <div className="text-5xl font-extrabold text-gray-200 dark:text-gray-800 leading-none">23</div>
                <div>
                  <h3 className="font-bold text-sm mb-2 text-gray-900 dark:text-white">Auckland Origin</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    Founded in Auckland since 2023, Lieron Engineering Limited has grown from a small contractor for rigging crew into a trusted partner for large-scale structural projects. Our reputation is built on consistent delivery, attention to detail, and client satisfaction.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="text-5xl font-extrabold text-gray-200 dark:text-gray-800 leading-none">24</div>
                <div>
                  <h3 className="font-bold text-sm mb-2 text-gray-900 dark:text-white">Structural Integration</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    Evolved into a full-scale structural partner, integrating coded welding and precision detailing into our core operations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-80 lg:h-auto rounded-2xl overflow-hidden animate-on-scroll slide-right">
            <Image
              src="/images/rigg 17.jpeg"
              alt="Steel beams structural framework"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-6 right-6 bg-primary text-white font-bold text-lg px-6 py-3 rounded-xl shadow-lg">
              Est. 2023
            </div>
          </div>
        </div>
      </section>

      {/* Values: Vision, Mission, Value */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto text-center mb-16 animate-on-scroll">
          <SectionLabel>Our Foundation</SectionLabel>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-dark dark:text-white mt-4">
            Building For
            <br />
            <span className="gradient-text">Generations.</span>
          </h2>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 px-4">
          {[
            {
              icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
              title: "The Vision",
              desc: "To be a trusted leader in specialized engineering services, known for our expertise in rigging, structural detailing, and on-site welding fabrication. We aim to set industry benchmarks in quality, safety, and reliability—building structures that stand strong for generations.",
            },
            {
              icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0",
              title: "The Mission",
              desc: "To deliver precision-engineered solutions that support the backbone of New Zealand’s infrastructure and industrial sectors. We specialize in structural steel detailing, rigging, and site fabrication welding, ensuring every project is executed with safety, accuracy, and efficiency.",
            },
            {
              icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
              title: "The Value",
              desc: "We show up prepared, communicate clearly, and complete each task based on project requirements and safety procedures. Through practical workmanship, accountability, and teamwork, we aim to support every project with consistent and dependable service.",
            },
          ].map((item, i) => (
            <div
              key={item.title}
              className={`bg-gray-50 dark:bg-dark-card rounded-2xl p-8 text-center card-hover animate-on-scroll border border-gray-100 dark:border-dark-border`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/5 dark:bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                </svg>
              </div>
              <h3 className="font-bold text-sm mb-3 text-gray-900 dark:text-white">{item.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Safety Section */}
      <section className="bg-gray-900 dark:bg-dark-card text-white py-20 md:py-28 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="animate-on-scroll">
            <SectionLabel className="text-primary">Health, Safety and Wellbeing</SectionLabel>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[0.95] mb-12 mt-4">
              A Practical
              <br />
              Commitment
              <br />
              <span className="text-gray-500">To Safe Work.</span>
            </h2>

            <div className="space-y-8">
              {[
                { title: "SAFETY FIRST", desc: "We follow safe work practices, site procedures, and risk controls to help protect our team, clients, and project sites." },
                { title: "ONGOING READINESS", desc: "Our team stays prepared through site briefings, task planning, and practical safety awareness before and during work." },
                { title: "COMPLIANCE-FOCUSED WORK", desc: "We work in line with relevant New Zealand health and safety requirements, project procedures, and client expectations." },
              ].map((item, i) => (
                <div key={item.title} className="flex items-start gap-4" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h4 className="text-primary text-xs font-semibold uppercase tracking-[0.15em] mb-2">{item.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-96 lg:h-[560px] w-full rounded-2xl overflow-hidden animate-on-scroll slide-right">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 dark:from-dark-card to-transparent z-10 w-1/4 hidden lg:block" />
            <Image
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000&auto=format&fit=crop"
              alt="Construction site safety protocols"
              fill
              className="object-cover opacity-70"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 md:py-28 px-6 bg-white dark:bg-dark">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 animate-on-scroll">
            <SectionLabel>Our Team</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-dark dark:text-white mt-4">
              The Specialist Engine
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-[15px] mt-3">
              Skilled support for structural steel projects, from detailing to site works.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                title: "Welders",
                image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800&auto=format&fit=crop",
              },
              {
                title: "Riggers",
                image: "/images/rigg 2.jpeg",
              },
              {
                title: "Steel Detailers",
                image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className="relative group aspect-[4/5] overflow-hidden bg-black rounded-2xl animate-on-scroll"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-80 transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                <div className="absolute bottom-8 left-8 z-20">
                  <p className="text-primary font-semibold text-[10px] uppercase tracking-[0.2em] mb-2">Specialist</p>
                  <h3 className="text-white font-bold text-xl tracking-tight">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
