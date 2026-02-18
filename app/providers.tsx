"use client";

import { SWRConfig } from "swr";

class FetchError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new FetchError("Request failed", r.status);
    return r.json();
  });

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: true,
        revalidateIfStale: true,
        dedupingInterval: 5000,
        onErrorRetry(error, _key, _config, revalidate, { retryCount }) {
          // Never retry on 401/403 — user needs to re-auth, retrying won't help
          if (error instanceof FetchError && (error.status === 401 || error.status === 403)) return;
          if (retryCount >= 3) return;
          setTimeout(() => revalidate({ retryCount }), 5000);
        },
      }}
    >
      {children}
    </SWRConfig>
  );
}
