"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { OnboardingStepGuard } from "@/components/modules/onboarding/OnboardingStepGuard";
import { useCreateCompanyMutation } from "@/store/api/companyApi";
import {
  ArrowRight,
  Building2,
  Check,
  Globe2,
  Loader2,
  MapPin,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";

type CompanyFormValues = {
  name: string;
  website: string;
  size: string;
  country: string;
};

const workspaceFeatures = [
  "Company owner access",
  "Team, project, and role setup",
  "Billing activation after creation",
];

export default function CreateCompanyPage() {
  const router = useRouter();
  const [createCompany, { isLoading: isCreating }] =
    useCreateCompanyMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CompanyFormValues>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      website: "",
      size: "2-10",
      country: "",
    },
  });

  const companyName = useWatch({
    control,
    name: "name",
  });
  const workspaceSlug = useMemo(
    () =>
      companyName
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") || "your-company",
    [companyName],
  );

  const isFormLoading = isCreating || isSubmitting;

  const onSubmit = async (data: CompanyFormValues) => {
    try {
      await createCompany({
        name: data.name,
        website: data.website,
        size: data.size,
        country: data.country,
      }).unwrap();
      toast.success(`${data.name} workspace created`);
      router.push("/billing/subscribe");
    } catch {
      toast.error("Unable to create company. Please try again.");
    }
  };

  return (
    <OnboardingStepGuard step="create-company">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <section className="rounded-2xl border border-white/[0.07] bg-[#0d0d18]/90 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-7">
        <div className="mb-7 flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <p className="mb-2 text-sm text-[#8B89A8]">Company setup</p>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Create your company workspace
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#8B89A8]">
              This company becomes the home for your teams, projects, members,
              permissions, and subscription.
            </p>
          </div>
        </div>

        <form
          className="space-y-6"
          onSubmit={(event) => {
            event.preventDefault();
            void handleSubmit(onSubmit)(event);
          }}
          noValidate
        >
          <FieldGroup>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="company-name" className="text-white">
                  Company name
                </FieldLabel>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#686681]" />
                  <Input
                    id="company-name"
                    placeholder="PixelCraft Agency"
                    className={cn(
                      "h-11 border-white/[0.08] bg-white/[0.035] pl-10 text-white placeholder:text-[#55536B]",
                      errors.name && "border-red-400",
                    )}
                    disabled={isFormLoading}
                    aria-invalid={!!errors.name}
                    {...register("name", {
                      required: "Company name is required",
                      minLength: {
                        value: 2,
                        message: "Company name must be at least 2 characters",
                      },
                    })}
                  />
                </div>
                {errors.name ? (
                  <p className="text-sm text-red-300">{errors.name.message}</p>
                ) : null}
              </Field>

              <Field>
                <FieldLabel htmlFor="company-website" className="text-white">
                  Website
                </FieldLabel>
                <div className="relative">
                  <Globe2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#686681]" />
                  <Input
                    id="company-website"
                    placeholder="https://example.com"
                    className={cn(
                      "h-11 border-white/[0.08] bg-white/[0.035] pl-10 text-white placeholder:text-[#55536B]",
                      errors.website && "border-red-400",
                    )}
                    disabled={isFormLoading}
                    aria-invalid={!!errors.website}
                    {...register("website", {
                      pattern: {
                        value:
                          /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/i,
                        message: "Enter a valid website URL",
                      },
                    })}
                  />
                </div>
                {errors.website ? (
                  <p className="text-sm text-red-300">
                    {errors.website.message}
                  </p>
                ) : null}
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="company-size" className="text-white">
                  Company size
                </FieldLabel>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#686681]" />
                  <select
                    id="company-size"
                    className="h-11 w-full rounded-lg border border-white/[0.08] bg-white/[0.035] px-10 text-sm text-white outline-none transition focus:border-violet-500/50"
                    disabled={isFormLoading}
                    {...register("size", {
                      required: "Company size is required",
                    })}
                  >
                    <option className="bg-[#12121e]" value="1">
                      Just me
                    </option>
                    <option className="bg-[#12121e]" value="2-10">
                      2-10 people
                    </option>
                    <option className="bg-[#12121e]" value="11-50">
                      11-50 people
                    </option>
                    <option className="bg-[#12121e]" value="51-200">
                      51-200 people
                    </option>
                    <option className="bg-[#12121e]" value="201+">
                      201+ people
                    </option>
                  </select>
                </div>
                <FieldDescription className="text-[#686681]">
                  Used to recommend your starting plan.
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="company-country" className="text-white">
                  Country
                </FieldLabel>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#686681]" />
                  <Input
                    id="company-country"
                    placeholder="United States"
                    className={cn(
                      "h-11 border-white/[0.08] bg-white/[0.035] pl-10 text-white placeholder:text-[#55536B]",
                      errors.country && "border-red-400",
                    )}
                    disabled={isFormLoading}
                    aria-invalid={!!errors.country}
                    {...register("country", {
                      required: "Country is required",
                    })}
                  />
                </div>
                {errors.country ? (
                  <p className="text-sm text-red-300">
                    {errors.country.message}
                  </p>
                ) : null}
              </Field>
            </div>
          </FieldGroup>

          <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5F5D78]">
              Workspace URL
            </p>
            <p className="mt-2 break-all text-sm font-medium text-[#D9D7EA]">
              orbitops.app/{workspaceSlug}
            </p>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-5 text-[#686681]">
              Your company starts inactive until a subscription is confirmed.
            </p>
            <Button
              type="submit"
              className="h-11 min-w-[180px] bg-violet-600 px-4 text-white hover:bg-violet-500"
              disabled={isFormLoading}
            >
              {isFormLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </section>

      <aside className="rounded-2xl border border-white/[0.07] bg-[#0d0d18]/80 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5F5D78]">
          What happens next
        </p>
        <div className="mt-5 space-y-4">
          {workspaceFeatures.map((feature, index) => (
            <div key={feature} className="flex gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal-400/10 text-teal-300">
                {index + 1}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{feature}</p>
                <div className="mt-3 h-px bg-white/[0.06]" />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-7 rounded-xl border border-teal-300/15 bg-teal-400/[0.06] p-4">
          <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-teal-400/10 text-teal-300">
            <Check className="h-4 w-4" />
          </div>
          <p className="text-sm font-semibold text-white">
            Owner permissions are assigned automatically
          </p>
          <p className="mt-2 text-xs leading-5 text-[#8B89A8]">
            The logged-in user becomes the company owner and can invite members
            after activation.
          </p>
        </div>
      </aside>
      </div>
    </OnboardingStepGuard>
  );
}
