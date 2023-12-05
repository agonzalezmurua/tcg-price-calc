import { Label, Select, Sidebar } from "flowbite-react";
import { PokemonTCGCard, WhereResultOf } from "pokemontcgsdk";
import { stringify } from "qs";
import { Cart } from "~/components/Cart";
import { PaginationControls } from "~/components/PaginationControls";
import { SearchFilters } from "~/components/SearchFilters";
import { SearchQuery } from "~/components/SearchQuery";
import { SearchResult } from "~/components/SearchResult";
import { CartContextProvider } from "~/services/context/CartContext";
import { SearchQueryType } from "~/services/hooks/useSearch";

type SearchPageProps = {
  searchParams: SearchQueryType;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const {
    data: cards,
    totalCount,
    pageSize,
    page: currentPage,
  } = await fetch(
    "https://api.pokemontcg.io/v2/cards" +
      "?" +
      stringify({
        get q() {
          const q: string[] = [];
          if (searchParams.name) {
            q.push(`name:"${searchParams.name}"`);
          }
          if (searchParams.set) {
            q.push(`set.name:"${searchParams.set}"`);
          }

          if (searchParams.sortBy) {
          }

          return q.join(" ");
        },
        get orderBy() {
          const orderBy: string[] = ["-set.releaseDate"];

          if (searchParams.sortBy === "setNumber") {
            orderBy.push("number");
          }

          return orderBy.join(",");
        },
        pageSize: 50,
        page: searchParams.page,
      }),
    {
      method: "GET",
      headers: {
        "X-Api-Key": process.env.POKEMONTCG_APIKEY!,
      },
      next: {
        revalidate: 60 * 15,
      },
    }
  )
    .then((r) => r.json())
    .then((result: WhereResultOf<PokemonTCGCard>) => {
      const getHighestPriceOf = (card: PokemonTCGCard) => {
        return Object.values(card.tcgplayer.prices).sort(
          (a, b) => a.market - b.market
        )[0].market;
      };

      if (searchParams.sortBy) {
        result.data = result.data.toSorted(
          (a, b) => -getHighestPriceOf(a) - -getHighestPriceOf(b)
        );
      }

      return result;
    });

  const { data: sets } = await fetch(
    "https://api.pokemontcg.io/v2/sets" +
      "?" +
      stringify({
        get q() {
          const query: string[] = [];

          if (searchParams.legal) {
            query.push(`legalities.${searchParams.legal}:Legal`);
          }

          return query.join(" ");
        },
        orderBy: "-releaseDate",
      }),
    {
      method: "GET",
      headers: {
        "X-Api-Key": process.env.POKEMONTCG_APIKEY!,
      },
      next: {
        revalidate: 60 * 15,
      },
    }
  ).then((r) => r.json());

  return (
    <section className="relative space-y-4 max-w-[1920px] mx-auto">
      <CartContextProvider>
        <SearchQuery />
        <section className="sticky dark:bg-gray-900/90 backdrop-blur-sm top-0 z-10 py-4 pb-6">
          <PaginationControls
            currentPage={currentPage}
            totalPages={Math.round(totalCount / pageSize)}
          />
        </section>
        <section className="grid grid-cols-3 lg:grid-cols-6 gap-4">
          <SearchFilters className="col-span-1 lg:col-span-2" sets={sets} />
          <SearchResult className="col-span-2 lg:col-span-4" cards={cards} />
        </section>
        <Cart />
      </CartContextProvider>
    </section>
  );
}
