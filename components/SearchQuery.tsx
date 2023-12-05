"use client";

import { Button, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useRef } from "react";
import { useSearch } from "~/services/hooks/useSearch";

export function SearchQuery() {
  const { query, search: update } = useSearch();
  const input = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const dialog = useRef<HTMLDialogElement>(null);

  const handleSearch = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const name = input.current!.value;

      update({ name });
    },
    [router]
  );

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <TextInput
        ref={input}
        placeholder="Card Name"
        defaultValue={query.name}
        type="text"
        className="w-full"
      />
      <Button type="submit">Search</Button>
    </form>
  );
}
