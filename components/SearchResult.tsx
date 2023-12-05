"use client";
import { PokemonCard } from "pokemontcgsdk";
import { SearchResultItem } from "./SearchResultItem";
import classNames from "classnames";

type CardSearchProps = {
  className?: string;
  cards: PokemonCard[];
};

export function SearchResult({ cards, className }: CardSearchProps) {
  return (
    <section className={classNames("space-y-8", className)}>
      <ul className="grid grid-cols-1 2xl:grid-cols-2 gap-4">
        {cards.map((card) => (
          <SearchResultItem key={card.id} card={card} />
        ))}
      </ul>
    </section>
  );
}
