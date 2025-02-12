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

interface UpdateProfileResponse {
  data: {
    user: User;
  };
}

interface UserFields {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isEmailVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  homeAddress: string;
  deliveryAddress: string;
  phoneNumber: string;
  pickupPoint: string;
  company: string;
  fiscalCode: string;
  cardNumber: string;
  cardExpiry: string;
}

export default function AccountPage() {
  const dispatch = useDispatch<AppDispatch>();
  const authState = useAppSelector((state) => state.authReducer) as {
    user: User | null;
  };

  // Initialize local state with default empty values
  const [userData, setUserData] = useState<UserFields>({
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

  /**
   * Effect hook to synchronize local user data state with Redux auth state.
   *
   * This hook performs the following:
   * 1. Checks for the presence of user data in the auth state
   * 2. Creates a default user fields object with empty/default values
   * 3. Merges existing auth state data with default values for missing fields
   * 4. Updates the local state while preserving any existing values
   *
   * The hook runs whenever authState.user changes, ensuring the local state
   * stays in sync with the global auth state.
   *
   * @dependency authState.user - Redux auth state user object
   */
  useEffect(() => {
    if (!authState.user) return;

    const userFields: UserFields = {
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
      phoneNumber: "-",
      pickupPoint: "",
      company: "",
      fiscalCode: "",
      cardNumber: "",
      cardExpiry: "",
    };

    // Only update fields that have changed
    const updatedFields = Object.keys(userFields).reduce(
      (acc, key) => ({
        ...acc,
        [key]:
          authState.user?.[key as keyof UserFields] ??
          userFields[key as keyof UserFields],
      }),
      {}
    );

    setUserData((prev) => ({
      ...prev,
      ...updatedFields,
    }));
  }, [authState.user]);

  /**
   * Updates a user's profile information in the system.
   *
   * This asynchronous function handles the profile update process by:
   * 1. Validating input parameters
   * 2. Making an API call to update the profile
   * 3. Updating the local state with the new user data
   * 4. Managing loading states during the operation
   *
   * @param {string | null} id - The unique identifier of the user whose profile is being updated.
   *                            Must be a non-empty string.
   * @param {User} data - The user data object containing the updated profile information.
   *                     Must be a valid object conforming to the User interface.
   *
   * @returns {Promise<User>} A promise that resolves to the updated user object.
   *
   * @throws {Error} Throws an error in the following cases:
   *  - If the user ID is null, undefined, or empty
   *  - If the user data is invalid or not an object
   *  - If the server response is invalid or missing user data
   *  - If any network or server errors occur during the update
   *
   */
  async function updateProfile(id: string | null, data: User): Promise<User> {
    // Input validation
    if (!id?.trim()) {
      throw new Error("User ID is required to update profile.");
    }

    if (!data || typeof data !== "object") {
      throw new Error("Invalid user data provided.");
    }

    try {
      setIsLoading(true);
      const response = await AccountService.updateProfile(id, data);

      if (!response || !response.data?.user) {
        throw new Error("Invalid response received from server.");
      }

      const updatedUser: User = response.data.user;

      // Update local state
      dispatch(setUser(updatedUser));
      setUserData(updatedUser as UserFields);

      return updatedUser;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while updating profile.";

      console.error("Error updating profile:", errorMessage);
      throw new Error(errorMessage);
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
