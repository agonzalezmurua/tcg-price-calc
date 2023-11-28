"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useCallback, useRef } from "react";
import qs from "qs";

export function Search() {
  const input = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleSearch = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const query = input.current!.value;

      router.push("/" + "?" + qs.stringify({ q: query }));
    },
    [router]
  );

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <input
        ref={input}
        defaultValue={searchParams.get("q") ?? ""}
        type="text"
        className="bg-transparent border border-white rounded-lg px-2 py-1 flex-grow"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-white text-black rounded-lg"
      >
        Search
      </button>
    </form>
  );
}
