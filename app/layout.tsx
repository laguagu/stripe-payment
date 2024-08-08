import SignOutButton from "@/components/signout-button";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fi">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased bg-gradient-to-b from-gray-50 to-gray-100",
          fontSans.variable
        )}
      >
        {children}
        <SignOutButton />
      </body>
    </html>
  );
}