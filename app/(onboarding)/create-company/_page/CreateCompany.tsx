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
  Clock3,
  Globe2,
  Hash,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Settings2,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";

type CompanyFormValues = {
  name: string;
  registrationNumber: string;
  industryType: string;
  logo: string;
  website: string;
  email: string;
  phoneNumber: string;
  size: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  timezone: string;
  plan: string;
  settings: {
    workingDays: string[];
    workingHoursStart: string;
    workingHoursEnd: string;
    defaultCurrency: string;
    allowSelfRegistration: boolean;
  };
};

const workingDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

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
      registrationNumber: "",
      industryType: "",
      logo: "",
      website: "",
      email: "",
      phoneNumber: "",
      size: "1-10",
      address: {
        street: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
      },
      timezone: "America/Los_Angeles",
      plan: "FREE",
      settings: {
        workingDays,
        workingHoursStart: "09:00",
        workingHoursEnd: "18:00",
        defaultCurrency: "USD",
        allowSelfRegistration: false,
      },
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
        slug: workspaceSlug,
        registrationNumber: data.registrationNumber,
        industryType: data.industryType,
        size: data.size,
        logo: data.logo,
        website: data.website,
        email: data.email,
        phoneNumber: data.phoneNumber,
        address: data.address,
        timezone: data.timezone,
        plan: data.plan,
        settings: data.settings,
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
                <FieldLabel htmlFor="company-registration" className="text-white">
                  Registration number
                </FieldLabel>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#686681]" />
                  <Input
                    id="company-registration"
                    placeholder="RC-1234567"
                    className={cn(
                      "h-11 border-white/[0.08] bg-white/[0.035] pl-10 text-white placeholder:text-[#55536B]",
                      errors.registrationNumber && "border-red-400",
                    )}
                    disabled={isFormLoading}
                    aria-invalid={!!errors.registrationNumber}
                    {...register("registrationNumber", {
                      required: "Registration number is required",
                    })}
                  />
                </div>
                {errors.registrationNumber ? (
                  <p className="text-sm text-red-300">{errors.registrationNumber.message}</p>
                ) : null}
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="company-industry" className="text-white">
                  Industry type
                </FieldLabel>
                <Input
                  id="company-industry"
                  placeholder="IT Services"
                  className="h-11 border-white/[0.08] bg-white/[0.035] text-white placeholder:text-[#55536B]"
                  disabled={isFormLoading}
                  {...register("industryType", { required: "Industry type is required" })}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="company-website" className="text-white">
                  Website
                </FieldLabel>
                <div className="relative">
                  <Globe2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#686681]" />
                  <Input
                    id="company-website"
                    placeholder="https://www.acme.com"
                    className="h-11 border-white/[0.08] bg-white/[0.035] pl-10 text-white placeholder:text-[#55536B]"
                    disabled={isFormLoading}
                    {...register("website")}
                  />
                </div>
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
                    <option className="bg-[#12121e]" value="1-10">
                      1-10 people
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
                <FieldLabel htmlFor="company-logo" className="text-white">
                  Logo URL
                </FieldLabel>
                <Input
                  id="company-logo"
                  placeholder="https://cdn.example.com/logos/acme.png"
                  className="h-11 border-white/[0.08] bg-white/[0.035] text-white placeholder:text-[#55536B]"
                  disabled={isFormLoading}
                  {...register("logo")}
                />
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="company-email" className="text-white">Company email</FieldLabel>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#686681]" />
                  <Input id="company-email" type="email" placeholder="hello@acme.com" className="h-11 border-white/[0.08] bg-white/[0.035] pl-10 text-white placeholder:text-[#55536B]" disabled={isFormLoading} {...register("email", { required: "Company email is required" })} />
                </div>
              </Field>
              <Field>
                <FieldLabel htmlFor="company-phone" className="text-white">Phone number</FieldLabel>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#686681]" />
                  <Input id="company-phone" type="tel" placeholder="+1-555-123-4567" className="h-11 border-white/[0.08] bg-white/[0.035] pl-10 text-white placeholder:text-[#55536B]" disabled={isFormLoading} {...register("phoneNumber", { required: "Phone number is required" })} />
                </div>
              </Field>
            </div>

            <div className="border-t border-white/[0.06] pt-5">
              <p className="mb-4 text-sm font-semibold text-white">Company address</p>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="company-street" className="text-white">Street</FieldLabel>
                  <Input id="company-street" placeholder="123 Innovation Drive" className="h-11 border-white/[0.08] bg-white/[0.035] text-white placeholder:text-[#55536B]" disabled={isFormLoading} {...register("address.street", { required: "Street is required" })} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="company-city" className="text-white">City</FieldLabel>
                  <Input id="company-city" placeholder="San Francisco" className="h-11 border-white/[0.08] bg-white/[0.035] text-white placeholder:text-[#55536B]" disabled={isFormLoading} {...register("address.city", { required: "City is required" })} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="company-state" className="text-white">State</FieldLabel>
                  <Input id="company-state" placeholder="California" className="h-11 border-white/[0.08] bg-white/[0.035] text-white placeholder:text-[#55536B]" disabled={isFormLoading} {...register("address.state", { required: "State is required" })} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="company-country" className="text-white">Country</FieldLabel>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#686681]" />
                    <Input id="company-country" placeholder="United States" className="h-11 border-white/[0.08] bg-white/[0.035] pl-10 text-white placeholder:text-[#55536B]" disabled={isFormLoading} {...register("address.country", { required: "Country is required" })} />
                  </div>
                </Field>
                <Field>
                  <FieldLabel htmlFor="company-postal-code" className="text-white">Postal code</FieldLabel>
                  <Input id="company-postal-code" placeholder="94105" className="h-11 border-white/[0.08] bg-white/[0.035] text-white placeholder:text-[#55536B]" disabled={isFormLoading} {...register("address.postalCode", { required: "Postal code is required" })} />
                </Field>
              </div>
            </div>

            <div className="border-t border-white/[0.06] pt-5">
              <div className="mb-4 flex items-center gap-2">
                <Settings2 className="h-4 w-4 text-violet-300" />
                <p className="text-sm font-semibold text-white">Workspace settings</p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="company-timezone" className="text-white">Timezone</FieldLabel>
                  <div className="relative">
                    <Clock3 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#686681]" />
                    <Input id="company-timezone" placeholder="America/Los_Angeles" className="h-11 border-white/[0.08] bg-white/[0.035] pl-10 text-white placeholder:text-[#55536B]" disabled={isFormLoading} {...register("timezone", { required: "Timezone is required" })} />
                  </div>
                </Field>
                <Field>
                  <FieldLabel htmlFor="company-plan" className="text-white">Plan</FieldLabel>
                  <select id="company-plan" className="h-11 w-full rounded-lg border border-white/[0.08] bg-white/[0.035] px-3 text-sm text-white outline-none transition focus:border-violet-500/50" disabled={isFormLoading} {...register("plan", { required: "Plan is required" })}>
                    <option className="bg-[#12121e]" value="FREE">Free</option>
                  </select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="working-hours-start" className="text-white">Working hours start</FieldLabel>
                  <Input id="working-hours-start" type="time" className="h-11 border-white/[0.08] bg-white/[0.035] text-white" disabled={isFormLoading} {...register("settings.workingHoursStart", { required: "Start time is required" })} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="working-hours-end" className="text-white">Working hours end</FieldLabel>
                  <Input id="working-hours-end" type="time" className="h-11 border-white/[0.08] bg-white/[0.035] text-white" disabled={isFormLoading} {...register("settings.workingHoursEnd", { required: "End time is required" })} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="default-currency" className="text-white">Default currency</FieldLabel>
                  <Input id="default-currency" placeholder="USD" className="h-11 border-white/[0.08] bg-white/[0.035] text-white placeholder:text-[#55536B]" disabled={isFormLoading} {...register("settings.defaultCurrency", { required: "Currency is required" })} />
                </Field>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {workingDays.map((day) => (
                  <label key={day} className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-xs text-[#D9D7EA]">
                    <input type="checkbox" value={day} defaultChecked {...register("settings.workingDays")} />
                    {day.slice(0, 3)}
                  </label>
                ))}
              </div>
              <label className="mt-4 flex items-center gap-2 text-sm text-[#D9D7EA]">
                <input type="checkbox" {...register("settings.allowSelfRegistration")} />
                Allow self-registration
              </label>
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
