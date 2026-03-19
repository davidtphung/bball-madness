export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-12 py-8 px-4">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--dim)]">
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-[var(--text)]">THE PROCESS</span>
          <span>by NLT143 Analytics</span>
        </div>
        <div className="flex items-center gap-4">
          <span>March Madness 2026</span>
          <span className="text-[var(--border-light)]">|</span>
          <span>Data: ESPN</span>
          <span className="text-[var(--border-light)]">|</span>
          <span>
            Built by{" "}
            <a
              href="https://x.com/davidtphung"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--text)] hover:text-amber-400 transition-colors"
            >
              David T Phung
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
