// src/redux/features/authTypes.ts

export interface User {
  id: string | null;
  email: string | null;
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
