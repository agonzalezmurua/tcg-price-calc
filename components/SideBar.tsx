import { observer } from "mobx-react";
import { Cart } from "~/services/store/Cart";
import { Card } from "./Card";

export const Sidebar = observer(({ cart }: { cart: Cart }) => {
  return (
    <div>
      <ul>
        {cart.cards.map(({ card, amount }) => (
          <li key={card.id}>
            <section>
              {card.name} x {amount}
            </section>
            <Card name={card.name} image={card.images.small} />
          </li>
        ))}
      </ul>
    </div>
  );
});
