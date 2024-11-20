import React from "react";
import {
  Card as UICard,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function LightCard({ title, children, className = "" }: CardProps) {
  return (
    <UICard className={`bg-gray-800 border-gray-700 ${className}`}>
      {title && (
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-white">
            {title}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </UICard>
  );
}
