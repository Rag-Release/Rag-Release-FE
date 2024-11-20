import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicyHeader() {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">
          Rag Release Privacy Policy
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 text-center">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <p className="mt-4 text-gray-300">
          At Rag Release, we are committed to protecting your privacy and
          ensuring the security of your personal information. This Privacy
          Policy outlines how we collect, use, disclose, and safeguard your data
          when you use our book publishing and distribution services.
        </p>
      </CardContent>
    </Card>
  );
}
