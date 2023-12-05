"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import qs from "qs";
import { useBoolean } from "react-use";

export type SearchQueryType = {
  page: number;
  set: string;
  name: string;
  legal: string;
  sortBy: string;
};

export function useSearch() {
  const router = useRouter();
  const [isLoading, setLoading] = useBoolean(true);
  const searchParams = useSearchParams();
  const currentQuery = useMemo<SearchQueryType>(() => {
    const page = searchParams.get("page") ?? "1";

    return {
      name: searchParams.get("name") ?? "",
      page: Number(page),
      set: searchParams.get("set") ?? "",
      legal: searchParams.get("legal") ?? "",
      sortBy: searchParams.get("sortBy") ?? "",
    };
  }, [searchParams]);
  const getUrl = useCallback(
    (query: Partial<SearchQueryType>): string => {
      const newQuery = { ...currentQuery, ...query };

      if (currentQuery.name !== newQuery.name) {
        newQuery.page = 1;
      }

      if (currentQuery.set !== newQuery.set) {
        newQuery.page = 1;
      }

      if (query.legal === currentQuery.legal) {
        newQuery.legal = "";
      }

      return "?" + qs.stringify(newQuery);
    },
    [currentQuery]
  );

  const search = useCallback(
    function (query: Partial<SearchQueryType>) {
      setLoading(true);

      const url = getUrl(query);

      router.push(url);

      setLoading(false);
    },
    [currentQuery]
  );

  return { search, query: currentQuery, getUrl, isLoading };
}
