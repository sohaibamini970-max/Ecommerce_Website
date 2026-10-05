"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/store/auth";

export default function RegisterForm() {
  const router = useRouter();
  const register = useAuth((s) => s.register);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [agree, setAgree] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const update = (k: keyof typeof form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!agree) {
      setError("Please accept the Terms & Privacy Policy to continue.");
      return;
    }

    setLoading(true);
    try {
      await register(form.fullName, form.email, form.password);
      router.push("/orders");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-full px-5 py-4 rounded-2xl bg-white/[0.03] border text-white placeholder-gray-500 focus:outline-none focus:bg-white/[0.06] focus:ring-4 focus:ring-amber-500/10 transition-all duration-200";

  const inputState =
    "border-white/10 hover:border-white/20 focus:border-amber-500";

  const labelBase =
    "block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2";

  // Simple password strength meter
  const strength = (() => {
    const p = form.password;
    let s = 0;
    if (p.length >= 6) s++;
    if (p.length >= 10) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return Math.min(s, 4); // 0..4
  })();

  const strengthLabels = ["Too short", "Weak", "Okay", "Good", "Strong"];
  const strengthColors = [
    "bg-white/10",
    "bg-red-500",
    "bg-amber-500",
    "bg-emerald-500",
    "bg-emerald-400",
  ];

  return (
    <div className="relative w-full max-w-md">
      {/* Ambient glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative bg-gradient-to-b from-zinc-900 to-black rounded-3xl border border-white/10 shadow-2xl shadow-black/50 p-8 md:p-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-12 h-[2px] bg-amber-500" />
            <span className="text-amber-400 text-xs font-medium tracking-[0.3em] uppercase">
              Join the Club
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight">
            Create <span className="italic text-amber-400">account</span>
          </h1>
          <p className="text-white/50 text-sm mt-3">
            Track orders, save favorites, unlock early access.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 px-4 py-3 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-start gap-3">
            <svg
              className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Full name */}
          <div>
            <label className={labelBase}>Full Name</label>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              placeholder="Jane Doe"
              autoComplete="name"
              className={`${inputBase} ${inputState}`}
            />
          </div>

          {/* Email */}
          <div>
            <label className={labelBase}>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="jane@example.com"
              autoComplete="email"
              className={`${inputBase} ${inputState}`}
            />
          </div>

          {/* Password */}
          <div>
            <label className={labelBase}>Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                placeholder="At least 6 characters"
                autoComplete="new-password"
                className={`${inputBase} ${inputState} pr-14`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-amber-400 transition"
              >
                {showPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                    <line x1="2" y1="2" x2="22" y2="22" />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            {/* Strength meter */}
            {form.password.length > 0 && (
              <div className="mt-3">
                <div className="flex gap-1.5 mb-2">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all ${
                        i < strength ? strengthColors[strength] : "bg-white/10"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-[11px] text-white/50">
                  Password strength:{" "}
                  <span className="text-white/80 font-medium">
                    {strengthLabels[strength]}
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Terms */}
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <span className="relative mt-0.5">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => {
                  setAgree(e.target.checked);
                  if (error) setError(null);
                }}
                className="peer sr-only"
              />
              <span className="block w-5 h-5 rounded-md border border-white/20 bg-white/[0.03] peer-checked:bg-amber-500 peer-checked:border-amber-500 transition" />
              <svg
                className="absolute inset-0 m-auto w-3 h-3 text-black opacity-0 peer-checked:opacity-100 transition pointer-events-none"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <span className="text-sm text-white/60 leading-relaxed">
              I agree to the{" "}
              <Link href="/terms" className="text-amber-400 hover:text-amber-300">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-amber-400 hover:text-amber-300">
                Privacy Policy
              </Link>
              .
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-full font-semibold flex items-center justify-center gap-3 transition-all ${
              loading
                ? "bg-white/10 text-gray-400 cursor-wait"
                : "bg-gradient-to-r from-amber-400 to-amber-500 text-black hover:from-amber-300 hover:to-amber-400 hover:scale-[1.02] shadow-lg shadow-amber-500/30"
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="w-5 h-5 animate-spin"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 12a9 9 0 1 1-6.22-8.56" />
                </svg>
                Creating account...
              </>
            ) : (
              <>
                Create Account
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Link to login */}
        <p className="text-center text-sm text-white/50 mt-8">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-amber-400 hover:text-amber-300 font-semibold transition"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}