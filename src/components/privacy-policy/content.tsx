import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PrivacyPolicyContent() {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-6">
        <Tabs defaultValue="collection">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="collection">Data Collection</TabsTrigger>
            <TabsTrigger value="use">Data Use</TabsTrigger>
            <TabsTrigger value="sharing">Data Sharing</TabsTrigger>
            <TabsTrigger value="rights">Your Rights</TabsTrigger>
          </TabsList>
          <TabsContent
            value="collection"
            className="mt-6 text-gray-300 space-y-4"
          >
            <h3 className="text-xl font-semibold text-white">
              Information We Collect
            </h3>
            <p>We collect information you provide directly to us, such as:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal details (name, email address, postal address)</li>
              <li>Account information (username, password)</li>
              <li>
                Payment information (credit card details, billing address)
              </li>
              <li>Manuscript and book details</li>
              <li>Communication preferences</li>
            </ul>
            <p>
              We also automatically collect certain information when you use our
              services, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Device information (IP address, browser type, operating system)
              </li>
              <li>Usage data (pages visited, time spent on the site)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </TabsContent>
          <TabsContent value="use" className="mt-6 text-gray-300 space-y-4">
            <h3 className="text-xl font-semibold text-white">
              How We Use Your Information
            </h3>
            <p>
              We use the collected information for various purposes, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Providing and improving our publishing services</li>
              <li>Processing payments and managing your account</li>
              <li>Communicating with you about your books and our services</li>
              <li>Analyzing usage patterns to enhance user experience</li>
              <li>Complying with legal obligations</li>
              <li>Marketing and promotional activities (with your consent)</li>
            </ul>
          </TabsContent>
          <TabsContent value="sharing" className="mt-6 text-gray-300 space-y-4">
            <h3 className="text-xl font-semibold text-white">
              Information Sharing and Disclosure
            </h3>
            <p>We may share your information with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Service providers (e.g., payment processors, cloud storage
                providers)
              </li>
              <li>
                Distributors and retailers (for book distribution purposes)
              </li>
              <li>Legal authorities when required by law</li>
              <li>Business partners (with your explicit consent)</li>
            </ul>
            <p>We do not sell your personal information to third parties.</p>
          </TabsContent>
          <TabsContent value="rights" className="mt-6 text-gray-300 space-y-4">
            <h3 className="text-xl font-semibold text-white">
              Your Rights and Choices
            </h3>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access and update your personal information</li>
              <li>
                Request deletion of your data (subject to legal requirements)
              </li>
              <li>Object to processing of your information</li>
              <li>Withdraw consent for marketing communications</li>
              <li>Request a copy of your data in a portable format</li>
            </ul>
            <p>
              To exercise these rights, please contact us at
              privacy@ragrelease.com.
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
