import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";

export default function FooterBanner() {
  return (
    <div className="bg-primary min-h-[3.5rem] py-4 flex flex-wrap items-center justify-center gap-4 sm:gap-10 text-white text-[10px] sm:text-xs uppercase font-medium tracking-widest px-4">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="hover:font-black px-2 hidden md:block transition-all duration-200"
        >
          {link.label}
        </Link>
      ))}
      <span className="md:hidden text-[10px] font-bold">
        Lieron Engineering Limited
      </span>
    </div>
  );
}
