"use client";

import classNames from "classnames";
import { observer } from "mobx-react";
import { PokemonCardVariant } from "pokemontcgsdk";
import { useContext } from "react";
import { FiChevronRight, FiShoppingCart } from "react-icons/fi";
import { useBoolean } from "react-use";
import { CartContext } from "~/services/context/CartContext";

export const Cart = observer(() => {
  const cart = useContext(CartContext);
  const [open, toggle] = useBoolean(true);
  return (
    <>
      <section
        className={classNames(
          "fixed top-0 bottom-0 right-0 bg-black border border-white rounded-lg w-full max-w-xl transition-transform",
          {
            "translate-x-full": open === false,
          }
        )}
      >
        <section className="flex flex-col h-full">
          <ul className="flex-grow flex flex-col gap-2 p-4">
            {cart.items.map(({ card, amounts }) => (
              <>
                <li key={card.id}>
                  <h1 className="font-bold">
                    {card.name} - {card.set.name}
                  </h1>
                  <ul className="list-inside list-disc">
                    {Object.entries(amounts).map(([variant, amount]) => {
                      const price =
                        Math.round(
                          card.tcgplayer.prices[variant as PokemonCardVariant]
                            .market *
                            amount *
                            100
                        ) / 100;
                      return (
                        <li
                          key={[card.id, variant].join("_")}
                          className="flex items-center"
                        >
                          <FiChevronRight />
                          <span className="flex-grow">
                            {variant} x {amount}
                          </span>
                          <span>
                            {price}
                            USD
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </li>
                <hr className="border-gray-700 last:border-transparent" />
              </>
            ))}
          </ul>
          <hr />
          <section className="p-2">
            <h1 className="font-bold">Total: </h1>
          </section>
        </section>
      </section>

      <button
        className="fixed aspect-square flex items-center justify-center rounded-lg bottom-4 right-4 bg-black border border-white h-10 text-gray-100"
        onClick={() => toggle()}
      >
        <FiShoppingCart />
      </button>
    </>
  );
});
