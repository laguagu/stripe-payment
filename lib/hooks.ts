"use client";

import { useState, useEffect } from "react";
import { createPaymentIntent } from "@/lib/actions";

export function useCreatePaymentIntent(amount: number) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPaymentIntent() {
      try {
        const secret = await createPaymentIntent(amount);
        setClientSecret(secret);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Tuntematon virhe"));
      }
    }

    fetchPaymentIntent();
  }, [amount]);

  return { clientSecret, error };
}
