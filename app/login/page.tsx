import { Suspense } from "react";
import AuthLayout from "@/app/components/AuthLayout";
import LoginForm from "@/app/components/LoginForm";

export const metadata = {
  title: "Sign In — LUXE",
  description: "Sign in to your LUXE account.",
};

export default function LoginPage() {
  return (
    <AuthLayout
      eyebrow="Members Only"
      title="Style is a language."
      accent="Speak it well."
      subtitle="Sign in to access your orders, saved pieces, and early access to new collections."
      features={[
        "Track every order in real time",
        "Save favorites across devices",
        "Early access to seasonal drops",
      ]}
    >
      <Suspense fallback={<div className="text-white/40 text-sm">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
}