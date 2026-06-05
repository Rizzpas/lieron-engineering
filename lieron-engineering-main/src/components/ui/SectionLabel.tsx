interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "badge" | "dark";
}

export default function SectionLabel({
  children,
  className = "",
  variant = "default",
}: SectionLabelProps) {
  const variants = {
    default: "text-primary font-semibold text-[11px] uppercase tracking-[0.2em]",
    badge:
      "inline-flex items-center gap-2.5 bg-primary/5 dark:bg-primary/10 border border-primary/10 dark:border-primary/20 rounded-full px-4 py-1.5 text-primary font-semibold text-[11px] uppercase tracking-[0.15em]",
    dark: "text-primary font-semibold text-[11px] uppercase tracking-[0.2em]",
  };

  return (
    <span className={`block mb-4 ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
