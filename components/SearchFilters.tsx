"use client";

import classNames from "classnames";
import { Button, Select } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { PokemonTCGSets } from "pokemontcgsdk";
import { ReactNode } from "react";
import { useSearch } from "~/services/hooks/useSearch";

export function SearchFilters({
  className,
  sets,
}: {
  className?: string;
  sets: PokemonTCGSets[];
}) {
  const { getUrl, search, query } = useSearch();

  return (
    <section
      className={classNames(
        "h-fit dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-4 space-y-4",
        className
      )}
    >
      <SearchFilterItem title={"Format"}>
        <ul className="grid grid-cols-3 gap-2">
          <li>
            <Button
              id="filter.legal.standard"
              color={query.legal === "standard" ? "green" : "gray"}
              href={getUrl({ legal: "standard" })}
            >
              Standard
            </Button>
          </li>
          <li>
            <Button
              id="filter.legal.expanded"
              color={query.legal === "expanded" ? "green" : "gray"}
              href={getUrl({ legal: "expanded" })}
            >
              Expanded
            </Button>
          </li>
          <li>
            <Button
              id="filter.legal.unlimited"
              color={query.legal === "unlimited" ? "green" : "gray"}
              href={getUrl({ legal: "unlimited" })}
            >
              Unlimited
            </Button>
          </li>
        </ul>
      </SearchFilterItem>
      <SearchFilterItem title={"Set"}>
        <ul className="grid gap-2 grid-cols-2 border-l dark:border-gray-600 pl-2">
          {sets.map((set) => (
            <li key={set.id}>
              <Button
                color={query.set === set.name ? "green" : "gray"}
                href={getUrl({ set: set.name })}
              >
                <Image
                  src={set.images.symbol}
                  width={16}
                  height={16}
                  alt="Symbol"
                  className="self-start"
                />
                <span className="ml-2">{set.name}</span>
              </Button>
            </li>
          ))}
        </ul>
      </SearchFilterItem>
    </section>
  );
}

function SearchFilterItem({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-2">
      <h1 className="text-lg font-bold">{title}</h1>
      {children}
    </section>
  );
}
