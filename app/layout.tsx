import cx from "classnames";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Game Night",
  description: "Select board games for your next game night!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cx("p-6", inter.className)}>
        <h1 className="text-2xl">Game Night</h1>
        <h2 className="mb-4">{metadata.description}</h2>

        {children}
      </body>
    </html>
  );
}
