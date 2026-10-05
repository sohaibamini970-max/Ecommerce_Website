import Link from "next/link";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  /** Eyebrow text on the left panel (e.g. "Members Only") */
  eyebrow: string;
  /** Big serif heading on the left panel */
  title: string;
  /** Italic amber accent (last line of the heading) */
  accent: string;
  /** Subtitle paragraph on the left */
  subtitle: string;
  /** Feature bullets below the subtitle */
  features: string[];
  /** The form (right side) */
  children: ReactNode;
}

export default function AuthLayout({
  eyebrow,
  title,
  accent,
  subtitle,
  features,
  children,
}: AuthLayoutProps) {
  return (
    <main className="min-h-screen flex overflow-hidden">
      {/* LEFT — Dark editorial panel (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-black overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center animate-slow-zoom"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2070&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

        {/* Amber glow */}
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-[120px] pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full">
          <Link
            href="/"
            className="font-display text-2xl md:text-3xl font-bold tracking-tight text-white self-start"
          >
            LUXE<span className="text-amber-500">.</span>
          </Link>

          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[2px] bg-amber-500" />
              <span className="text-amber-400 text-xs font-medium tracking-[0.3em] uppercase">
                {eyebrow}
              </span>
            </div>

            <h2 className="font-display text-4xl xl:text-5xl font-bold text-white leading-[1.15] mb-6">
              {title}
              <br />
              <span className="italic bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                {accent}
              </span>
            </h2>

            <p className="text-white/60 text-lg leading-relaxed">{subtitle}</p>

            <ul className="mt-10 space-y-4">
              {features.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-3 text-white/70 text-sm"
                >
                  <span className="w-6 h-6 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-amber-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-white/40 text-xs tracking-widest uppercase">
            © 2025 LUXE — Premium Fashion
          </p>
        </div>
      </div>

      {/* RIGHT — Form panel */}
      <div className="w-full lg:w-1/2 relative bg-black flex items-center justify-center p-6 py-24 lg:py-16">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Mobile logo */}
        <Link
          href="/"
          className="lg:hidden absolute top-8 left-6 font-display text-2xl font-bold text-white"
        >
          LUXE<span className="text-amber-500">.</span>
        </Link>

        <div className="relative w-full flex justify-center">{children}</div>
      </div>
    </main>
  );
}