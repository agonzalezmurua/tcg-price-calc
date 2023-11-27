import pokemonsdk from "~/services/api/pokemon";
import { CartContextProvider } from "~/services/context/CartContext";
import { CartItem } from "../components/CartItem";
import { Cart } from "~/components/Cart";

export default async function Search({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const { q } = searchParams;
  const result = await pokemonsdk.card.where({
    q: q,
    orderBy: "-set.releaseDate",
  });

  return (
    <section className="relative">
      <CartContextProvider>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {result.data.map((card) => (
            <CartItem key={card.id} card={card} />
          ))}
        </ul>
        <Cart />
      </CartContextProvider>
    </section>
  );
}
