import cx from "classnames";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import dayjs from "dayjs";
import Image from "next/image";
import logoSrc from "./logo.png";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Game Night",
  description: "Select games for the next board games night!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cx("p-6 bg-[#1E1E1E] text-gray-200", inter.className)}
        suppressHydrationWarning
      >
        <header className="max-w-sm mx-auto flex justify-center">
          <div className="w-1/2 mb-4">
            <Link href="/">
              <Image src={logoSrc} alt={String(metadata.title)} />
            </Link>
          </div>
        </header>

        <main>{children}</main>

        <footer className="max-w-sm mx-auto flex justify-center">
          <div className="mt-4 text-sm text-gray-500 text-center">
            Created and maintained by{" "}
            <a
              className="underline"
              href="https://bartkozal.com"
              target="_blank"
            >
              Bartłomiej Kozal
            </a>
            . {dayjs().year()}.
          </div>
        </footer>
      </body>
    </html>
  );
}
