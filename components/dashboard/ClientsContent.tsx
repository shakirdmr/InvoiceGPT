"use client";

import { Users, Phone, MapPin } from "lucide-react";
import { AddClientButton } from "@/components/dashboard/AddClientButton";
import { EditClientDialog } from "@/components/dashboard/EditClientDialog";
import { useClients } from "@/lib/hooks";

export function ClientsContent() {
  const { data: clients, isLoading } = useClients();

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Clients
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {isLoading ? (
              <span className="inline-block h-3.5 w-12 bg-gray-200 rounded animate-pulse" />
            ) : (
              `${clients?.length ?? 0} saved`
            )}
          </p>
        </div>
        <AddClientButton />
      </div>

      {isLoading ? (
        <div className="space-y-3 animate-pulse">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl" />
                  <div>
                    <div className="h-4 w-32 bg-gray-200 rounded" />
                    <div className="h-3 w-24 bg-gray-100 rounded mt-1.5" />
                  </div>
                </div>
                <div className="h-6 w-16 bg-gray-100 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      ) : clients?.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            No clients yet
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Clients are saved when you create an invoice with a new customer
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {clients?.map((client) => (
            <div
              key={client.id}
              className="bg-white rounded-2xl border border-gray-100 p-4 hover:border-gray-200 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-600">
                      {client.name[0].toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {client.name}
                    </div>
                    {client.gstin && (
                      <div className="text-xs text-gray-400">
                        GSTIN: {client.gstin}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">
                    {client._count.invoices} invoice
                    {client._count.invoices !== 1 ? "s" : ""}
                  </div>
                  <EditClientDialog client={client} />
                </div>
              </div>
              {(client.phone || client.address) && (
                <div className="mt-3 flex flex-wrap gap-3">
                  {client.phone && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Phone className="w-3 h-3" />
                      {client.phone}
                    </div>
                  )}
                  {client.address && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <MapPin className="w-3 h-3" />
                      {client.address}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
