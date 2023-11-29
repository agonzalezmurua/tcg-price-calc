"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import qs from "qs";

type SearchProps = {
  page: number;
};

type SearchQuery = {
  page: number;
  name: string;
};

export function useSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = useMemo(() => {
    const page = searchParams.get("page");

    return {
      name: searchParams.get("name") ?? "",
      page: page ? 1 : Number(page),
    };
  }, [searchParams]);

  const update = useCallback(function (query: Partial<SearchQuery>) {
    const newQuery = { ...searchQuery, ...query };

    router.push("?" + qs.stringify(newQuery));
  }, []);

  return { update, query: searchQuery };
}
