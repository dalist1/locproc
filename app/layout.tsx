import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Text File Location Processor",
  description: "Process text files to extract and display locations",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
