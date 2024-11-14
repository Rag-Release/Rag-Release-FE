"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  UserCheck,
  Database,
  FileCheck,
  Globe,
} from "lucide-react";
import { Card } from "@/components/card/Card";

const securityFeatures = [
  {
    icon: Shield,
    title: "Secure Publishing Platform",
    description:
      "Our publishing platform is built with enterprise-grade security to protect your manuscripts and intellectual property. We use end-to-end encryption for all file transfers and storage.",
  },
  {
    icon: Lock,
    title: "Multi-Factor Authentication",
    description:
      "Enhanced account security with two-factor authentication, ensuring only authorized users can access your publishing dashboard and manuscript files.",
  },
  {
    icon: UserCheck,
    title: "Identity Verification",
    description:
      "Robust author verification process to prevent unauthorized publications and protect copyright ownership of your work.",
  },
  {
    icon: Database,
    title: "Secure Data Storage",
    description:
      "Your manuscripts and personal data are stored in highly secure, encrypted databases with regular backups and disaster recovery protocols.",
  },
  {
    icon: FileCheck,
    title: "Digital Rights Management",
    description:
      "Advanced DRM protection for your e-books to prevent unauthorized distribution and protect your digital content.",
  },
  {
    icon: Globe,
    title: "Global Compliance",
    description:
      "We adhere to international security standards and data protection regulations, including GDPR, CCPA, and industry best practices.",
  },
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16 w-full">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Your Security is Our{" "}
            <span className="text-green-400">Top Priority</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            At Rag Release, we understand the importance of protecting your
            intellectual property. Our comprehensive security measures ensure
            your manuscripts and publishing journey are safeguarded at every
            step.
          </p>
        </motion.div>

        {/* Security Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="h-full">
                <div className="flex flex-col items-center text-center p-6">
                  <feature.icon className="w-12 h-12 text-green-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badges Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Card>
            <div className="p-8">
              <h2 className="text-3xl font-bold text-center mb-8">
                Industry-Leading Security Standards
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-green-400/10 rounded-full flex items-center justify-center">
                    <Shield className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="font-semibold">SSL Encryption</h3>
                  <p className="text-gray-300">
                    256-bit encryption for all data transfers
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-green-400/10 rounded-full flex items-center justify-center">
                    <Lock className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="font-semibold">Regular Security Audits</h3>
                  <p className="text-gray-300">
                    Continuous monitoring and testing
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-green-400/10 rounded-full flex items-center justify-center">
                    <Database className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="font-semibold">Secure Infrastructure</h3>
                  <p className="text-gray-300">
                    Enterprise-grade hosting and protection
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-16"
        >
          <Card>
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-4">
                Ready to Publish Securely?
              </h2>
              <p className="text-gray-300 mb-6">
                Join thousands of authors who trust Rag Release with their
                valuable manuscripts.
              </p>
              <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg transition-colors">
                Start Publishing Today
              </button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
