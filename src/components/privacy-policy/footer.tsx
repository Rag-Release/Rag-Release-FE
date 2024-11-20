import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function PrivacyPolicyFooter() {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-6 text-gray-300 space-y-4">
        <h3 className="text-xl font-semibold text-white">Contact Us</h3>
        <p>
          If you have any questions or concerns about our Privacy Policy or data
          practices, please contact us at:
        </p>
        <p>
          Rag Release
          <br />
          123 Publishing Lane
          <br />
          Booktown, BT 12345
          <br />
          Email: privacy@ragrelease.com
          <br />
          Phone: (555) 123-4567
        </p>
        <p>
          We reserve the right to update this Privacy Policy at any time. We
          will notify you of any changes by posting the new Privacy Policy on
          this page and updating the "Last updated" date at the top of this
          policy.
        </p>
      </CardContent>
    </Card>
  );
}
