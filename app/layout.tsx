import cx from "classnames";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import dayjs from "dayjs";

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
        className={cx("p-6", inter.className)}
        suppressHydrationWarning={true}
      >
        <Link href="/">
          <h1 className="text-2xl">{String(metadata.title)}</h1>
        </Link>

        <h2 className="mb-4">{metadata.description}</h2>

        {children}

        <div className="mt-4 text-sm text-gray-400 text-center">
          Created and maintained by{" "}
          <a className="underline" href="https://bartkozal.com" target="_blank">
            Bartłomiej Kozal
          </a>
          . {dayjs().year()}.
        </div>
      </body>
    </html>
  );
}
