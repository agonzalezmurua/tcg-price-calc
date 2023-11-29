import { Cart } from "~/components/Cart";
import { PaginationControls } from "~/components/PaginationControls";
import { SearchFilters } from "~/components/SearchFilters";
import { SearchResult } from "~/components/SearchResult";
import pokemonsdk from "~/services/api/pokemon";
import { CartContextProvider } from "~/services/context/CartContext";

type SearchPageProps = {
  searchParams: { name: string; page: number };
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const {
    data,
    totalCount,
    pageSize,
    page: currentPage,
  } = await pokemonsdk.card.where({
    q: `name:"${searchParams.name}"`,
    orderBy: "-set.releaseDate",
    pageSize: 10,
    page: searchParams.page,
  });

  return (
    <section className="relative space-y-4">
      <CartContextProvider>
        <SearchFilters />
        <PaginationControls
          className="sticky top-0 z-10"
          currentPage={currentPage}
          totalPages={Math.round(totalCount / pageSize)}
        />
        <SearchResult cards={data} />
        <Cart />
      </CartContextProvider>
    </section>
  );
}
