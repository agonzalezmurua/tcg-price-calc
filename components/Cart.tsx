"use client";

import { Button, ButtonColors, Modal } from "flowbite-react";
import { observer } from "mobx-react";
import { PokemonCardVariant } from "pokemontcgsdk";
import { useContext, useRef } from "react";
import { FiChevronRight, FiShoppingCart, FiX } from "react-icons/fi";
import { useBoolean } from "react-use";
import { CartContext } from "~/services/context/CartContext";

export const Cart = observer(() => {
  const cart = useContext(CartContext);
  const [open, toggle] = useBoolean(false);

  function toggleClose() {
    toggle(false);
  }
  function toggleOpen() {
    toggle(true);
  }
  return (
    <>
      <Button
        color="dark"
        data-open={open}
        className="fixed aspect-square bottom-4 right-4 transition-opacity data-[open=true]:opacity-0"
        onClick={toggleOpen}
      >
        <FiShoppingCart />
      </Button>
      <Modal show={open} onClose={toggleClose}>
        <Modal.Header></Modal.Header>
        <Modal.Body className="flex flex-col h-full">
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
        </Modal.Body>
        <Modal.Footer>
          <h1 className="font-bold flex-grow">Total: </h1>
        </Modal.Footer>
      </Modal>
    </>
  );
});
