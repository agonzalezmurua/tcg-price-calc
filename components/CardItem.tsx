"use client";

import { observer } from "mobx-react";
import { PokemonCard, PokemonCardVariant } from "pokemontcgsdk";
import { useContext } from "react";
import { FiPlus } from "react-icons/fi";
import { Card } from "~/components/Card";
import { CartContext } from "~/services/context/CartContext";

export const CardItem = observer(({ card }: { card: PokemonCard }) => {
  const cart = useContext(CartContext);
  return (
    <li className="flex gap-4">
      <Card name={card.name} image={card.images.small} className="h-80" />
      <section className="flex flex-col gap-2 flex-grow">
        <section>
          <h2 className="text-lg font-bold">
            {card.name} - {card.rarity}
          </h2>
          <h3>{card.set.name}</h3>
        </section>

        <section className="flex-grow space-y-2">
          <label htmlFor={`${card.id}-prices`}>Prices</label>
          <ul
            id={`${card.id}-prices`}
            className="list-inside flex flex-col gap-2"
          >
            {card.tcgplayer?.prices ? (
              Object.entries(card.tcgplayer?.prices ?? {}).map(
                ([name, price]) => (
                  <li key={name} className="flex items-center gap-2">
                    <button
                      className="border border-white rounded-lg p-2 aspect-square"
                      onClick={() => {
                        cart.add(card, name as PokemonCardVariant);
                      }}
                    >
                      <FiPlus />
                    </button>
                    <span>
                      {name}: ${price.market}
                    </span>
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
