"use client";
import { PokemonCard } from "pokemontcgsdk";
import { SearchResultItem } from "./SearchResultItem";

type CardSearchProps = {
  cards: PokemonCard[];
};

export function SearchResult({ cards }: CardSearchProps) {
  return (
    <section className="space-y-8">
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cards.map((card) => (
          <SearchResultItem key={card.id} card={card} />
        ))}
      </ul>
    </section>
  );
}
