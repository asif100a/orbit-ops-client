export type UserRole = "USER" | "ADMIN" | "SUPER_ADMIN"
export type SubscriptionType = "STARTER" | "GROWTH" | "SCALE";

export interface PaymentType {
  status: "complete";
  payment_status: "paid";
  payment: {
    _id: string;
    userId: string;
    stripeCheckoutSessionId: string;
    plan: SubscriptionType;
    status: "pending" | "active";
    metadata: {
      subscriptionType: SubscriptionType;
    };
    createdAt: string;
    updatedAt: string;
  };
}

export interface UserType {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  companyId: string | null;
  departmentId: string | null;
  teamId: string | null;
  isActive: boolean;
  isVerified: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
