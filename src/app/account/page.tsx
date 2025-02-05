"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  ArrowDown,
  ArrowUp,
  CreditCard,
  Heart,
  Package,
  Star,
} from "lucide-react";
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
import { useAppSelector, AppDispatch } from "@/redux/store";
import AccountService from "@/services/accountService";
import { setUser } from "@/redux/features/authSlice";
import { User } from "@/redux/features/authTypes"; // see below for shared type

// Account Types
type AccountTypeKeys =
  | "common"
  | "designer"
  | "reviewer"
  | "author"
  | "editor"
  | "book_shop_owner"
  | "publisher";

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

export default function AccountPage() {
  const dispatch = useDispatch<AppDispatch>();
  const authState = useAppSelector((state) => state.authReducer);

  // Initialize local state with default empty values
  const [userData, setUserData] = useState<User>({
    id: "",
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

  // Dialog open state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Derive account type information
  const accountType: AccountTypeKeys =
    (userData.role as AccountTypeKeys) || "common";
  const accountInfo = AccountTypes[accountType] || AccountTypes.common;

  // Field configuration array
  const fields: {
    id: keyof User;
    label: string;
    type?: string;
  }[] = [
    { id: "firstName", label: "First Name", type: "text" },
    { id: "lastName", label: "Last Name", type: "text" },
    { id: "email", label: "Email", type: "email" },
    { id: "homeAddress", label: "Home Address", type: "text" },
    { id: "deliveryAddress", label: "Delivery Address", type: "text" },
    { id: "phoneNumber", label: "Phone Number", type: "text" },
    { id: "pickupPoint", label: "Pickup Point", type: "text" },
    { id: "company", label: "Company", type: "text" },
    { id: "fiscalCode", label: "Fiscal Code", type: "text" },
    { id: "cardNumber", label: "Card Number", type: "text" },
    { id: "cardExpiry", label: "Card Expiry", type: "text" },
  ];

  // Update local state when the Redux user changes
  useEffect(() => {
    if (authState.user) {
      const user = authState.user;
      setUserData((prev) => ({
        ...prev,
        id: user.id || "",
        email: user.email || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        role: user.role || "",
        isEmailVerified: user.isEmailVerified || false,
        isActive: user.isActive || false,
        createdAt: user.createdAt || "",
        updatedAt: user.updatedAt || "",
        homeAddress: user.homeAddress || "",
        deliveryAddress: user.deliveryAddress || "",
        phoneNumber: user.phoneNumber || "-",
        pickupPoint: user.pickupPoint || "",
        company: user.company || "",
        fiscalCode: user.fiscalCode || "",
        cardNumber: user.cardNumber || "",
        cardExpiry: user.cardExpiry || "",
      }));
    }
  }, [authState.user]);

  // Function to update the profile data
  async function updateProfile(id: string | null, data: User): Promise<void> {
    if (!id) {
      throw new Error("User ID is required to update profile.");
    }
    setIsLoading(true);

    try {
      const response = await AccountService.updateProfile(id, data);
      if (!response) {
        throw new Error("Failed to update profile.");
      }

      const updatedUser: User = response.data.user;

      // Update local state only if the profile update is successful
      dispatch(setUser(updatedUser));
      setUserData(updatedUser);
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

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
                        {/* Safely slice the card number only if it exists */}
                        Visa ending in{" "}
                        {userData.cardNumber
                          ? userData.cardNumber.slice(-4)
                          : "-"}
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
              <DialogContent className="sm:max-w-[600px] bg-gray-900 text-white">
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile information here.
                  </DialogDescription>
                </DialogHeader>

                {/* Two-column grid of form fields */}
                <div className="grid grid-cols-2 gap-4">
                  {fields.map((field) => (
                    <div key={field.id} className="grid gap-2">
                      <Label htmlFor={field.id}>{field.label}</Label>
                      <Input
                        id={field.id}
                        type={field.type || "text"}
                        value={
                          typeof userData[field.id] === "boolean"
                            ? userData[field.id]
                              ? "true"
                              : "false"
                            : userData[field.id]?.toString() || ""
                        }
                        className="bg-gray-800 text-gray-400"
                        onChange={(e) =>
                          setUserData((prev) => ({
                            ...prev,
                            [field.id]: e.target.value,
                          }))
                        }
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <Button
                    variant="outline"
                    className="border-gray-400 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-green-500 text-white hover:bg-green-700"
                    disabled={isLoading}
                    onClick={async () => {
                      try {
                        await updateProfile(
                          authState.user?.id ?? null,
                          userData
                        );
                        setIsDialogOpen(false);
                      } catch (error) {
                        console.error("Failed to update profile:", error);
                      }
                    }}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Updating...
                      </div>
                    ) : (
                      "Save changes"
                    )}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </main>

      {/* Optional overlay for dialog */}
      {isDialogOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
