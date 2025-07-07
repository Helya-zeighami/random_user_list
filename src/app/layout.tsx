import type { Metadata } from "next";
import "./globals.css";
import ReactQueryWrapper from "./wrapper/reactQueryWrapper";
import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

export const metadata: Metadata = {
  title: "Random User",
  description: "Random User List",
};
const theme = createTheme({
  /** Put your mantine theme override here */
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryWrapper>
        <MantineProvider theme={theme}>
          <body>{children}</body>
        </MantineProvider>
      </ReactQueryWrapper>
    </html>
  );
}
