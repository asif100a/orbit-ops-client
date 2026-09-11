"use client";

import { Button } from "@/components/ui/button";
import { OnboardingStepGuard } from "@/components/modules/onboarding/OnboardingStepGuard";
import { useCreateCheckoutSessionMutation } from "@/store/api/companyApi";
import {
  ArrowRight,
  Check,
  CreditCard,
  Loader2,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const plans = [
  {
    name: "Starter",
    price: "$19",
    description: "For solo operators and small teams setting up their flow.",
    features: ["5 members", "10 active projects", "Core project tools"],
  },
  {
    name: "Growth",
    price: "$49",
    description: "For agencies that need clients, teams, and billing together.",
    features: ["25 members", "Unlimited projects", "Roles and permissions"],
    recommended: true,
  },
  {
    name: "Scale",
    price: "$99",
    description: "For larger teams that need deeper operational control.",
    features: ["100 members", "Audit logs", "Priority support"],
  },
];

export default function SubscribePage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState("Growth");
  const [createCheckoutSession, { isLoading: isStartingCheckout }] =
    useCreateCheckoutSessionMutation();

  const handleCheckout = async () => {
    try {
      const response = await createCheckoutSession({
        plan: selectedPlan,
      }).unwrap();
      const checkoutUrl = response.data?.checkoutUrl ?? response.data?.url;

      toast.success(`${selectedPlan} plan selected`);

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
        return;
      }

      router.push("/billing/success");
    } catch {
      toast.error("Unable to start checkout. Please try again.");
    }
  };

  return (
    <OnboardingStepGuard step="subscribe">
      <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-sm text-[#8B89A8]">Company activation</p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Activate your workspace
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#8B89A8]">
            Choose a plan to unlock the dashboard, member invitations, projects,
            and admin controls for your company.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-xs text-[#AAA7C8]">
          <ShieldCheck className="h-4 w-4 text-teal-300" />
          Pending subscription
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.name;

          return (
            <button
              key={plan.name}
              type="button"
              onClick={() => setSelectedPlan(plan.name)}
              className={`relative rounded-2xl border p-5 text-left transition ${
                isSelected
                  ? "border-violet-400/50 bg-violet-500/[0.08] shadow-[0_0_30px_rgba(108,99,255,0.16)]"
                  : "border-white/[0.07] bg-[#0d0d18]/85 hover:border-white/[0.14]"
              }`}
            >
              {plan.recommended ? (
                <span className="absolute right-4 top-4 rounded-full bg-teal-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-teal-300">
                  Recommended
                </span>
              ) : null}
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-violet-300">
                {plan.name === "Starter" ? (
                  <Users className="h-5 w-5" />
                ) : plan.name === "Growth" ? (
                  <Sparkles className="h-5 w-5" />
                ) : (
                  <ShieldCheck className="h-5 w-5" />
                )}
              </div>
              <h2 className="mt-5 text-lg font-semibold text-white">
                {plan.name}
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#8B89A8]">
                {plan.description}
              </p>
              <div className="mt-5 flex items-end gap-1">
                <span className="text-3xl font-bold text-white">
                  {plan.price}
                </span>
                <span className="pb-1 text-sm text-[#686681]">
                  per month
                </span>
              </div>
              <div className="mt-5 space-y-3 border-t border-white/[0.06] pt-5">
                {plan.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2 text-sm text-[#D9D7EA]"
                  >
                    <Check className="h-4 w-4 text-teal-300" />
                    {feature}
                  </div>
                ))}
              </div>
            </button>
          );
        })}
      </section>

      <section className="grid gap-4 rounded-2xl border border-white/[0.07] bg-[#0d0d18]/90 p-5 sm:grid-cols-[1fr_auto] sm:items-center">
        <div className="flex gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
            <CreditCard className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">
              Continue with {selectedPlan}
            </h2>
            <p className="mt-1 text-sm leading-6 text-[#8B89A8]">
              Checkout should be created on the backend and return a hosted
              payment URL. After payment, the company status becomes active.
            </p>
          </div>
        </div>
        <Button
          type="button"
          className="h-11 bg-violet-600 px-4 text-white hover:bg-violet-500"
          disabled={isStartingCheckout}
          onClick={handleCheckout}
        >
          {isStartingCheckout ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Start checkout
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </section>
      </div>
    </OnboardingStepGuard>
  );
}
