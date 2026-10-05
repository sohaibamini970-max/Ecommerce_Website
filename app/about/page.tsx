import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import PageHero from "@/app/components/PageHero";

export const metadata = {
    title: "About — LUXE",
    description:
        "The story behind LUXE — a modern fashion house built on craft, sustainability, and timeless design.",
};

const stats = [
    { num: "2018", label: "Founded" },
    { num: "50K+", label: "Customers" },
    { num: "45", label: "Countries" },
    { num: "100%", label: "Sustainable" },
];

const milestones = [
    {
        year: "2018",
        title: "The First Stitch",
        description:
            "LUXE was born in a small SoHo studio with 12 hand-picked pieces and a simple belief: quality over quantity.",
    },
    {
        year: "2020",
        title: "Going Global",
        description:
            "We shipped to 20+ countries, partnered with artisan mills in Italy, and crossed 10,000 happy customers.",
    },
    {
        year: "2022",
        title: "Sustainable by Design",
        description:
            "Every material sourced became certified organic, recycled, or responsibly produced. No compromises.",
    },
    {
        year: "2024",
        title: "The LUXE Atelier",
        description:
            "We opened our flagship in New York — a space that celebrates craft, community, and slow fashion.",
    },
];

const values = [
    {
        icon: "🌿",
        title: "Sustainability First",
        description:
            "Every material we use is traceable, certified, and better for the planet. Always.",
    },
    {
        icon: "✋",
        title: "Crafted by Hand",
        description:
            "Our pieces are made in small batches by skilled artisans who care about every stitch.",
    },
    {
        icon: "♾️",
        title: "Built to Last",
        description:
            "Timeless design, premium materials, timeless pieces. We build for decades, not seasons.",
    },
    {
        icon: "🤝",
        title: "Fair & Transparent",
        description:
            "Fair wages, ethical sourcing, and radical transparency from thread to doorstep.",
    },
];

const team = [
    {
        initials: "AM",
        name: "Amelia Moreau",
        role: "Founder & Creative Director",
        bio: "20 years in luxury fashion, ex-Céline and Loewe.",
        accent: "from-amber-400 to-amber-600",
    },
    {
        initials: "RK",
        name: "Ravi Kapoor",
        role: "Head of Design",
        bio: "Architectural silhouettes, obsessive about fabric.",
        accent: "from-rose-400 to-rose-600",
    },
    {
        initials: "SL",
        name: "Sofia Lindqvist",
        role: "Sustainability Lead",
        bio: "Textile engineer turned ethical sourcing advocate.",
        accent: "from-emerald-400 to-emerald-600",
    },
    {
        initials: "JT",
        name: "James Tanaka",
        role: "Master Tailor",
        bio: "Third-generation tailor, trained in Milan.",
        accent: "from-indigo-400 to-indigo-600",
    },
];

