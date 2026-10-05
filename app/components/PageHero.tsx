import Link from "next/link";

interface PageHeroProps {
  eyebrow: string;             // small text above heading, e.g. "Explore"
  title: string;               // main heading
  accent?: string;             // italic amber word inside the heading
  subtitle: string;            // description paragraph
  image: string;               // background image URL
  breadcrumb?: string;         // last crumb, e.g. "Collections"
  height?: "tall" | "medium";  // 80vh or 60vh
  children?: React.ReactNode;  // optional extra content (e.g. stats)
}

export default function PageHero({
  eyebrow,
  title,
  accent,
  subtitle,
  image,
  breadcrumb,
  height = "medium",
  children,
}: PageHeroProps) {
  const minH = height === "tall" ? "min-h-[80vh]" : "min-h-[60vh]";

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center animate-slow-zoom"
        style={{ backgroundImage: `url('${image}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      {/* Content */}
      <div className={`relative z-10 ${minH} flex flex-col justify-end`}>
        <div className="max-w-7xl mx-auto w-full px-6 pb-16 md:pb-24 pt-40">
          <div className="max-w-3xl">
            {/* Breadcrumb (optional) */}
            {breadcrumb && (
              <div className="flex items-center gap-3 mb-6 animate-fade-up">
                <Link
                  href="/"
                  className="text-white/60 hover:text-white text-xs tracking-[0.3em] uppercase transition-colors"
                >
                  Home
                </Link>
                <span className="text-white/30 text-xs">/</span>
                <span className="text-amber-400 text-xs tracking-[0.3em] uppercase">
                  {breadcrumb}
                </span>
              </div>
            )}

            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5 animate-fade-up delay-200">
              <span className="w-12 h-[2px] bg-amber-500" />
              <span className="text-amber-400 text-sm font-medium tracking-[0.3em] uppercase">
                {eyebrow}
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-6 animate-fade-up delay-400">
              {title}
              {accent && (
                <>
                  {" "}
                  <span className="italic bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                    {accent}
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-white/75 text-lg md:text-xl max-w-xl leading-relaxed animate-fade-up delay-600">
              {subtitle}
            </p>

            {/* Optional extra content */}
            {children && (
              <div className="mt-10 animate-fade-up delay-800">{children}</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}