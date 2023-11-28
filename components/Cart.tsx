"use client";

import classNames from "classnames";
import { observer } from "mobx-react";
import { PokemonCardVariant } from "pokemontcgsdk";
import { useContext, useEffect, useRef } from "react";
import { FiChevronRight, FiShoppingCart, FiX } from "react-icons/fi";
import { useBoolean } from "react-use";
import { CartContext } from "~/services/context/CartContext";

export const Cart = observer(() => {
  const cart = useContext(CartContext);
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, toggle] = useBoolean(false);

  function toggleClose() {
    dialog.current?.close();
    toggle(false);
  }
  function toggleOpen() {
    dialog.current?.showModal();
    toggle(true);
  }
  return (
    <>
      <button
        data-open={open}
        className="fixed aspect-square flex items-center justify-center rounded-lg bottom-4 right-4 bg-black border border-white h-10 text-gray-100 transition-opacity data-[open=true]:opacity-0"
        onClick={toggleOpen}
      >
        <FiShoppingCart />
      </button>
      <dialog
        ref={dialog}
        className="text-white bg-black border border-white rounded-lg w-full max-w-xl backdrop:backdrop-grayscale max-h-screen h-[512px]"
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
          <section className="p-2 flex">
            <h1 className="font-bold flex-grow">Total: </h1>
            <button className="font-bold" onClick={toggleClose}>
              <FiX />
            </button>
          </section>
        </section>
      </dialog>
    </>
  );
});
