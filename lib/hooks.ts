import useSWR from "swr";

export type Business = {
  id: string;
  name: string;
  gstin: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  phone: string | null;
  email: string | null;
  logoUrl: string | null;
};

export type Client = {
  id: string;
  name: string;
  gstin: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  _count: { invoices: number };
};

export type Invoice = {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string | null;
  total: number;
  subtotal: number;
  cgstTotal: number;
  sgstTotal: number;
  status: string;
  notes: string | null;
  client: { id: string; name: string; gstin: string | null; phone: string | null; address: string | null } | null;
  items: {
    id: string;
    description: string;
    quantity: number;
    rate: number;
    gstRate: number;
    amount: number;
    cgst: number;
    sgst: number;
  }[];
};

export type UserProfile = {
  subscriptionStatus: string;
  trialInvoicesUsed: number;
  name: string | null;
  email: string | null;
  image: string | null;
};

export function useBusiness() {
  return useSWR<Business | null>("/api/business");
}

export function useInvoices() {
  return useSWR<Invoice[]>("/api/invoices");
}

export function useInvoice(id: string) {
  return useSWR<Invoice>(`/api/invoices/${id}`);
}

export function useClients() {
  return useSWR<Client[]>("/api/clients");
}

export function useUser() {
  return useSWR<UserProfile>("/api/user/me");
}

export function computeDashboardStats(invoices: Invoice[]) {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const totalRevenue = invoices
    .filter((i) => i.status === "paid")
    .reduce((sum, i) => sum + i.total, 0);

  const thisMonthRevenue = invoices
    .filter((i) => i.status === "paid" && new Date(i.date) >= monthStart)
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

  return { totalRevenue, thisMonthRevenue, unpaidTotal, monthlyData };
}
