"use server";

import convertToSubcurrency from "./convertToSubcurrency";
import { stripe } from "./stripe";

export async function createPaymentIntent(amount: number): Promise<string> {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: convertToSubcurrency(amount),
      currency: "eur",
      automatic_payment_methods: { enabled: true },
    });

    if (!paymentIntent.client_secret) {
      throw new Error("Client secret puuttuu payment intent -vastauksesta");
    }

    return paymentIntent.client_secret;
  } catch (error) {
    console.error("Virhe luotaessa payment intentiä:", error);
    throw new Error("Maksun valmistelu epäonnistui");
  }
}
