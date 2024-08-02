import React from "react";
import SubscriptionButton from "@/components/subscribe-button";

function Page() {
  const userEmail = "Joni@gmail.com";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h1 className="text-2xl font-bold">Valitse tilaus</h1>
      <SubscriptionButton type="monthly" userEmail={userEmail} />
      <SubscriptionButton type="yearly" userEmail={userEmail} />
    </div>
  );
}

export default Page;
