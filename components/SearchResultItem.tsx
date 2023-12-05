"use client";

import classNames from "classnames";
import { Button, Label, Sidebar, Tooltip } from "flowbite-react";
import { observer } from "mobx-react";
import Link from "next/link";
import { PokemonCard, PokemonCardVariant } from "pokemontcgsdk";
import { useContext } from "react";
import { FiInfo, FiPlus } from "react-icons/fi";
import { Card } from "~/components/Card";
import { CartContext } from "~/services/context/CartContext";
import { useSearch } from "~/services/hooks/useSearch";

export const SearchResultItem = observer(
  ({ card, className }: { card: PokemonCard; className?: string }) => {
    const cart = useContext(CartContext);
    const { getUrl } = useSearch();

    return (
      <li
        className={classNames(
          "flex gap-4 flex-col sm:flex-row border bg-gray-100 border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded-2xl p-4",
          className
        )}
      >
        <Card name={card.name} image={card.images.small} className="h-80" />

        <section className="flex flex-col gap-2 flex-grow">
          <section>
            <h2 className="text-2xl font-bold">{card.name}</h2>
            <h3 className="text-lg">{card.rarity}</h3>
            <h3>
              <Link href={getUrl({ set: card.set.name })}>{card.set.name}</Link>
            </h3>
          </section>

          <section>
            <Label className="text-md font-bold" htmlFor={`${card.id}-prices`}>
              Prices
            </Label>
            <section></section>
            <ul
              id={`${card.id}-prices`}
              className="list-inside flex flex-col divide-y divide-white/25"
            >
              {card.tcgplayer?.prices ? (
                Object.entries(card.tcgplayer?.prices ?? {}).map(
                  ([name, price]) => (
                    <li
                      key={name}
                      className="flex flex-row items-center gap-2 py-2"
                    >
                      <Button
                        size="small"
                        color="success"
                        className="aspect-square h-8 border"
                        onClick={() => {
                          cart.add(card, name as PokemonCardVariant);
                        }}
                      >
                        <FiPlus />
                      </Button>
                      <span className="flex-grow">
                        {name}: ${price.market}
                      </span>
                      <Tooltip
                        className="place-self-end"
                        content={
                          <ul>
                            {Object.entries(price).map(([kind, kindPrice]) => (
                              <li key={kind} className="w-32">
                                {kind}: {kindPrice}
                              </li>
                            ))}
                          </ul>
                        }
                      >
                        <FiInfo />
                      </Tooltip>
                    </li>
                  )
                )
              ) : (
                <li>No listed prices</li>
              )}
            </ul>
          </section>
        </section>
      </li>
    );
  }
);
