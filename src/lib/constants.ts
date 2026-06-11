import type { NavLink } from "@/types";

export const COMPANY = {
  name: "Lieron Engineering Limited",
  brandName: "Lieron Engineering",
  shortName: "Lieron",
  tagline: "The Standard of Precision",
  headline: "Quality of Work Is Our Assurance",
  description:
    "Specializing in Structural Steel Detailing, Rigging, and Site Fabrication Welding across New Zealand. We engineer the skeletal strength of modern infrastructure.",
  established: "2023",
  location: "Auckland, NZ",
  phone: "021 286 2885",
  email: "noriel@lieron.co.nz",
  domain: "https://www.lieron.co.nz",
  hours: {
    days: "MON — FRI",
    time: "07:00 AM — 03:30 PM",
  },
} as const;

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LINKS = {
  services: [
    { label: "Steel Detailing", href: "/services#detailing" },
    { label: "Rigging", href: "/services#rigging" },
    { label: "Site Fabrication", href: "/services#fabrication" },
    { label: "Manpower Supply", href: "/services#manpower" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms & Conditions", href: "#" },
  ],
} as const;

export const SOCIAL_LINKS = [
  { label: "Facebook", href: "#", icon: "facebook" },
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "LinkedIn", href: "#", icon: "linkedin" },
] as const;

export const SEO = {
  keywords: [
    "structural steel Auckland",
    "steel detailing NZ",
    "rigging Auckland",
    "site fabrication welding New Zealand",
    "structural steel engineering Auckland",
    "steel erection NZ",
  ],
  geo: {
    latitude: -36.8863605,
    longitude: 174.5627566,
    region: "NZ-AUK",
    placeName: "Auckland, New Zealand",
  },
} as const;
