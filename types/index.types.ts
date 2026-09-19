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
  };
