"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export function AddClientButton() {
  return (
    <Link href="/invoices/new">
      <Button className="gap-2" size="sm">
        <Plus className="w-4 h-4" />
        <span className="hidden sm:inline">Add via Invoice</span>
        <span className="sm:hidden">Add</span>
      </Button>
    </Link>
  );
}
