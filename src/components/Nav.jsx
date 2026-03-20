"use client";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const links = [
  { href: "/", label: "Live", fullLabel: "Live Scores", icon: "⚡" },
  { href: "/bracket", label: "Bracket", fullLabel: "Bracket", icon: "🏀" },
  { href: "/model", label: "Model", fullLabel: "Model", icon: "📊" },
  { href: "/history", label: "History", fullLabel: "History", icon: "📈" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav
      className="mt-1.5 md:mt-2 flex gap-0.5 overflow-x-auto scrollbar-hide -mx-1 px-1"
      role="navigation"
      aria-label="Main navigation"
    >
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <a
            key={link.href}
            href={link.href}
            className={`relative flex items-center gap-1 md:gap-1.5 whitespace-nowrap rounded-xl px-3 py-2 md:py-2.5 text-xs md:text-sm font-medium transition-all press-scale ${
              isActive
                ? "text-white"
                : "text-[var(--dim)] active:text-[var(--text)]"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            <span className="text-sm md:text-base" aria-hidden="true">{link.icon}</span>
            <span className="md:hidden">{link.label}</span>
            <span className="hidden md:inline">{link.fullLabel}</span>
            {isActive && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute inset-0 rounded-xl bg-white/[0.07] border border-white/[0.06]"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
          </a>
        );
      })}
    </nav>
  );
}
