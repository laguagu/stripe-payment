"use client";
import { signOut } from "@/app/actions";
import Button from "./button";
import { useState } from "react";

export default function SignOutButton() {
    const [error, setError] = useState<string | null>(null);
  
    const handleSignOut = async () => {
        try {
          await signOut();
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("An unknown error occurred");
          }
        }
      };
  
    return (
      <>
        <Button onClick={handleSignOut}>
          Kirjaudu ulos
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </>
    );
  }