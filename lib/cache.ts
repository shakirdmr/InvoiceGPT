import { unstable_cache } from "next/cache";
import { prisma } from "./prisma";

// Cache tags — used to invalidate specific caches
export const cacheTags = {
  business: (userId: string) => `business:${userId}`,
  invoices: (businessId: string) => `invoices:${businessId}`,
  clients: (businessId: string) => `clients:${businessId}`,
  user: (userId: string) => `user:${userId}`,
};

// Business data — revalidate every 5 min, or on update
export function getBusinessCached(userId: string) {
  return unstable_cache(
    () =>
      prisma.business.findFirst({
        where: { userId },
      }),
    [cacheTags.business(userId)],
    {
      revalidate: 300,
      tags: [cacheTags.business(userId)],
    }
  )();
}

// Invoices list — revalidate every 60s, or on create/update
export function getInvoicesCached(businessId: string) {
  return unstable_cache(
    () =>
      prisma.invoice.findMany({
        where: { businessId },
        include: { client: true, items: true },
        orderBy: { createdAt: "desc" },
      }),
    [cacheTags.invoices(businessId)],
    {
      revalidate: 60,
      tags: [cacheTags.invoices(businessId)],
    }
  )();
}

// Clients list — revalidate every 5 min, or on create
export function getClientsCached(businessId: string) {
  return unstable_cache(
    () =>
      prisma.client.findMany({
        where: { businessId },
        orderBy: { name: "asc" },
        include: {
          _count: { select: { invoices: true } },
        },
      }),
    [cacheTags.clients(businessId)],
    {
      revalidate: 300,
      tags: [cacheTags.clients(businessId)],
    }
  )();
}

// User subscription status — revalidate every 60s
export function getUserCached(userId: string) {
  return unstable_cache(
    () =>
      prisma.user.findUnique({
        where: { id: userId },
        select: {
          subscriptionStatus: true,
          trialInvoicesUsed: true,
        },
      }),
    [cacheTags.user(userId)],
    {
      revalidate: 60,
      tags: [cacheTags.user(userId)],
    }
  )();
}

// Dashboard stats — derived from invoices cache
export function getDashboardStatsCached(businessId: string) {
  return unstable_cache(
    async () => {
      const invoices = await prisma.invoice.findMany({
        where: { businessId },
        select: {
          total: true,
          status: true,
          date: true,
        },
      });

      const now = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

      const totalRevenue = invoices
        .filter((i) => i.status === "paid")
        .reduce((sum, i) => sum + i.total, 0);

      const thisMonthRevenue = invoices
        .filter(
          (i) => i.status === "paid" && new Date(i.date) >= monthStart
        )
        .reduce((sum, i) => sum + i.total, 0);

      const unpaidTotal = invoices
        .filter((i) => i.status !== "paid")
        .reduce((sum, i) => sum + i.total, 0);

      const monthlyData = Array.from({ length: 6 }, (_, i) => {
        const d = new Date();
        d.setMonth(d.getMonth() - (5 - i));
        const label = d.toLocaleString("en-IN", { month: "short" });
        const revenue = invoices
          .filter((inv) => {
            const invDate = new Date(inv.date);
            return (
              invDate.getMonth() === d.getMonth() &&
              invDate.getFullYear() === d.getFullYear() &&
              inv.status === "paid"
            );
          })
          .reduce((sum, inv) => sum + inv.total, 0);
        return { month: label, revenue };
      });

      return {
        totalRevenue,
        thisMonthRevenue,
        unpaidTotal,
        monthlyData,
        totalInvoices: invoices.length,
      };
    },
    [`dashboard-stats:${businessId}`],
    {
      revalidate: 60,
      tags: [cacheTags.invoices(businessId)],
    }
  )();
}
