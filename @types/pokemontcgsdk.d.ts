declare module "pokemontcgsdk" {
  type Legalities = Record<
    "unliminted" | "standard" | "expanded",
    "Legal" | "Banned" | undefined
  >;

  export type PokemonTCGCard = {
    id: string;
    name: string;
    supertype: string;
    subtypes: string[];
    level: string;
    hp: string;
    types: string[];
    evolvesFrom: string;
    evolvesTo: string[];
    rules: string[];
    ancientTrait?: Array<{ name: string; text: string }>;
    abilities: Ability[];
    attacks: Attack[];
    weaknesses: Array<{ type: Type; value: string }>;
    resistances: Array<{ type: Type; value: string }>;
    retreatCost: string[];
    cnvertedRetreatCost: number;
    set: PokemonTCGSets;
    number: string;
    artist: string;
    rarity: string;
    flavorText: string;
    nationalPokedexNumbers: number[];
    legalities: Legalities;
    regulationMark: string;
    images: {
      small: string;
      large: string;
    };
    tcgplayer: {
      url: string;
      updatedAt: string;
      prices: Record<PokemonCardVariant, TcgPlayerPrices>;
    };
  };

  export type PokemonCardVariant =
    | "normal"
    | "holoFoil"
    | "reverseHoloFoil"
    | "1stEditionHolofoil"
    | "1stEditionNormal";
  type Ability = {
    name: string;
    text: string;
    type: string;
  };
  type Attack = {
    name: string;
    cost: Type[];
    convertedEnergyCost: number;
    damage: string;
    text?: string;
  };
  type TcgPlayerPrices = {
    low: number;
    mid: number;
    high: number;
    market: number;
    directLow: number;
  };

  export type WhereResultOf<T> = {
    data: T[];
    page: number;
    pageSize: number;
    count: number;
    totalCount: 96;
  };

  type Type =
    | "Grass"
    | "Fire"
    | "Water"
    | "Lightning"
    | "Fighting"
    | "Pyschic"
    | "Colorless"
    | "Darkness"
    | "Metal"
    | "Dragon"
    | "Fairy";

  export type PokemonTCGSets = {
    id: string;
    name: string;
    series: string;
    printedTotal: number;
    total: number;
    legalities: Legalities;
    ptcgoCode: string;
    releaseDate: string;
    updatedAt: string;
    images: {
      symbol: string;
      logo: string;
    };
  };

  type Query = {
    q: string;
    pageSize?: number;
    orderBy?: string;
    page?: number;
  };

  class PokemonTCGSDK {
    configure(options: { apiKey: string }): void;
    card: {
      find(id: string): Promise<PokemonTCGCard | undefined>;
      where(query: Query): Promise<WhereResultOf<PokemonTCGCard>>;
      all(query: Query): Promise<PokemonTCGCard[]>;
    };
    set: {
      find(id: string): Promise<PokemonTCGSets | undefined>;
      where(query: Query): Promise<WhereResultOf<PokemonTCGSets>>;
      all(query: Query): Promise<PokemonTCGCard[]>;
    };
  }

  export default sdk = new PokemonTCGSDK();
}
