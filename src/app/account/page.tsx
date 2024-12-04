"use client";
import {
  ArrowDown,
  ArrowUp,
  CreditCard,
  Heart,
  Package,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";

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
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";

type AccountTypeKeys =
  | "common"
  | "designer"
  | "reviewer"
  | "author"
  | "editor"
  | "book_shop_owner"
  | "publisher";

interface userData {
  // id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isEmailVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  homeAddress: string;
  deliveryAddress: string;
  phoneNumber: string;
  pickupPoint: string;
  company: string;
  fiscalCode: string;
  cardNumber: string;
  cardExpiry: string;
}
const AccountTypes: Record<AccountTypeKeys, { label: string; color: string }> =
  {
    common: { label: "Common Account", color: "bg-gray-400" },
    designer: { label: "Designer Account", color: "bg-blue-500" },
    reviewer: { label: "Reviewer Account", color: "bg-yellow-500" },
    author: { label: "Author Account", color: "bg-green-500" },
    editor: { label: "Editor Account", color: "bg-yellow-500" },
    book_shop_owner: {
      label: "Book Shop Owner Account",
      color: "bg-purple-500",
    },
    publisher: { label: "Publisher Account", color: "bg-purple-500" },
  };

export default function Component() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userData, setUserData] = useState({
    // id: "",
    email: "",
    firstName: "",
    lastName: "",
    role: "",
    isEmailVerified: false,
    isActive: false,
    createdAt: "",
    updatedAt: "",
    homeAddress: "",
    deliveryAddress: "",
    phoneNumber: "",
    pickupPoint: "",
    company: "",
    fiscalCode: "",
    cardNumber: "",
    cardExpiry: "",
  });

  const accountType: AccountTypeKeys =
    (userData.role as AccountTypeKeys) || "common";
  const accountInfo = AccountTypes[accountType] || AccountTypes.common;

  const authState = useAppSelector((state) => state.authReducer);

  useEffect(() => {
    if (authState.user) {
      setUserData({
        ...userData,
        email: authState.user.email || "",
        firstName: authState.user.firstName || "",
        lastName: authState.user.lastName || "",
        role: authState.user.role || "",
        isEmailVerified: authState.user.isEmailVerified || false,
        isActive: authState.user.isActive || false,
        createdAt: authState.user.createdAt || "",
        updatedAt: authState.user.updatedAt || "",
        homeAddress: authState.user.homeAddress || "",
        deliveryAddress: authState.user.deliveryAddress || "",
        phoneNumber: authState.user.phoneNumber
          ? authState.user.phoneNumber
          : "-",
        pickupPoint: authState.user.pickupPoint || "",
        company: authState.user.company || "",
        fiscalCode: authState.user.fiscalCode || "",
        cardNumber: authState.user.cardNumber || "",
        cardExpiry: authState.user.cardExpiry || "",
      });
    }
  }, [authState.user]);

  // const handleEdit = () => {
  //   setIsDialogOpen(true);
  // };
  // const handleSave = () => {
  //   setIsDialogOpen(false);
  // };
  // const handleCancel = () => {
  //   setIsDialogOpen(false);
  // };
  // const dispatch = useDispatch();
  // const handleDelete = () => {
  //   dispatch({ type: "auth/logout" });
  // };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
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
                    {userData.firstName || "-"} {userData.lastName || "-"}
                  </h2>
                  <span
                    className={`rounded ${accountInfo.color} px-2 py-1 text-xs font-semibold`}
                  >
                    {accountInfo.label || "Common Account"}
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
                  <p className="text-gray-400">{userData.email || "-"}</p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-white">
                    Home Address
                  </h3>
                  <p className="text-gray-400">{userData.homeAddress || "-"}</p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-white">
                    Delivery Address
                  </h3>
                  <p className="text-gray-400">
                    {userData.deliveryAddress || "-"}
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 font-semibold text-white">
                    Phone Number
                  </h3>
                  <p className="text-gray-400">{userData.phoneNumber || "-"}</p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-white">
                    Favorite pick-up point
                  </h3>
                  <p className="text-gray-400">{userData.pickupPoint || "-"}</p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-white">
                    My Companies
                  </h3>
                  <p className="text-gray-400">
                    {userData.company || "-"}, Fiscal code:{" "}
                    {userData.fiscalCode || "-"}
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
                        Visa ending in {userData.cardNumber.slice(-4) || "-"}
                      </p>
                      <p className="text-sm text-gray-400">
                        Expiry {userData.cardExpiry || "-"}
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
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    defaultValue={userData.firstName}
                    className="bg-gray-800 text-gray-400"
                  />
                </div>

                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      defaultValue={userData.lastName}
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
                      defaultValue={userData.phoneNumber}
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
