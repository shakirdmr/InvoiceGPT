"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  Save,
  Upload,
  User,
  Building2,
  CreditCard,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { TRIAL_INVOICE_LIMIT } from "@/lib/razorpay";
import { LogoCropModal } from "./LogoCropModal";

interface Business {
  id: string;
  name: string;
  gstin?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  pincode?: string | null;
  phone?: string | null;
  email?: string | null;
  logoUrl?: string | null;
}

interface SettingsFormProps {
  business: Business | null;
  subscription: { status: string; trialUsed: number };
  userImage: string | null;
  userName: string;
  userEmail: string;
}

export function SettingsForm({
  business,
  subscription,
  userImage,
  userName,
  userEmail,
}: SettingsFormProps) {
  const [loading, setLoading] = useState(false);
  const [logoLoading, setLogoLoading] = useState(false);
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: business?.name ?? "",
    gstin: business?.gstin ?? "",
    address: business?.address ?? "",
    city: business?.city ?? "",
    state: business?.state ?? "",
    pincode: business?.pincode ?? "",
    phone: business?.phone ?? "",
    email: business?.email ?? "",
    logoUrl: business?.logoUrl ?? "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    // 10MB raw limit — we compress after crop anyway
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image too large. Please pick one under 10MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setCropSrc(reader.result as string);
    reader.readAsDataURL(file);
    // reset input so same file can be re-selected
    e.target.value = "";
  }

  async function handleCropDone(blob: Blob) {
    setCropSrc(null);
    setLogoLoading(true);
    try {
      const fd = new FormData();
      fd.append("file", new File([blob], "logo.webp", { type: "image/webp" }));
      const res = await fetch("/api/upload-logo", { method: "POST", body: fd });
      if (!res.ok) throw new Error((await res.json()).error ?? "Upload failed");
      const { url } = await res.json();
      setForm((p) => ({ ...p, logoUrl: url }));
      toast.success("Logo uploaded!");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Logo upload failed");
    } finally {
      setLogoLoading(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Business name required");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/business", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      toast.success("Settings saved!");
    } catch {
      toast.error("Failed to save");
    } finally {
      setLoading(false);
    }
  }

  const trialLeft = Math.max(0, TRIAL_INVOICE_LIMIT - subscription.trialUsed);

  return (
    <div className="space-y-5">
      {cropSrc && (
        <LogoCropModal
          imageSrc={cropSrc}
          onDone={handleCropDone}
          onCancel={() => { setCropSrc(null); }}
        />
      )}
      {/* Account */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <User className="w-4 h-4" />
            Account
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          {userImage && (
            <Image
              src={userImage}
              alt={userName}
              width={48}
              height={48}
              className="rounded-full"
            />
          )}
          <div>
            <div className="font-medium text-gray-900">{userName}</div>
            <div className="text-sm text-gray-500">{userEmail}</div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto gap-1.5 text-gray-500"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </Button>
        </CardContent>
      </Card>

      {/* Subscription */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Subscription
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    subscription.status === "active" ? "success" : "secondary"
                  }
                  className="capitalize"
                >
                  {subscription.status}
                </Badge>
              </div>
              {subscription.status === "trial" && (
                <div className="text-sm text-gray-500 mt-1">
                  {trialLeft} free invoices remaining
                </div>
              )}
              {subscription.status === "active" && (
                <div className="text-sm text-gray-500 mt-1">
                  Unlimited invoices · ₹399/month
                </div>
              )}
            </div>
            {subscription.status !== "active" && (
              <Link href="/subscribe">
                <Button size="sm" className="gap-1.5">
                  Upgrade · ₹399/mo
                </Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Business profile */}
      <form onSubmit={handleSave}>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Business Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Logo */}
            <div>
              <Label>Business Logo</Label>
              <div className="mt-2 flex items-center gap-4">
                {form.logoUrl ? (
                  <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-200">
                    <Image
                      src={form.logoUrl}
                      alt="Logo"
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-200">
                    <Building2 className="w-6 h-6 text-gray-400" />
                  </div>
                )}
                <div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => fileRef.current?.click()}
                    disabled={logoLoading}
                  >
                    {logoLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4" />
                    )}
                    Upload Logo
                  </Button>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP · Max 10MB · You can crop after selecting</p>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoUpload}
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <Label htmlFor="name">Business Name *</Label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
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
                className="mt-1.5 uppercase"
                maxLength={15}
                placeholder="e.g. 01AAAAA0000A1Z5"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                type="tel"
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
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
                  className="mt-1.5"
                />
              </div>
            </div>

            <Button type="submit" className="w-full gap-2" disabled={loading}>
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save Changes
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
