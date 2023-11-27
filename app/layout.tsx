import classNames from "classnames";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Search } from "~/components/Search";
import "./globals.css";

const inter = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TCG Seller Quick Calculator",
  description: "Search and get the price for quick and dirty selling",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={classNames(
          inter.className,
          "flex flex-col h-screen text-gray-100"
        )}
      >
        <section className="p-4">
          <Search />
        </section>

        <section className="p-4">{children}</section>
      </body>
    </html>
  );
}
