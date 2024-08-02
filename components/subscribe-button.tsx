"use client";

import React from "react";
import Link from "next/link";

interface SubscriptionButtonProps {
  type: "monthly" | "yearly";
  userEmail: string;
}

const SubscriptionButton: React.FC<SubscriptionButtonProps> = ({
  type,
  userEmail,
}) => {
  const monthlyLink = process.env.NEXT_PUBLIC_STIPE_MONTHLY_SUBSCIBER_LINK;
  const yearlyLink = process.env.NEXT_PUBLIC_STIPE_YEARLY_SUBSCIBER_LINK;

  const baseLink = type === "monthly" ? monthlyLink : yearlyLink;

  if (!baseLink) {
    console.error("Payment link is not defined");
    return null;
  }

  // Append the userEmail as a query parameter
  const paymentLink = `${baseLink}?prefilled_email=${encodeURIComponent(
    userEmail
  )}`;

  return (
    <Link
      href={paymentLink}
      className={`px-4 py-2 rounded ${
        type === "monthly" ? "bg-blue-500" : "bg-green-500"
      } text-white`}
    >
      {type === "monthly" ? "Kuukausitilaus" : "Vuosittainen tilaus"}
    </Link>
  );
};

export default SubscriptionButton;
