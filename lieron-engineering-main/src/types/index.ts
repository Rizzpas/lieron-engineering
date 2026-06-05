export interface NavLink {
  label: string;
  href: string;
}

export interface Service {
  number: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export interface Project {
  title: string;
  category: string;
  location?: string;
  year?: string;
  image: string;
  status: "ongoing" | "completed";
}

export interface Stat {
  label: string;
  value: string;
}

export interface ContactCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  contact: string;
  href: string;
}
