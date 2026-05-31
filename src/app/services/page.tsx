import { generatePageMetadata } from "@/lib/metadata";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";

export const metadata = generatePageMetadata({
  title: "Services",
  description:
    "Lieron Engineering services: Structural Steel Detailing, Rigging & Heavy Lifting, Site Fabrication & Welding, and Skilled Manpower Supply across New Zealand.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gray-900 dark:bg-dark text-white pt-24 md:pt-32 pb-20 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2000&auto=format&fit=crop"
            alt="Engineering background"
            fill
            className="object-cover opacity-20 grayscale"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-gray-900/80 dark:from-dark dark:via-dark/60 dark:to-dark/80" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2.5 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-8 animate-on-scroll">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-primary font-semibold text-[11px] uppercase tracking-[0.15em]">Capabilities</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div className="animate-on-scroll">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.92] tracking-tight mb-6">
                Engineering
                <br />
                <span className="gradient-text">Precision.</span>
              </h1>
              <p className="text-gray-400 text-[15px] leading-relaxed max-w-lg">
                Lieron Engineering provides practical structural steel services across New Zealand, including steel detailing, rigging, site fabrication, welding, and manpower support for construction and industrial projects.
              </p>
            </div>

            <div className="flex justify-start lg:justify-end items-center animate-on-scroll delay-200">
              <div className="glass rounded-xl px-8 py-6 flex items-center gap-6">
                <div className="text-right">
                  <div className="text-4xl md:text-5xl font-extrabold text-white leading-none mb-1">04</div>
                  <div className="text-[10px] text-primary font-semibold uppercase tracking-[0.15em]">Core Services</div>
                </div>
                <div className="h-12 w-px bg-white/10" />
                <div className="text-right">
                  <div className="text-4xl md:text-5xl font-extrabold text-white leading-none mb-1">NZ</div>
                  <div className="text-[10px] text-primary font-semibold uppercase tracking-[0.15em]">Wide Coverage</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service 01: Structural Steel Detailing */}
      <section id="detailing" className="max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-on-scroll">
            <div className="flex items-center gap-3 text-primary mb-4">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase">Service 01</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6 text-gray-900 dark:text-white">
              Structural Steel Detailing
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-[15px] leading-relaxed mb-10">
              We prepare steel models, shop drawings, and fabrication details to help project teams coordinate steel works before fabrication and installation.
            </p>

            <div className="space-y-6">
              {[
                { title: "3D Modeling & BIM", desc: "Steel modeling support using industry tools such as Tekla Structures, based on project requirements.", icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" },
                { title: "Shop Drawings", desc: "Clear shop drawings and material information to support fabrication and site coordination.", icon: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 items-start group">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-dark-card border border-gray-200 dark:border-dark-border flex items-center justify-center shrink-0 group-hover:border-primary/30 transition-colors">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1 text-gray-900 dark:text-white">{item.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-on-scroll slide-right">
            <div className="bg-gray-50 dark:bg-dark-card rounded-2xl overflow-hidden border border-gray-100 dark:border-dark-border">
              <Image
                src="/images/Steel-detailing.jpg"
                alt="3D structural modeling"
                width={1000}
                height={400}
                className="w-full h-64 object-cover"
              />
              <div className="grid grid-cols-2 divide-x divide-gray-200 dark:divide-dark-border p-6">
                <div className="pr-6">
                  <p className="text-primary font-semibold text-[10px] uppercase tracking-[0.15em] mb-1">CAPABILITY</p>
                  <p className="font-bold text-sm text-gray-900 dark:text-white">3D Modeling & BIM</p>
                </div>
                <div className="pl-6">
                  <p className="text-primary font-semibold text-[10px] uppercase tracking-[0.15em] mb-1">DELIVERABLES</p>
                  <p className="font-bold text-sm text-gray-900 dark:text-white">Shop Drawings & Fabrication Details</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service 02: Rigging & Heavy Lifting */}
      <section id="rigging" className="bg-gray-900 dark:bg-dark-card text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end mb-16">
            <div className="animate-on-scroll">
              <SectionLabel className="text-primary">Service 02</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-4">
                Rigging &amp; Heavy Lifting
              </h2>
            </div>
            <div className="md:text-right animate-on-scroll delay-100">
              <p className="text-gray-400 text-[15px] leading-relaxed max-w-md ml-auto">
                We support lifting, positioning, and handling of structural steel on site, with planning based on project needs and site conditions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: "Certified Crews", desc: "Trained rigging personnel assigned based on project requirements.", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
              { title: "Lift Planning", desc: "Lift planning support based on site conditions, load requirements, and project safety procedures..", icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
              { title: "Specialist Gear", desc: "Access to suitable lifting equipment and gear depending on the project scope.", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35" },
            ].map((item, i) => (
              <div
                key={item.title}
                className="bg-gray-800/50 dark:bg-dark-surface rounded-2xl p-8 card-hover animate-on-scroll border border-gray-700/50 dark:border-dark-border"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-6">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <h3 className="font-bold text-sm mb-3">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service 03: Site Fabrication & Welding */}
      <section id="fabrication" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <SectionLabel>Service 03</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mt-4">
              Site Fabrication &amp; Welding
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative animate-on-scroll">
              <Image
                src="/images/sf 2.jpeg"
                alt="Professional welder at work"
                width={1000}
                height={450}
                className="w-full h-[450px] object-cover rounded-2xl"
              />
              <div className="absolute -bottom-6 -right-4 md:-right-6 bg-primary text-white p-6 rounded-xl shadow-lg text-center">
                <div className="text-3xl font-extrabold leading-none mb-1">03</div>
                <div className="text-[9px] font-semibold tracking-[0.15em] uppercase">SITE SUPPORT</div>
              </div>
            </div>

            <div className="space-y-8 animate-on-scroll slide-right">
              {[
                { title: "On-Site Welding", desc: "On-site welding support for structural steel works, carried out according to project specifications and relevant welding requirements." },
                { title: "Custom Steel Fabrication", desc: "Steel fabrication support for project-specific components, site adjustments, and structural steel works." },
                { title: "Precision Alignment", desc: " Alignment support for steel components during installation and site works." },
              ].map((item, i) => (
                <div key={item.title} className="flex items-start gap-4" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[15px] mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service 04: Skilled Manpower Supply */}
      <section id="manpower" className="py-20 md:py-28 bg-gray-50 dark:bg-dark-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 animate-on-scroll">
            <div>
              <SectionLabel>Service 04</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mt-4">
                Skilled Manpower Supply
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {[
              { badge: "Skilled Support", title: "Structural Welders", desc: "Welders available for structural steel works based on project needs and required qualifications." },
              { badge: "Specialist", title: "Advanced Riggers", desc: "Rigging personnel available to support lifting, positioning, and steel assembly works." },
              { badge: "Technical", title: "Steel Erectors", desc: " Steel erectors available to support structural steel installation and site assembly." },
              { badge: "Leadership", title: "Site Supervisors", desc: "Site supervision support to help coordinate work activities, safety procedures, and project workflow" },
            ].map((item, i) => (
              <div
                key={item.title}
                className="bg-white dark:bg-dark-surface rounded-2xl p-6 card-hover animate-on-scroll border border-gray-100 dark:border-dark-border"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <p className="text-primary font-semibold text-[10px] uppercase tracking-[0.15em] mb-4">{item.badge}</p>
                <h3 className="font-bold text-sm mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-900 dark:bg-dark-surface text-white p-8 md:p-12 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 animate-on-scroll border border-gray-800 dark:border-dark-border">
            <div>
              <h3 className="text-xl font-bold mb-2">Ready for deployment?</h3>
              <p className="text-sm text-gray-400">Scale your project capacity with Lieron&apos;s elite technical teams.</p>
            </div>
            <Button href="/contact" variant="primary" id="manpower-cta">
              Request Manpower
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-28">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-8 md:px-16 lg:px-24 py-16 md:py-20 text-center">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 rounded-full blur-[100px]" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-10 leading-[1.1]">
              Let&apos;s Build The Future
              <br />
              Together.
            </h2>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button href="/contact" variant="dark" id="services-cta-profile">
                Download Capabilities Profile
              </Button>
              <Button href="/contact" variant="white" id="services-cta-speak">
                Speak To An Engineer
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
