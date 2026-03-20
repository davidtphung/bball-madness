export default function Footer() {
  return (
    <footer className="border-t border-white/[0.03] mt-12 safe-bottom">
      <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
        <div className="flex flex-col items-center gap-3 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center text-[7px] font-mono font-black text-white">
              TP
            </div>
            <span className="font-display text-sm font-bold text-[var(--text)]">THE PROCESS</span>
            <span className="text-[10px] text-[var(--dim)]">by NLT143</span>
          </div>
          <div className="flex items-center gap-3 text-[10px] md:text-xs text-[var(--dim)]">
            <span>March Madness 2026</span>
            <span className="text-white/[0.08]">·</span>
            <span>Data: ESPN</span>
            <span className="text-white/[0.08]">·</span>
            <span>
              Built by{" "}
              <a
                href="https://x.com/davidtphung"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[var(--text)] hover:text-amber-400 active:text-amber-400 transition-colors underline decoration-white/10 underline-offset-2 hover:decoration-amber-400/30"
              >
                David T Phung
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
