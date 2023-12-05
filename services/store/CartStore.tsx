"use client";

import { makeAutoObservable } from "mobx";
import { PokemonTCGCard, PokemonCardVariant } from "pokemontcgsdk";

type CartItem = {
  card: PokemonTCGCard;
  amounts: Partial<Record<PokemonCardVariant, number>>;
};

export class CartStore {
  constructor() {
    makeAutoObservable(this);
  }

  public readonly items: CartItem[] = [];

  add(card: PokemonTCGCard, which: PokemonCardVariant) {
    const item = this.items.find(({ card: { id } }) => id === card.id);

    if (!item) {
      this.items.push({ card: card, amounts: { [which]: 1 } });
      return;
    }

    const exists = Boolean(item.amounts[which]);

    if (exists) {
      item.amounts[which]!++;
    } else {
      item.amounts[which] = 1;
    }
  }
}
