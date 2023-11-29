import classNames from "classnames";
import { DarkThemeToggle, Flowbite, ThemeModeScript } from "flowbite-react";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
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
      <head>
        <ThemeModeScript />
      </head>
      <Flowbite>
        <body
          className={classNames(
            inter.className,
            "flex flex-col h-screen dark:bg-gray-900"
          )}
        >
          <header className="flex items-center">
            <h1 className="text-2xl text-center flex-grow">
              TCG Seller Quick Calculator
            </h1>
            <menu className="place-self-end flex justify-end p-2">
              <li>
                <DarkThemeToggle />
              </li>
            </menu>
          </header>
          <section className="p-4">{children}</section>
        </body>
      </Flowbite>
    </html>
  );
}
