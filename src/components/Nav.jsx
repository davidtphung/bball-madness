"use client";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const links = [
  { href: "/", label: "Live Scores", icon: "⚡" },
  { href: "/bracket", label: "Bracket", icon: "🏀" },
  { href: "/model", label: "Model", icon: "📊" },
  { href: "/history", label: "History", icon: "📈" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="mt-2 flex gap-1 overflow-x-auto scrollbar-hide" role="navigation" aria-label="Main navigation">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <a
            key={link.href}
            href={link.href}
            className={`relative flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "text-white"
                : "text-[var(--dim)] hover:text-[var(--text)] hover:bg-white/5"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            <span className="text-base" aria-hidden="true">{link.icon}</span>
            {link.label}
            {isActive && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute inset-0 rounded-lg bg-white/10 border border-white/10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </a>
        );
      })}
    </nav>
  );
}
