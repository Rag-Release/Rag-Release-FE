import PrivacyPolicyContent from "@/components/privacy-policy/content";
import PrivacyPolicyFooter from "@/components/privacy-policy/footer";
import PrivacyPolicyHeader from "@/components/privacy-policy/header";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <PrivacyPolicyHeader />
        <PrivacyPolicyContent />
        <PrivacyPolicyFooter />
      </div>
    </div>
  );
}
