import AuthLayout from "@/app/components/AuthLayout";
import RegisterForm from "@/app/components/RegisterForm";

export const metadata = {
    title: "Create Account — LUXE",
    description: "Join LUXE and unlock member benefits.",
};

export default function RegisterPage() {
    return (
        <AuthLayout
            eyebrow="Join the Club"
            title="A wardrobe begins"
            accent="with a choice."
            subtitle="Create your free account and start building a collection that lasts."
            features={[
                "Free returns for 30 days",
                "Birthday rewards every year",
                "First access to sales & drops",
            ]}
        >
            <RegisterForm />
        </AuthLayout>
    );
}