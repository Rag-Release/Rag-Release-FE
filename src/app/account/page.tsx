"use client";

import {
  ArrowDown,
  ArrowUp,
  CreditCard,
  Heart,
  Package,
  Star,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

type AccountTypeKeys =
  | "basic"
  | "pro"
  | "author"
  | "editor"
  | "graphicDesigner";

const AccountTypes: Record<AccountTypeKeys, { label: string; color: string }> =
  {
    basic: { label: "Basic Account", color: "bg-gray-400" },
    pro: { label: "PRO Account", color: "bg-blue-500" },
    author: { label: "Author Account", color: "bg-green-500" },
    editor: { label: "Editor Account", color: "bg-yellow-500" },
    graphicDesigner: {
      label: "Graphic Designer Account",
      color: "bg-purple-500",
    },
  };

export default function Component() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userData] = useState({
    name: "Helene Engels",
    email: "helene@example.com",
    accountType: "pro",
    homeAddress: "2 Miles Drive, NJ 071, New York, United States of America",
    deliveryAddress: "9th St. PATH Station, New York, United States of America",
    phoneNumbers: ["+1234 567 890", "+12 345 678"],
    pickupPoint: "Herald Square, 2, New York, United States of America",
    company: "FLOWBITE LLC",
    fiscalCode: "18673557",
    cardNumber: "****7658",
    cardExpiry: "10/2024",
  });
  //   const [isEditMode, setIsEditMode] = useState(false);

  //   const handleEdit = () => {
  //     setIsEditMode(true);
  //   };

  //   const handleSave = () => {
  //     setIsEditMode(false);
  //   };

  //   const handleCancel = () => {
  //     setIsEditMode(false);
  //   };

  //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const { name, value } = e.target;
  //     setUserData((prev) => ({ ...prev, [name]: value }));
  //   };
  //   const handleAddPhoneNumber = () => {
  //     setUserData((prev) => ({
  //      ...prev,
  //       phoneNumbers: [...prev.phoneNumbers, ""],
  //     }));
  //     };

  //     const handleRemovePhoneNumber = (index: number) => {
  //     setUserData((prev) => ({
  //      ...prev,
  //       phoneNumbers: prev.phoneNumbers.filter((_, i) => i!== index),
  //     }));
  //     };

  //     const handleAddCardNumber = () => {
  //     setUserData((prev) => ({
  //      ...prev,
  //       cardNumber: [...prev.cardNumber, ""],
  //     }));
  //     };

  //     const handleRemoveCardNumber = (index: number) => {
  //     setUserData((prev) => ({
  //      ...prev,
  //       cardNumber: prev.cardNumber.filter((_, i) => i!== index),
  //     }));
  //     };
  //     const handleAddCardExpiry = () => {
  //     setUserData((prev) => ({
  //      ...prev,
  //       cardExpiry: [...prev.cardExpiry, ""],
  //     }));
  //     };

  //     const handleRemoveCardExpiry = (index: number) => {
  //         setUserData((prev) => ({
  //      ...prev,
  //       cardExpiry: prev.cardExpiry.filter((_, i) => i!== index),
  //     }));
  //     };

  //     const handleSubmit = (e: React.FormEvent) => {
  //     e.preventDefault();
  //     // Handle sign up logic here
  //     console.log("Sign up data:", userData);
  //     };

  const accountType: AccountTypeKeys =
    (userData.accountType as AccountTypeKeys) || "basic"; // Default to basic if not provided
  const accountInfo = AccountTypes[accountType] || AccountTypes.basic; // Fallback to basic

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <main className="container mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">General overview</h1>

        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <Card className="bg-gray-900 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orders made</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-green-500">
                <ArrowUp className="mr-1 inline h-4 w-4" />
                10.3% vs 20 last 3 months
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Reviews added
              </CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">16</div>
              <p className="text-xs text-green-500">
                <ArrowUp className="mr-1 inline h-4 w-4" />
                8.6% vs 14 last 3 months
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Favorite products added
              </CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-red-500">
                <ArrowDown className="mr-1 inline h-4 w-4" />
                12% vs 10 last 3 months
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gray-900">
          <CardContent className="p-6">
            <div className="mb-6 flex items-center gap-4">
              <div className="h-16 w-16 overflow-hidden rounded-full">
                <img
                  alt="Profile picture"
                  className="h-full w-full object-cover"
                  height="64"
                  src="/assets/images/author2.png" // Adjusted path for Next.js
                  width="64"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-white">
                    {userData.name}
                  </h2>
                  <span
                    className={`rounded ${accountInfo.color} px-2 py-1 text-xs font-semibold`}
                  >
                    {accountInfo.label}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 font-semibold text-white">
                    Email Address
                  </h3>
                  <p className="text-gray-400">{userData.email}</p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-white">
                    Home Address
                  </h3>
                  <p className="text-gray-400">{userData.homeAddress}</p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-white">
                    Delivery Address
                  </h3>
                  <p className="text-gray-400">{userData.deliveryAddress}</p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 font-semibold text-white">
                    Phone Number
                  </h3>
                  <p className="text-gray-400">
                    {userData.phoneNumbers.join(" / ")}
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-white">
                    Favorite pick-up point
                  </h3>
                  <p className="text-gray-400">{userData.pickupPoint}</p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-white">
                    My Companies
                  </h3>
                  <p className="text-gray-400">
                    {userData.company}, Fiscal code: {userData.fiscalCode}
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-white">
                    Payment Methods
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="rounded-md border border-gray-700 p-2">
                      <CreditCard className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-white">
                        Visa ending in {userData.cardNumber.slice(-4)}
                      </p>
                      <p className="text-sm text-gray-400">
                        Expiry {userData.cardExpiry}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="mt-6 bg-green-400 hover:bg-green-700">
                  Edit your data
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile information here.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      defaultValue={userData.name}
                      className="bg-gray-800 text-gray-400"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={userData.email}
                      className="bg-gray-800 text-gray-400"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="home-address">Home Address</Label>
                    <Input
                      id="home-address"
                      defaultValue={userData.homeAddress}
                      className="bg-gray-800 text-gray-400"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="delivery-address">Delivery Address</Label>
                    <Input
                      id="delivery-address"
                      defaultValue={userData.deliveryAddress}
                      className="bg-gray-800 text-gray-400"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      defaultValue={userData.phoneNumbers[0]}
                      className="bg-gray-800 text-gray-400"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 text-black">
                  <Button
                    variant="outline"
                    className="border-gray-400 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-green-500 text-white hover:bg-green-700"
                    onClick={() => {
                      // Add your save logic here
                      setIsDialogOpen(false);
                    }}
                  >
                    Save changes
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </main>

      {isDialogOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
