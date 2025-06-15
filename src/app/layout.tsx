import type { Metadata } from "next";
import "./globals.css";
import ReactQueryWrapper from "./wrapper/reactQueryWrapper";

export const metadata: Metadata = {
  title: "Random User",
  description: "Random User List",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryWrapper>
        <body>{children}</body>
      </ReactQueryWrapper>
    </html>
  );
}
