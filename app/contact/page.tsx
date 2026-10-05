import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import PageHero from "@/app/components/PageHero";
import ContactForm from "@/app/components/ContactForm";

export const metadata = {
  title: "Contact — LUXE",
  description: "Get in touch with the LUXE team — we're here to help.",
};

const contactInfo = [
  {
    icon: "✉️",
    label: "Email Us",
    value: "hello@luxe-store.com",
    sub: "We reply within 24 hours",
    href: "mailto:hello@luxe-store.com",
    theme: "amber",
  },
  {
    icon: "📞",
    label: "Call Us",
    value: "+1 (555) 123-4567",
    sub: "Mon–Fri, 9am–6pm EST",
    href: "tel:+15551234567",
    theme: "emerald",
  },
  {
    icon: "📍",
    label: "Visit Us",
    value: "124 Greene St, SoHo",
    sub: "New York, NY 10012",
    href: "#",
    theme: "violet",
  },
] as const;

const faqs = [
  {
    q: "How long does shipping take?",
    a: "Standard shipping is 3–5 business days. Express is 1–2 days. Free shipping on orders over $100.",
  },
  {
    q: "What is your return policy?",
    a: "We offer free returns within 30 days of delivery, no questions asked. Items must be unworn with tags attached.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes — we ship to 45+ countries. International delivery takes 7–14 business days.",
  },
  {
    q: "Can I change or cancel my order?",
    a: "Absolutely. Contact us within 2 hours of ordering and we'll update or cancel it for you.",
  },
];

export default function ContactPage() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <PageHero
        eyebrow="Get in Touch"
        title="We'd Love to"
        accent="Hear From You"
        subtitle="Questions about sizing? An order? Or just want to say hi — our team is here for you."
        image="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2070&q=80"
        breadcrumb="Contact"
        height="medium"
      />

      {/* Contact info cards — amber / emerald / violet */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`group relative overflow-hidden rounded-3xl p-8 text-white shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                  item.theme === "amber"
                    ? "bg-gradient-to-br from-amber-500 via-amber-600 to-orange-700 shadow-amber-500/30 hover:shadow-amber-500/50"
                    : item.theme === "emerald"
                    ? "bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-800 shadow-emerald-500/30 hover:shadow-emerald-500/50"
                    : "bg-gradient-to-br from-violet-600 via-indigo-700 to-slate-900 shadow-violet-500/30 hover:shadow-violet-500/50"
                }`}
              >
                {/* Ambient white glow */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/20 rounded-full blur-3xl pointer-events-none" />
                {/* Dark depth */}
                <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-black/20 rounded-full blur-3xl pointer-events-none" />

                {/* Dot grid texture */}
                <div
                  className="absolute inset-0 opacity-[0.08] pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, white 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                  }}
                />

                <div className="relative">
                  {/* Icon tile */}
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 bg-white/20 backdrop-blur-sm border border-white/20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    {item.icon}
                  </div>

                  {/* Label */}
                  <div className="text-[11px] text-white/80 tracking-[0.3em] uppercase font-semibold mb-3">
                    {item.label}
                  </div>

                  {/* Value */}
                  <div className="font-display text-2xl font-bold mb-2 leading-tight">
                    {item.value}
                  </div>

                  {/* Sub */}
                  <div className="text-white/70 text-sm">{item.sub}</div>

                  {/* Hover CTA */}
                  <div className="mt-6 flex items-center gap-2 text-white/90 text-xs font-semibold tracking-widest uppercase opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-500">
                    Reach out
                    <svg
                      className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Corner ring accent */}
                <div className="absolute top-0 right-0 w-32 h-32 border border-white/10 rounded-bl-[100px] pointer-events-none" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Sidebar */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-12">
          {/* Left: Form */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-12 h-[2px] bg-amber-500" />
              <span className="text-amber-600 text-sm font-medium tracking-[0.3em] uppercase">
                Send a Message
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Drop us a <span className="italic">line</span>
            </h2>
            <p className="text-gray-500 mb-10 max-w-lg">
              Fill out the form and our team will get back to you within one
              business day.
            </p>

            <ContactForm />
          </div>

          {/* Right: Sidebar */}
          <aside className="lg:col-span-2 space-y-8">
            {/* Store Hours */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 text-white">
              <div className="text-xs text-amber-400 tracking-[0.3em] uppercase font-medium mb-4">
                Store Hours
              </div>
              <h3 className="font-display text-2xl font-bold mb-6">
                Come say hello
              </h3>
              <ul className="space-y-3 text-sm">
                {[
                  { day: "Monday – Friday", time: "9:00 AM – 8:00 PM" },
                  { day: "Saturday", time: "10:00 AM – 6:00 PM" },
                  { day: "Sunday", time: "12:00 PM – 5:00 PM" },
                ].map((h) => (
                  <li
                    key={h.day}
                    className="flex items-center justify-between py-2 border-b border-white/10 last:border-0"
                  >
                    <span className="text-white/70">{h.day}</span>
                    <span className="font-medium">{h.time}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-2 text-sm text-white/60">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Open now
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
              <div className="text-xs text-amber-600 tracking-[0.3em] uppercase font-medium mb-4">
                Quick Answers
              </div>
              <h3 className="font-display text-2xl font-bold text-gray-900 mb-6">
                Common questions
              </h3>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <details
                    key={faq.q}
                    className="group border-b border-gray-200 last:border-0 pb-4 last:pb-0"
                  >
                    <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                      <span className="text-sm font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
                        {faq.q}
                      </span>
                      <span className="text-gray-400 group-open:rotate-45 transition-transform text-lg leading-none mt-0.5">
                        +
                      </span>
                    </summary>
                    <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Map band */}
      <section className="relative h-[400px] w-full overflow-hidden bg-gray-100">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=2070&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 max-w-md shadow-2xl">
            <div className="text-xs text-amber-600 tracking-[0.3em] uppercase font-medium mb-3">
              Our Flagship
            </div>
            <h3 className="font-display text-3xl font-bold text-gray-900 mb-3">
              124 Greene Street
            </h3>
            <p className="text-gray-500 mb-6">
              SoHo, New York, NY 10012
              <br />
              Between Prince & Spring St
            </p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-900 font-semibold border-b-2 border-gray-900 pb-1 hover:border-amber-500 hover:text-amber-600 transition-all"
            >
              Get Directions
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
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}