"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export default function OnboardingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    gstin: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    email: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Business name is required");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/business", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to save");
      toast.success("Business profile saved!");
      router.push("/dashboard");
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start px-4 py-10">
      <div className="flex items-center gap-2 mb-8">
        <Image src="/logo.png" alt="InvoiceGPT" width={32} height={32} className="rounded-lg" />
        <span className="font-bold text-gray-900 text-lg">InvoiceGPT</span>
      </div>

      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Set up your business
          </h1>
          <p className="text-sm text-gray-500">
            This info will appear on all your invoices
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Business Name *</Label>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Ahmed General Store"
              className="mt-1.5"
              required
            />
          </div>

          <div>
            <Label htmlFor="gstin">GSTIN</Label>
            <Input
              id="gstin"
              name="gstin"
              value={form.gstin}
              onChange={handleChange}
              placeholder="e.g. 01AAAAA0000A1Z5"
              className="mt-1.5 uppercase"
              maxLength={15}
            />
            <p className="text-xs text-gray-400 mt-1">
              Optional but required for GST invoices
            </p>
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="e.g. 9876543210"
              type="tel"
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Shop / Street address"
              className="mt-1.5"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Srinagar"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder="J&K"
                className="mt-1.5"
              />
            </div>
          </div>

          <Button type="submit" className="w-full gap-2 h-11" disabled={loading}>
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                Go to Dashboard <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>

          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="w-full text-center text-sm text-gray-400 hover:text-gray-600 transition-colors py-1"
          >
            Skip for now
          </button>
        </form>
      </div>
    </div>
  );
}
