import "./globals.css";
import SignOutButton from "@/components/signout-button";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <SignOutButton />
      </body>
    </html>
  );
}
