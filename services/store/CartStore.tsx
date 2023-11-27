"use client";

import { makeAutoObservable } from "mobx";
import { PokemonCard, PokemonCardVariant } from "pokemontcgsdk";

type CartItem = {
  card: PokemonCard;
  amounts: Partial<Record<PokemonCardVariant, number>>;
};

export class CartStore {
  constructor() {
    makeAutoObservable(this);
  }

  public readonly items: CartItem[] = [];

  add(card: PokemonCard, which: PokemonCardVariant) {
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
