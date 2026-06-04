export interface ProjectData {
  id: string;
  title: string;
  description: string;
  category: "commercial" | "industrial" | "infrastructure";
  categoryLabel: string;
  location: string;
  status: "completed" | "ongoing";
  image: string;
  subcontractor: string;
  mainContractor: string;
  details: {
    scope: string;
    duration: string;
  };
  keyHighlights: string[];
  gallery: string[];
}

export const PROJECTS: ProjectData[] = [
  // ── COMMERCIAL ──────────────────────────────────────────────
  {
    id: "place-makers-wiri",
    title: "Place Makers Wiri",
    description:
      "Installation of structural steel framework and side girts purlins for a major commercial retail facility.",
    category: "commercial",
    categoryLabel: "Commercial",
    location: "Wiri, Auckland",
    status: "completed",
    image: "/images/Place Makers-Project.png",
    subcontractor: "Lieron Engineering Limited",
    mainContractor: "Weldlok NZ",
    details: {
      scope:
        "Installation of structural steel framework and side Girts purlins.",
      duration: "1 week",
    },
    keyHighlights: [
      "Fast-tracked commercial skeleton erection",
      "Zero-incident safety record",
      "Precision alignment of secondary structural framing elements under a compressed timeframe",
    ],
    gallery: [],
  },
  {
    id: "manawa-bay",
    title: "Manawa Bay",
    description:
      "Heavy on-site structural welding, technical site modifications, and interior steel framing erection within a major retail precinct.",
    category: "commercial",
    categoryLabel: "Commercial",
    location: "Auckland",
    status: "completed",
    image: "/images/Manawa-Bay-Project.jpeg",
    subcontractor: "Lieron Engineering Limited",
    mainContractor: "Weldlok NZ",
    details: {
      scope:
        "Heavy on-site structural welding, technical site modifications, and interior steel framing erection.",
      duration: "3 months",
    },
    keyHighlights: [
      "Dynamic fit-out and structural adjustments within a major commercial retail precinct",
      "Adaptable on-the-fly site engineering to accommodate changing tenant layout requirements",
    ],
    gallery: [
      "/images/Manawa-Bay-Project 2.jpeg",
      "/images/Manawa-Bay-Project 3.png",
      "/images/Manawa-Bay-Project 4.png",
    ],
  },
  {
    id: "paknsave-albany",
    title: "PaknSave Albany (Underground Parking)",
    description:
      "Structural steel installation and heavy-duty drilling for all primary main beam supports in a sub-level parking facility.",
    category: "commercial",
    categoryLabel: "Commercial",
    location: "Albany, Auckland",
    status: "completed",
    image: "/images/PaknSave Albany-Project.jpeg",
    subcontractor: "Lieron Engineering Limited",
    mainContractor: "Weldlok NZ",
    details: {
      scope:
        "Structural steel installation and heavy-duty drilling for all primary main beam supports.",
      duration: "3 months",
    },
    keyHighlights: [
      "Sub-level structural reinforcement",
      "Complex overhead drilling into existing concrete",
      "Strict dust, noise, and vibration management within an enclosed subterranean space",
    ],
    gallery: [
      "/images/PaknSave Albany-Project 2.jpeg",
      "/images/PaknSave Albany-Project 3.jpeg",
      "/images/PaknSave Albany-Project 4.jpeg",
    ],
  },
  {
    id: "saint-ignatius-school",
    title: "Saint Ignatius School",
    description:
      "Structural steel installation and certified fabrication welding for a modern educational facility.",
    category: "commercial",
    categoryLabel: "Commercial",
    location: "Auckland",
    status: "completed",
    image: "/images/Saint-Ignatius-School-Project.jpeg",
    subcontractor: "Lieron Engineering Limited",
    mainContractor: "Weldlok NZ",
    details: {
      scope: "Structural steel installation and certified fabrication welding.",
      duration: "1 month",
    },
    keyHighlights: [
      "Modern educational infrastructure build",
      "Strict adherence to school-zone safety protocols",
      "Delivery of highly durable multi-level steel framework meeting modern New Zealand compliance codes",
    ],
    gallery: [],
  },
  {
    id: "papamoa-college",
    title: "Papamoa College, Tauranga",
    description:
      "Structural steel installation for the new administration office facility, completed in a rapid 72-hour window.",
    category: "commercial",
    categoryLabel: "Commercial",
    location: "Tauranga",
    status: "completed",
    image: "/images/Papamoa Collage-Project.png",
    subcontractor: "Lieron Engineering Limited",
    mainContractor: "Weldlok NZ",
    details: {
      scope:
        "Structural steel installation for the new administration office facility.",
      duration: "3 days",
    },
    keyHighlights: [
      "Extreme rapid-response execution",
      "Mobilization and complete structural framing handover achieved within a 72-hour window without compromising quality or safety",
    ],
    gallery: [],
  },
  {
    id: "life-church-north-shore",
    title: "Life Church North Shore",
    description:
      "Field-welding connection plates for precast concrete panels and structural steel installation.",
    category: "commercial",
    categoryLabel: "Commercial",
    location: "North Shore, Auckland",
    status: "completed",
    image: "/images/Life Church-Project.png",
    subcontractor: "Lieron Engineering Limited",
    mainContractor: "Weldlok NZ",
    details: {
      scope:
        "Field-welding connection plates for precast concrete panels and structural steel installation.",
      duration: "2 weeks",
    },
    keyHighlights: [
      "High-specification structural welding to secure heavy vertical precast panels",
      "Critical seismic tie-ins",
      "Seamless coordination with main contractor crane schedules",
    ],
    gallery: [],
  },

  // ── INDUSTRIAL ──────────────────────────────────────────────
  {
    id: "kopu-warehouse",
    title: "Kopu Warehouse",
    description:
      "Structural steel installation and extensive welding spanning both high-clearance warehouse and multi-use office sectors.",
    category: "industrial",
    categoryLabel: "Industrial",
    location: "Kopu",
    status: "completed",
    image: "/images/Kopu Warehouse-Project.jpeg",
    subcontractor: "Lieron Engineering Limited",
    mainContractor: "Weldlok NZ",
    details: {
      scope:
        "Structural steel installation and extensive welding spanning both high-clearance warehouse and multi-use office sectors.",
      duration: "1 month",
    },
    keyHighlights: [
      "Dual-zone industrial build",
      "Seamless structural integration between high-clearance clear-span portal frames and low-clearance office mezzanine structures",
    ],
    gallery: [],
  },

  // ── INFRASTRUCTURE ──────────────────────────────────────────
  {
    id: "auckland-airport-cargo-entrance",
    title: "Auckland Airport New Entrance for Cargo",
    description:
      "Structural steel installation for the primary cargo logistics entrance hub at Auckland Airport.",
    category: "infrastructure",
    categoryLabel: "Infrastructure",
    location: "Auckland Airport",
    status: "completed",
    image: "/images/Auckland Airport-Project.jpg",
    subcontractor: "Lieron Engineering Limited",
    mainContractor: "Weldlok NZ",
    details: {
      scope:
        "Structural steel installation for the primary cargo logistics entrance hub.",
      duration: "2 weeks",
    },
    keyHighlights: [
      "Critical national infrastructure deployment",
      "Rigorous airside/landside safety clearance compliance",
      "Strict logistical planning to minimize disruptions to high-volume airport logistics traffic",
    ],
    gallery: [
      "/images/Auckland Airport-Project 2.jpeg",
      "/images/Auckland Airport-Project 3.jpeg",
    ],
  },
];

export const PROJECT_CATEGORIES = [
  { value: "all", label: "All Projects" },
  { value: "commercial", label: "Commercial" },
  { value: "industrial", label: "Industrial" },
  { value: "infrastructure", label: "Infrastructure" },
] as const;
