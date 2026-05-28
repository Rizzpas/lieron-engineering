"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import { COMPANY } from "@/lib/constants";

const CONCERN_TYPES = [
  "New Project Inquiry",
  "Ongoing Project Update",
  "Staff & Service Feedback",
  "Billing & Accounts",
  "General Enquiry",
  "Other",
] as const;

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactPageClient() {
  const [selectedConcern, setSelectedConcern] = useState<string | null>(null);
  const [customConcern, setCustomConcern] = useState("");
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormStatus("submitting");
    setErrorMessage("");

    // Determine the concern value
    let concernValue = selectedConcern || "General Enquiry";
    if (selectedConcern === "Other") {
      concernValue = customConcern.trim() || "Other";
    }

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      concern: concernValue,
      brief: formData.get("brief") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setFormStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
        return;
      }

      setFormStatus("success");
      setSelectedConcern(null);
      setCustomConcern("");
      formRef.current?.reset();

      setTimeout(() => setFormStatus("idle"), 6000);
    } catch {
      setFormStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  }

  return (
    <>
      {/* Hero + Form Section */}
      <div className="max-w-7xl mx-auto pt-16 md:pt-24 px-6 lg:px-8">
        {/* Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 items-end mb-12 md:mb-16">
          <div className="lg:col-span-7 animate-on-scroll">
            <SectionLabel variant="dark">Contact Phase 01</SectionLabel>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[0.92] tracking-tight text-dark dark:text-white">
              Get In<br />
              <span className="gradient-text">Touch.</span>
            </h1>
          </div>
          <div className="lg:col-span-5 pb-2 animate-on-scroll delay-200">
            <p className="text-gray-500 dark:text-gray-400 text-[15px] leading-relaxed max-w-md mt-4 lg:mt-0">
              Whether you&apos;re starting a new project, have questions about an ongoing build, or need to raise a concern — our team reviews every submission with priority.
            </p>
          </div>
        </div>

        {/* Form + Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20">
          {/* Contact Form */}
          <div className="bg-gray-50 dark:bg-dark-card rounded-2xl p-6 sm:p-10 md:p-14 animate-on-scroll border border-gray-100 dark:border-dark-border">
            {/* Success Message */}
            {formStatus === "success" && (
              <div className="mb-8 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 animate-[fadeIn_0.4s_ease-out]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-emerald-800 dark:text-emerald-300">Message Sent Successfully</p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">We&apos;ve received your message. Our team will review and respond within 24 hours.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {formStatus === "error" && (
              <div className="mb-8 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 animate-[fadeIn_0.4s_ease-out]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-red-800 dark:text-red-300">Submission Failed</p>
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">{errorMessage}</p>
                  </div>
                </div>
              </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                <div>
                  <label htmlFor="contact-name" className="block text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.15em] mb-3">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    placeholder="John Doe"
                    className="w-full bg-transparent border-b border-gray-300 dark:border-gray-600 pb-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-colors placeholder:text-gray-400"
                    required
                    disabled={formStatus === "submitting"}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.15em] mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    placeholder="john@example.com"
                    className="w-full bg-transparent border-b border-gray-300 dark:border-gray-600 pb-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-colors placeholder:text-gray-400"
                    required
                    disabled={formStatus === "submitting"}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.15em] mb-3">
                  Nature of Concern
                </label>
                <div className="flex flex-wrap gap-2">
                  {CONCERN_TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        setSelectedConcern(selectedConcern === type ? null : type);
                        if (type !== "Other") setCustomConcern("");
                      }}
                      disabled={formStatus === "submitting"}
                      className={`text-[10px] font-semibold uppercase tracking-[0.12em] px-4 py-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                        selectedConcern === type
                          ? "bg-primary text-white shadow-[0_2px_12px_rgba(234,88,12,0.3)]"
                          : "bg-gray-200 dark:bg-dark-surface text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700 border border-gray-300 dark:border-dark-border"
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                {/* Custom concern input — appears when "Other" is selected */}
                {selectedConcern === "Other" && (
                  <div className="mt-4 animate-[fadeIn_0.3s_ease-out]">
                    <input
                      type="text"
                      value={customConcern}
                      onChange={(e) => setCustomConcern(e.target.value)}
                      placeholder="Please specify your concern..."
                      className="w-full bg-transparent border-b border-gray-300 dark:border-gray-600 pb-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-colors placeholder:text-gray-400"
                      disabled={formStatus === "submitting"}
                      required
                    />
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="contact-brief" className="block text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.15em] mb-3">
                  Message
                </label>
                <textarea
                  id="contact-brief"
                  name="brief"
                  rows={4}
                  placeholder="Describe your inquiry, concern, or feedback in detail..."
                  className="w-full bg-transparent border-b border-gray-300 dark:border-gray-600 pb-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-colors placeholder:text-gray-400 resize-none"
                  disabled={formStatus === "submitting"}
                  required
                />
              </div>

              <div>
                <button
                  type="submit"
                  id="contact-submit"
                  disabled={formStatus === "submitting"}
                  className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white text-[11px] font-semibold uppercase tracking-[0.15em] px-8 py-4 rounded-lg transition-all duration-300 flex justify-center items-center gap-3 shadow-[0_2px_12px_rgba(234,88,12,0.25)] hover:shadow-[0_4px_20px_rgba(234,88,12,0.35)] hover:-translate-y-0.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {formStatus === "submitting" ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Submit Message
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info Side */}
          <div className="flex flex-col space-y-6 md:space-y-8">
            {/* HQ Info + Hours */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-gray-50 dark:bg-dark-card rounded-2xl p-6 border border-gray-100 dark:border-dark-border animate-on-scroll">
                <p className="text-primary font-semibold text-[10px] uppercase tracking-[0.15em] mb-4">Direct HQ</p>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-none mb-1">Auckland</h3>
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.15em] mb-5">New Zealand HQ</p>
                <div className="space-y-2">
                  <p className="font-semibold text-sm text-gray-900 dark:text-white">{COMPANY.phone}</p>
                  <p className="font-semibold text-sm text-gray-900 dark:text-white break-all">{COMPANY.email}</p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-dark-card rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center animate-on-scroll delay-100 border border-gray-100 dark:border-dark-border">
                <p className="text-primary font-semibold text-[10px] uppercase tracking-[0.15em] mb-2 relative z-10">Office Hours</p>
                <p className="font-bold text-lg text-gray-900 dark:text-white tracking-tight mb-1 relative z-10">{COMPANY.hours.days}</p>
                <p className="font-bold text-lg text-primary tracking-tight relative z-10">{COMPANY.hours.time}</p>
                <svg className="absolute -right-4 -bottom-4 w-20 h-20 text-gray-200 dark:text-gray-800 opacity-50 z-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14H11V7h2v9z" />
                </svg>
              </div>
            </div>

            {/* Site Image */}
            <div className="relative w-full h-48 sm:h-64 md:h-[260px] bg-gray-900 rounded-2xl overflow-hidden animate-on-scroll">
              <Image
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000&auto=format&fit=crop"
                alt="Structural steel construction site"
                fill
                className="object-cover grayscale opacity-70"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white pr-4 z-10">
                <p className="text-primary font-semibold text-[9px] uppercase tracking-[0.15em] mb-1">Project Site 442-A</p>
                <p className="text-sm font-bold tracking-tight leading-tight">Auckland Structural Integrated Development</p>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-gray-50 dark:bg-dark-card rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-on-scroll border border-gray-100 dark:border-dark-border">
              <div className="flex items-center gap-4">
                <div className="bg-primary w-11 h-11 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-0.5">Auckland, NZ</h4>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">Central Business District</p>
                </div>
              </div>
              <a href="#map" className="text-[10px] font-semibold text-primary uppercase tracking-[0.15em] hover:underline transition-colors self-start sm:self-auto ml-15 sm:ml-0 whitespace-nowrap">
                View Map →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Info Bar */}
        <div className="mt-16 md:mt-20 pt-8">
          <div className="divider-gradient mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 animate-on-scroll">
            <div>
              <p className="text-primary font-semibold text-[10px] uppercase tracking-[0.15em] mb-2">Operations</p>
              <p className="font-bold text-sm text-gray-900 dark:text-white">North Island Wide</p>
            </div>
            <div>
              <p className="text-primary font-semibold text-[10px] uppercase tracking-[0.15em] mb-2">Technical Support</p>
              <p className="font-bold text-sm text-gray-900 dark:text-white">24/7 Priority Response</p>
            </div>
            <div>
              <p className="text-primary font-semibold text-[10px] uppercase tracking-[0.15em] mb-2">Certifications</p>
              <p className="font-bold text-sm text-gray-900 dark:text-white">CPEng / NZ Chartered</p>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div id="map" className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 md:pt-28 pb-8 text-center">
        <SectionLabel>Contact us</SectionLabel>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-gray-900 dark:text-white mt-4">Our Location</h2>
        <p className="text-gray-500 dark:text-gray-400 text-[15px]">Visit our Auckland headquarters.</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
        <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-gray-200 dark:border-dark-border shadow-sm">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51058.66696657133!2d174.56275665018623!3d-36.8863605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d0d417bb037e893%3A0x715a973d95656e62!2sLIERON%20ENGINEERING%20LIMITED!5e0!3m2!1sen!2sph!4v1775495205113!5m2!1sen!2sph"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lieron Engineering Limited location map"
          />
        </div>
      </div>

      {/* Contact Cards */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <div className="mb-12 animate-on-scroll">
          <SectionLabel>Contact us</SectionLabel>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3 mt-4">We&apos;d love to hear from you</h2>
          <p className="text-gray-500 dark:text-gray-400 text-[15px]">Our friendly team is always here to chat.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
              title: "Chat to sales",
              desc: "Speak to our friendly team.",
              contact: COMPANY.email,
              href: `mailto:${COMPANY.email}`,
            },
            {
              icon: "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z",
              title: "Chat to support",
              desc: "We're here to help.",
              contact: COMPANY.email,
              href: `mailto:${COMPANY.email}`,
            },
            {
              icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
              title: "Visit us",
              desc: "Visit our office HQ.",
              contact: "Auckland, New Zealand",
              href: "#map",
              isSecondPath: true,
            },
            {
              icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
              title: "Call us",
              desc: "Mon-Fri from 8am to 5pm.",
              contact: COMPANY.phone,
              href: `tel:${COMPANY.phone.replace(/\s/g, "")}`,
            },
          ].map((card) => (
            <div
              key={card.title}
              className="bg-gray-50 dark:bg-dark-card p-6 rounded-2xl card-hover animate-on-scroll border border-gray-100 dark:border-dark-border"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-10">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={card.icon} />
                  {card.isSecondPath && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  )}
                </svg>
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{card.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">{card.desc}</p>
              <a href={card.href} className="text-primary font-medium text-sm hover:underline">
                {card.contact}
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
