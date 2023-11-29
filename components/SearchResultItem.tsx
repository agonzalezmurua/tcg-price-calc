"use client";

import { observer } from "mobx-react";
import { PokemonCard, PokemonCardVariant } from "pokemontcgsdk";
import { useContext } from "react";
import { FiInfo, FiPlus } from "react-icons/fi";
import { Card } from "~/components/Card";
import { CartContext } from "~/services/context/CartContext";
import { Button, Label, Tooltip } from "flowbite-react";

export const SearchResultItem = observer(({ card }: { card: PokemonCard }) => {
  const cart = useContext(CartContext);
  return (
    <li className="flex gap-4 flex-col sm:flex-row">
      <Card name={card.name} image={card.images.small} className="h-80" />
      <section className="flex flex-col gap-2 flex-grow">
        <section>
          <h2 className="text-lg font-bold">
            {card.name} - {card.rarity}
          </h2>
          <h3>{card.set.name}</h3>
        </section>

        <section className="flex-grow space-y-2">
          <Label className="font-bold" htmlFor={`${card.id}-prices`}>
            Prices
          </Label>
          <ul
            id={`${card.id}-prices`}
            className="list-inside flex flex-col gap-2"
          >
            {card.tcgplayer?.prices ? (
              Object.entries(card.tcgplayer?.prices ?? {}).map(
                ([name, price]) => (
                  <li key={name} className="flex items-center gap-2">
                    <Button
                      size="small"
                      color="success"
                      className="aspect-square border"
                      onClick={() => {
                        cart.add(card, name as PokemonCardVariant);
                      }}
                    >
                      <FiPlus />
                    </Button>
                    <span>
                      {name}: ${price.market}
                    </span>
                    <Tooltip
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
              <span>No listed prices found</span>
            )}
          </ul>
        </section>
      </section>
    </li>
  );
});
