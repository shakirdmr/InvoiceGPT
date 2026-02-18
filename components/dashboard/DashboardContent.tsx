"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useBusiness, useInvoices, computeDashboardStats } from "@/lib/hooks";
import {
  FileText,
  TrendingUp,
  IndianRupee,
  Clock,
  Plus,
  ArrowRight,
} from "lucide-react";

const STATUS_STYLES: Record<string, "secondary" | "warning" | "success"> = {
  draft: "secondary",
  sent: "warning",
  paid: "success",
};

function StatSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-3 w-20 bg-gray-200 rounded mb-3" />
      <div className="h-7 w-28 bg-gray-200 rounded" />
      <div className="h-3 w-14 bg-gray-100 rounded mt-2" />
    </div>
  );
}

export function DashboardContent() {
  const router = useRouter();
  const { data: business, isLoading: bizLoading } = useBusiness();
  const { data: invoices, isLoading: invLoading } = useInvoices();

  if (!bizLoading && business === null) {
    router.replace("/onboarding");
    return null;
  }

  const loading = bizLoading || invLoading;
  const stats = invoices ? computeDashboardStats(invoices) : null;
  const recentInvoices = invoices?.slice(0, 5) ?? [];

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Good morning 👋
          </h1>
          {loading ? (
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mt-1" />
          ) : (
            <p className="text-sm text-gray-500 mt-0.5">{business?.name}</p>
          )}
        </div>
        <Link href="/invoices/new" className="hidden sm:block">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Invoice
          </Button>
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <Card className="col-span-2 lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-gray-500 font-medium flex items-center gap-1.5">
              <IndianRupee className="w-3.5 h-3.5" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <StatSkeleton />
            ) : (
              <>
                <div className="text-2xl font-bold text-gray-900">
                  {formatCurrency(stats?.totalRevenue ?? 0)}
                </div>
                <div className="text-xs text-gray-400 mt-1">All time</div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-gray-500 font-medium flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" />
              This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <StatSkeleton />
            ) : (
              <>
                <div className="text-2xl font-bold text-gray-900">
                  {formatCurrency(stats?.thisMonthRevenue ?? 0)}
                </div>
                <div className="text-xs text-gray-400 mt-1">Paid invoices</div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-gray-500 font-medium flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Outstanding
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <StatSkeleton />
            ) : (
              <>
                <div className="text-2xl font-bold text-orange-600">
                  {formatCurrency(stats?.unpaidTotal ?? 0)}
                </div>
                <div className="text-xs text-gray-400 mt-1">Unpaid</div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Revenue chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-gray-900">
            Revenue — Last 6 Months
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-48 bg-gray-100 rounded-xl animate-pulse" />
          ) : (
            <RevenueChart data={stats?.monthlyData ?? []} />
          )}
        </CardContent>
      </Card>

      {/* Mobile new invoice CTA */}
      <Link href="/invoices/new" className="sm:hidden block">
        <button className="w-full bg-black text-white rounded-2xl py-4 font-semibold text-base flex items-center justify-center gap-2 active:scale-95 transition-transform">
          <Plus className="w-5 h-5" />
          Create New Invoice
        </button>
      </Link>

      {/* Recent invoices */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold text-gray-900">
              Recent Invoices
            </CardTitle>
            <Link href="/invoices">
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                View all <ArrowRight className="w-3 h-3" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {loading ? (
            <div className="space-y-3 animate-pulse">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg" />
                    <div>
                      <div className="h-3.5 w-28 bg-gray-200 rounded" />
                      <div className="h-3 w-16 bg-gray-100 rounded mt-1.5" />
                    </div>
                  </div>
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          ) : recentInvoices.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-8 h-8 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500 mb-4">No invoices yet</p>
              <Link href="/invoices/new">
                <Button size="sm" className="gap-1.5">
                  <Plus className="w-3.5 h-3.5" />
                  Create first invoice
                </Button>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {recentInvoices.map((inv) => (
                <Link key={inv.id} href={`/invoices/${inv.id}`}>
                  <div className="flex items-center justify-between py-3 hover:bg-gray-50 -mx-2 px-2 rounded-lg cursor-pointer transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4 text-gray-500" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {inv.invoiceNumber}
                        </div>
                        <div className="text-xs text-gray-400">
                          {formatDate(inv.date)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <Badge
                        variant={STATUS_STYLES[inv.status] ?? "secondary"}
                        className="text-xs capitalize"
                      >
                        {inv.status}
                      </Badge>
                      <div className="text-sm font-semibold text-gray-900">
                        {formatCurrency(inv.total)}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
