import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "outline" | "dark" | "white" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  id?: string;
}

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  onClick,
  id,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2.5 font-semibold uppercase tracking-[0.15em] transition-all duration-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-dark cursor-pointer";

  const sizes = {
    sm: "px-5 py-2.5 text-[10px]",
    md: "px-8 py-4 text-[11px]",
    lg: "px-10 py-5 text-xs",
  };

  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary-hover shadow-[0_1px_2px_rgba(0,0,0,0.05),0_4px_16px_rgba(234,88,12,0.25)] hover:shadow-[0_1px_2px_rgba(0,0,0,0.05),0_8px_32px_rgba(234,88,12,0.35)] hover:-translate-y-0.5",
    outline:
      "border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:border-gray-900 dark:hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:-translate-y-0.5",
    dark: "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5",
    white:
      "bg-white text-gray-900 hover:bg-gray-50 shadow-sm hover:shadow-lg hover:-translate-y-0.5",
    ghost:
      "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5",
  };

  const styles = `${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles} id={id}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={styles} onClick={onClick} id={id}>
      {children}
    </button>
  );
}
