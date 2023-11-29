"use client";

import classNames from "classnames";
import { Pagination } from "flowbite-react";
import { useSearch } from "~/services/hooks/useSearch";

type PaginationControlsProps = {
  className?: string;
  currentPage: number;
  totalPages: number;
};

export function PaginationControls({
  currentPage,
  totalPages,
  className,
}: PaginationControlsProps) {
  const { update } = useSearch();

  return (
    <section className={classNames("flex flex-wrap justify-center", className)}>
      <Pagination
        showIcons
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          update({ page: page });
        }}
      />
    </section>
  );
}
