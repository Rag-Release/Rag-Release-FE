"use client";

import {
  BadgeCheck,
  Building2,
  CreditCard,
  FileText,
  GraduationCap,
  Loader2,
  Star,
  Upload,
} from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function Component() {
  const [activeTab, setActiveTab] = useState("upgrade");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | undefined
  >(undefined);

  const plans = [
    {
      id: "author",
      title: "Author",
      price: "$99/year",
      description: "Perfect for writers looking to publish their work",
      features: [
        "Publish up to 5 books per year",
        "Author profile page",
        "Sales analytics",
        "Marketing tools",
        "Direct reader engagement",
      ],
    },
    {
      id: "publisher",
      title: "Publisher",
      price: "$299/year",
      description: "Ideal for publishing houses and agencies",
      features: [
        "Unlimited book publications",
        "Multiple author management",
        "Advanced analytics",
        "Priority review process",
        "Bulk upload tools",
      ],
    },
    {
      id: "educator",
      title: "Educator",
      price: "$199/year",
      description: "Designed for educational institutions",
      features: [
        "Educational content publishing",
        "Student access management",
        "Course material organization",
        "Interactive learning tools",
        "Institution branding",
      ],
    },
  ];

  const requests = [
    {
      id: "REQ123",
      type: "Author Account",
      status: "Under Review",
      submittedDate: "2024-01-15",
      lastUpdate: "2024-01-16",
      documents: 3,
    },
    {
      id: "REQ122",
      type: "Publisher Account",
      status: "Additional Info Required",
      submittedDate: "2024-01-10",
      lastUpdate: "2024-01-14",
      documents: 5,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setActiveTab("requests");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <main className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Account Upgrade</h1>
          <p className="mt-2 text-gray-400">
            Upgrade your account to unlock more features and possibilities
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          <TabsList className="bg-gray-900">
            <TabsTrigger value="upgrade">Upgrade Options</TabsTrigger>
            <TabsTrigger value="requests">Your Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="upgrade" className="space-y-8">
            <div className="grid gap-6 md:grid-cols-3 ">
              {plans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`bg-gray-900 text-white ${
                    selectedPlan === plan.id ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {plan.id === "author" && <FileText className="h-5 w-5" />}
                      {plan.id === "publisher" && (
                        <Building2 className="h-5 w-5" />
                      )}
                      {plan.id === "educator" && (
                        <GraduationCap className="h-5 w-5" />
                      )}
                      {plan.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-2xl font-bold">{plan.price}</div>
                    <ul className="space-y-2 text-sm">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <BadgeCheck className="h-4 w-4 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className={`w-full ${
                        selectedPlan === plan.id
                          ? "bg-green-400 text-white"
                          : "text-gray-900 hover:bg-green-400"
                      } active:bg-green-500`}
                      variant={selectedPlan === plan.id ? "default" : "outline"}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {selectedPlan && (
              <form
                onSubmit={handleSubmit}
                className="space-y-8 rounded-lg border border-gray-800 bg-gray-900 p-6"
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      defaultValue="ifham"
                      className="bg-gray-800"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      defaultValue="Mohamed"
                      className="bg-gray-800"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="ifham.info@gmail.com"
                      className="bg-gray-800"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Mobile No</Label>
                    <Input
                      id="phone"
                      type="tel"
                      defaultValue="+94705323399"
                      className="bg-gray-800"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nic">NIC</Label>
                    <Input
                      id="nic"
                      defaultValue="200133202061"
                      className="bg-gray-800"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userId">User ID</Label>
                    <Input
                      id="userId"
                      defaultValue="SBED123"
                      className="bg-gray-800"
                      required
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Additional Information
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="organization">
                      Organization Name (if applicable)
                    </Label>
                    <Input id="organization" className="bg-gray-800" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Publishing Experience</Label>
                    <Select>
                      <SelectTrigger className="bg-gray-800">
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">
                          Beginner (0-2 years)
                        </SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate (2-5 years)
                        </SelectItem>
                        <SelectItem value="advanced">
                          Advanced (5+ years)
                        </SelectItem>
                        <SelectItem value="professional">
                          Professional Publisher
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="purpose">Purpose of Upgrade</Label>
                    <Textarea
                      id="purpose"
                      className="bg-gray-800"
                      placeholder="Please describe why you're requesting this upgrade..."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Required Documents</Label>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-lg border border-dashed border-gray-800 p-4">
                        <div className="flex flex-col items-center gap-2">
                          <Upload className="h-8 w-8 text-gray-400" />
                          <div className="text-sm font-medium">
                            Upload ID Verification
                          </div>
                          <div className="text-xs text-gray-400">
                            PDF, JPG, or PNG (max 5MB)
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border border-dashed border-gray-800 p-4">
                        <div className="flex flex-col items-center gap-2">
                          <Upload className="h-8 w-8 text-gray-400" />
                          <div className="text-sm font-medium">
                            Professional Credentials
                          </div>
                          <div className="text-xs text-gray-400">
                            PDF, JPG, or PNG (max 5MB)
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Payment Information</h3>
                  <RadioGroup
                    value={selectedPaymentMethod}
                    onValueChange={setSelectedPaymentMethod}
                    className="grid gap-4 md:grid-cols-3"
                  >
                    <Label
                      htmlFor="card"
                      className={`flex cursor-pointer items-center justify-between rounded-lg border border-gray-800 p-4 transition duration-300 
                  ${
                    selectedPaymentMethod === "card"
                      ? "bg-green-400 border-green-600 shadow-lg"
                      : ""
                  }`}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="card" id="card" />
                        <CreditCard className="h-5 w-5" />
                        <div>Credit Card</div>
                      </div>
                    </Label>
                    <Label
                      htmlFor="paypal"
                      className={`flex cursor-pointer items-center justify-between rounded-lg border border-gray-800 p-4 transition duration-300 
                  ${
                    selectedPaymentMethod === "paypal"
                      ? "bg-green-400 border-green-600 shadow-lg"
                      : ""
                  }`}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Star className="h-5 w-5" />
                        <div>PayPal</div>
                      </div>
                    </Label>

                    <Label
                      htmlFor="bank"
                      className={`flex cursor-pointer items-center justify-between rounded-lg border border-gray-800 p-4 transition duration-300 
                  ${
                    selectedPaymentMethod === "bank"
                      ? "bg-green-400 border-green-600 shadow-lg"
                      : ""
                  }`}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="bank" id="bank" />
                        <Building2 className="h-5 w-5" />
                        <div>Bank Transfer</div>
                      </div>
                    </Label>
                  </RadioGroup>
                </div>

                <div className="flex justify-end gap-4">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setSelectedPlan(null)}
                    className="border-gray-400 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-green-500 text-white hover:bg-green-700"
                  >
                    {isSubmitting && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Submit Upgrade Request
                  </Button>
                </div>
              </form>
            )}
          </TabsContent>

          <TabsContent value="requests">
            <Card className="bg-gray-900 text-white">
              <CardHeader>
                <CardTitle>Your Upgrade Requests</CardTitle>
                <CardDescription>
                  Track the status of your account upgrade requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requests.map((request) => (
                    <div
                      key={request.id}
                      className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-gray-800 p-4"
                    >
                      <div className="space-y-1">
                        <div className="font-medium">{request.type}</div>
                        <div className="text-sm text-gray-400">
                          Request ID: {request.id}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Badge
                          variant={
                            request.status === "Under Review"
                              ? "secondary"
                              : request.status === "Additional Info Required"
                              ? "destructive"
                              : "default"
                          }
                        >
                          {request.status}
                        </Badge>
                        <div className="text-sm text-gray-400">
                          Submitted: {request.submittedDate}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm">
                          Last Updated: {request.lastUpdate}
                        </div>
                        <div className="text-sm text-gray-400">
                          {request.documents} documents attached
                        </div>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="text-black hover:bg-green-400"
                          >
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-900 text-white">
                          <DialogHeader>
                            <DialogTitle>Request Details</DialogTitle>
                            <DialogDescription>
                              Complete information about your upgrade request
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid gap-2">
                              <div className="font-medium">Status Timeline</div>
                              <div className="text-sm text-gray-400">
                                • Submitted on {request.submittedDate}
                                <br />• Under initial review on{" "}
                                {request.lastUpdate}
                              </div>
                            </div>
                            <div className="grid gap-2">
                              <div className="font-medium">
                                Documents Submitted
                              </div>
                              <div className="text-sm text-gray-400">
                                • ID Verification.pdf
                                <br />
                                • Professional_Credentials.pdf
                                <br />• Portfolio.pdf
                              </div>
                            </div>
                            {request.status === "Additional Info Required" && (
                              <div className="grid gap-2">
                                <div className="font-medium text-red-400">
                                  Required Actions
                                </div>
                                <div className="text-sm text-gray-400">
                                  Please provide additional verification of your
                                  publishing history
                                </div>
                                <Button
                                  className="mt-2 bg-green-500 hover:bg-green-700 hover:text-white"
                                  variant="outline"
                                >
                                  Upload Additional Documents
                                </Button>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