export default function AboutPage() {
    return (
        <main className="overflow-x-hidden">
            <Navbar />

            {/* Hero */}
            <PageHero
                eyebrow="Our Story"
                title="Crafted with"
                accent="Intention"
                subtitle="LUXE is a modern fashion house built on craft, sustainability, and the belief that great design should outlive trends."
                image="https://images.unsplash.com/photo-1590735213920-68192a487bc2?auto=format&fit=crop&w=2070&q=80"
                breadcrumb="About"
                height="tall"
            >
                <div className="flex gap-10">
                    <div>
                        <div className="font-display text-3xl font-bold text-white">7</div>
                        <div className="text-white/50 text-xs tracking-widest uppercase mt-1">
                            Years
                        </div>
                    </div>
                    <div>
                        <div className="font-display text-3xl font-bold text-white">
                            50K+
                        </div>
                        <div className="text-white/50 text-xs tracking-widest uppercase mt-1">
                            Customers
                        </div>
                    </div>
                    <div>
                        <div className="font-display text-3xl font-bold text-white">
                            100%
                        </div>
                        <div className="text-white/50 text-xs tracking-widest uppercase mt-1">
                            Sustainable
                        </div>
                    </div>
                </div>
            </PageHero>

            {/* Mission Statement */}
            <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <span className="w-12 h-[2px] bg-amber-500" />
                        <span className="text-amber-600 text-sm font-medium tracking-[0.3em] uppercase">
                            Our Mission
                        </span>
                        <span className="w-12 h-[2px] bg-amber-500" />
                    </div>

                    <p className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.15]">
                        We make{" "}
                        <span className="italic bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
                            fewer, better things
                        </span>{" "}
                        — pieces that last decades, not seasons.
                    </p>

                    <p className="text-gray-500 text-lg md:text-xl mt-10 max-w-2xl mx-auto leading-relaxed">
                        Every LUXE garment is a promise: responsibly made, beautifully
                        crafted, and designed to be worn for years.
                    </p>
                </div>
            </section>

            {/* Stats Band */}
            <section className="py-20 px-6 bg-black relative overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="font-display text-4xl md:text-6xl font-bold text-amber-400 mb-2">
                                    {stat.num}
                                </div>
                                <div className="text-white/50 text-xs tracking-[0.3em] uppercase">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <span className="w-12 h-[2px] bg-amber-500" />
                            <span className="text-amber-600 text-sm font-medium tracking-[0.3em] uppercase">
                                The Journey
                            </span>
                            <span className="w-12 h-[2px] bg-amber-500" />
                        </div>
                        <h2 className="font-display text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                            Milestones along the{" "}
                            <span className="italic">way</span>
                        </h2>
                    </div>

                    <div className="relative">
                        {/* Vertical line */}
                        <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-2 bottom-2 w-[2px] bg-gradient-to-b from-amber-400 via-amber-300 to-transparent" />

                        <div className="space-y-12">
                            {milestones.map((m, i) => (
                                <div
                                    key={m.year}
                                    className={`relative flex flex-col md:flex-row gap-6 md:gap-12 items-start ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                        }`}
                                >
                                    {/* Content */}
                                    <div
                                        className={`flex-1 pl-20 md:pl-0 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"
                                            }`}
                                    >
                                        <div className="inline-block px-3 py-1 bg-amber-500/10 text-amber-700 text-xs font-bold tracking-widest rounded-full mb-3">
                                            {m.year}
                                        </div>
                                        <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                                            {m.title}
                                        </h3>
                                        <p className="text-gray-500 leading-relaxed max-w-md inline-block">
                                            {m.description}
                                        </p>
                                    </div>

                                    {/* Dot */}
                                    <div className="absolute left-6 md:static md:left-auto -translate-x-1/2 md:translate-x-0 md:flex md:justify-center">
                                        <div className="relative w-4 h-4 md:w-5 md:h-5 rounded-full bg-amber-500 ring-4 ring-amber-100 md:ring-8">
                                            <div className="absolute inset-0 rounded-full bg-amber-500 animate-ping opacity-40" />
                                        </div>
                                    </div>

                                    {/* Spacer */}
                                    <div className="hidden md:block flex-1" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <span className="w-12 h-[2px] bg-amber-500" />
                            <span className="text-amber-600 text-sm font-medium tracking-[0.3em] uppercase">
                                What We Stand For
                            </span>
                            <span className="w-12 h-[2px] bg-amber-500" />
                        </div>
                        <h2 className="font-display text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                            Values that{" "}
                            <span className="italic">guide us</span>
                        </h2>
                        <p className="text-gray-500 mt-4 max-w-lg mx-auto">
                            Four principles that shape every decision we make — from the
                            fabrics we choose to the partners we work with.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value) => (
                            <div
                                key={value.title}
                                className="group relative bg-white rounded-3xl p-8 border border-gray-100 hover:border-amber-400/40 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1 transition-all duration-500"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                                    {value.icon}
                                </div>
                                <h3 className="font-display text-xl font-bold text-gray-900 mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    {value.description}
                                </p>

                                {/* Corner accent */}
                                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-400/0 to-amber-400/0 group-hover:from-amber-400/10 group-hover:to-transparent rounded-tr-3xl rounded-bl-full transition-all duration-500" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <span className="w-12 h-[2px] bg-amber-500" />
                            <span className="text-amber-600 text-sm font-medium tracking-[0.3em] uppercase">
                                The People
                            </span>
                            <span className="w-12 h-[2px] bg-amber-500" />
                        </div>
                        <h2 className="font-display text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                            Behind <span className="italic">LUXE</span>
                        </h2>
                        <p className="text-gray-500 mt-4 max-w-lg mx-auto">
                            A small team with big intentions — designers, tailors, and
                            sustainability obsessives.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {team.map((member) => (
                            <div
                                key={member.name}
                                className="group relative bg-white rounded-3xl p-8 border border-gray-100 hover:border-gray-900/10 hover:shadow-2xl hover:shadow-black/5 hover:-translate-y-1 transition-all duration-500 text-center"
                            >
                                {/* Avatar */}
                                <div
                                    className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br ${member.accent} flex items-center justify-center text-white font-display text-2xl font-bold shadow-lg group-hover:scale-105 transition-transform duration-500`}
                                >
                                    {member.initials}
                                </div>

                                <h3 className="font-display text-xl font-bold text-gray-900 mb-1">
                                    {member.name}
                                </h3>
                                <div className="text-amber-600 text-xs font-medium tracking-widest uppercase mb-4">
                                    {member.role}
                                </div>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    {member.bio}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 bg-black relative overflow-hidden">
                <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative max-w-3xl mx-auto text-center">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <span className="w-12 h-[2px] bg-amber-500" />
                        <span className="text-amber-400 text-sm font-medium tracking-[0.3em] uppercase">
                            Join the Movement
                        </span>
                        <span className="w-12 h-[2px] bg-amber-500" />
                    </div>

                    <h2 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
                        Wear less,{" "}
                        <span className="italic text-amber-400">choose better</span>
                    </h2>

                    <p className="text-white/60 mb-10 max-w-xl mx-auto">
                        Every LUXE purchase supports ethical artisans, sustainable mills,
                        and a slower, more intentional way to dress.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <a
                            href="/shop"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-amber-500 text-black font-semibold rounded-full hover:bg-amber-400 transition-all hover:scale-105 shadow-2xl shadow-amber-500/30"
                        >
                            Shop the Collection
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                viewBox="0 0 24 24"
                            >
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </a>
                        <a
                            href="/contact"
                            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/40 transition-all"
                        >
                            Get in Touch
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}