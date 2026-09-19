'use client';

import { useGetPaymentQuery } from "@/store/api/paymentApi";
import { ArrowRight, CheckCircle2, CreditCard, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function BillingSuccessPage() {
  const searchParams = useSearchParams();
  const session_id = searchParams.get('session_id') ?? '';

  const { data, isError, error, isLoading } = useGetPaymentQuery(
    { session_id },
    { skip: !session_id },
  );
  const paymentStatus = data?.data?.payment_status;
  const payment = data?.data?.payment;

  useEffect(() => {
    if (isError) {
      console.error('Error getting payment status: ', error);
      toast.error('Unable to load payment details.');
    }
  }, [isError, error])

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat('en', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(date));

  return (
    <section className="mx-auto flex min-h-[calc(100vh-160px)] max-w-2xl items-center justify-center">
      <div className="w-full space-y-4">
        <div className="rounded-2xl border border-white/[0.07] bg-[#0d0d18]/90 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-[#8B89A8]">
                Payment details
              </p>
              <h1 className="mt-1 text-xl font-semibold text-white">
                {isLoading ? 'Checking your payment' : `${payment?.plan ?? 'Subscription'} plan`}
              </h1>
            </div>
          </div>

          {isLoading ? (
            <div className="mt-6 flex items-center gap-2 text-sm text-[#8B89A8]">
              <Loader2 className="h-4 w-4 animate-spin" />
              Retrieving your payment confirmation...
            </div>
          ) : payment ? (
            <dl className="mt-6 grid gap-4 border-t border-white/[0.06] pt-5 sm:grid-cols-2">
              <div>
                <dt className="text-xs text-[#8B89A8]">Payment status</dt>
                <dd className="mt-1 text-sm font-medium capitalize text-teal-300">
                  {paymentStatus}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[#8B89A8]">Workspace status</dt>
                <dd className="mt-1 text-sm font-medium capitalize text-white">
                  {payment.status}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs text-[#8B89A8]">Confirmed</dt>
                <dd className="mt-1 text-sm text-[#D9D7EA]">
                  {formatDate(payment.updatedAt)}
                </dd>
              </div>
            </dl>
          ) : (
            <p className="mt-6 border-t border-white/[0.06] pt-5 text-sm text-[#8B89A8]">
              We could not find payment details for this checkout session.
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-white/[0.07] bg-[#0d0d18]/90 p-6 text-center shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-400/10 text-teal-300">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <p className="mt-6 text-sm text-[#8B89A8]">Company activated</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">
            Your workspace is ready
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#8B89A8]">
            Your subscription is active. You can now invite members, create teams,
            manage projects, and use the full OrbitOps dashboard.
          </p>
          <Link
            href="/admin"
            className="mt-7 inline-flex h-11 items-center justify-center gap-1.5 rounded-lg bg-violet-600 px-4 text-sm font-medium text-white transition hover:bg-violet-500"
          >
            Go to dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
