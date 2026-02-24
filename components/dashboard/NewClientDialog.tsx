"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { mutate } from "swr";
import { cacheTags } from "@/lib/cache";

interface NewClientDialogProps {
  onClientCreated?: (client: any) => void;
  trigger?: React.ReactNode;
}

export function NewClientDialog({ onClientCreated, trigger }: NewClientDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newClient, setNewClient] = useState({
    name: "",
    gstin: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!newClient.name.trim()) {
      toast.error("Client name is required");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newClient),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error || "Failed to create client");
      }

      const client = await res.json();
      toast.success("Client created successfully!");

      // Invalidate clients cache
      mutate((key) => typeof key === "string" && key.includes("/api/clients"), undefined, {
        revalidate: true,
      });

      setNewClient({
        name: "",
        gstin: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
      });

      setOpen(false);

      if (onClientCreated) {
        onClientCreated(client);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  const defaultTrigger = (
    <Button className="gap-2" size="sm">
      <Plus className="w-4 h-4" />
      <span className="hidden sm:inline">Add Client</span>
      <span className="sm:hidden">Add</span>
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
          <DialogDescription>
            Enter client details. Only the name is required.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Client Name *
            </label>
            <input
              value={newClient.name}
              onChange={(e) => setNewClient((p) => ({ ...p, name: e.target.value }))}
              placeholder="e.g., ABC Company"
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
            />
          </div>

          {/* GSTIN and Phone */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GSTIN</label>
              <input
                value={newClient.gstin}
                onChange={(e) => setNewClient((p) => ({ ...p, gstin: e.target.value }))}
                placeholder="15-digit GSTIN"
                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 uppercase"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                value={newClient.phone}
                onChange={(e) => setNewClient((p) => ({ ...p, phone: e.target.value }))}
                placeholder="10-digit number"
                type="tel"
                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              value={newClient.email}
              onChange={(e) => setNewClient((p) => ({ ...p, email: e.target.value }))}
              placeholder="email@example.com"
              type="email"
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              value={newClient.address}
              onChange={(e) => setNewClient((p) => ({ ...p, address: e.target.value }))}
              placeholder="Street address"
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
            />
          </div>

          {/* City, State, Pincode */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                value={newClient.city}
                onChange={(e) => setNewClient((p) => ({ ...p, city: e.target.value }))}
                placeholder="City"
                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input
                value={newClient.state}
                onChange={(e) => setNewClient((p) => ({ ...p, state: e.target.value }))}
                placeholder="State"
                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
              <input
                value={newClient.pincode}
                onChange={(e) => setNewClient((p) => ({ ...p, pincode: e.target.value }))}
                placeholder="6-digit"
                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="gap-2">
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? "Creating..." : "Create Client"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
