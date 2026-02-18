"use client";

import { SettingsForm } from "@/components/dashboard/SettingsForm";
import { useUser, useBusiness } from "@/lib/hooks";

export function SettingsContent() {
  const { data: user, isLoading: userLoading } = useUser();
  const { data: business, isLoading: bizLoading } = useBusiness();

  const loading = userLoading || bizLoading;

  if (loading) {
    return (
      <div className="p-4 sm:p-6 max-w-2xl mx-auto animate-pulse space-y-5">
        <div>
          <div className="h-7 w-24 bg-gray-200 rounded mb-1" />
          <div className="h-4 w-40 bg-gray-100 rounded" />
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-4 h-20" />
        <div className="bg-white rounded-2xl border border-gray-100 p-4 h-24" />
        <div className="bg-white rounded-2xl border border-gray-100 p-4 h-96" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage your business profile</p>
      </div>

      <SettingsForm
        business={business ?? null}
        subscription={{
          status: user?.subscriptionStatus ?? "trial",
          trialUsed: user?.trialInvoicesUsed ?? 0,
        }}
        userImage={user?.image ?? null}
        userName={user?.name ?? ""}
        userEmail={user?.email ?? ""}
      />
    </div>
  );
}
