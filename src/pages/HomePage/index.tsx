import React, { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  SortableTableHeaderCell,
} from "../../components/ui/Table/Table";
import { useQueryAssets } from "../../queries/useQueryAssets";
import type { Asset } from "../../types/api/assets";
import { Modal } from "../../components/ui/Modal/Modal";
import { AssetRow } from "./AssetRow";

const HomePage: React.FC = () => {
  const [limit] = useState(10);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const { data, isError, isPending, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useQueryAssets({
      limit,
    });

  const allAssets = data?.pages.flat() || [];

  const sortedAssets = useMemo(() => {
    const sorted = [...allAssets];

    if (sortBy === "current_price") {
      const dir = sortOrder === "asc" ? 1 : -1;
      sorted.sort((a, b) => (a.current_price - b.current_price) * dir);
    } else if (sortBy === "name") {
      const dir = sortOrder === "asc" ? 1 : -1;
      sorted.sort((a, b) => a.name.localeCompare(b.name) * dir);
    }

    return sorted;
  }, [allAssets, sortBy, sortOrder]);

  const handleSort = (field: string) => {
    if (sortBy !== field) {
      setSortBy(field);
      setSortOrder("asc");
      return;
    }

    const nextOrder = sortOrder === "asc" ? "desc" : "asc";
    const shouldClear = sortOrder === "desc";

    setSortBy(shouldClear ? null : field);
    setSortOrder(shouldClear ? "asc" : nextOrder);
  };

  return (
    <div className="animateIn">
      <Modal
        isOpen={isPending}
        onClose={() => {}}
        className="w-auto"
      >
        Loading...
      </Modal>

      <h1>Crypto Assets</h1>

      {isError ? (
        <div className="animateIn">Error loading assets.</div>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <SortableTableHeaderCell
                  field="name"
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                >
                  Name
                </SortableTableHeaderCell>
                <SortableTableHeaderCell
                  field="current_price"
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                >
                  Price (USD)
                </SortableTableHeaderCell>
                <TableHeaderCell>Icon</TableHeaderCell>
                <TableHeaderCell></TableHeaderCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {sortedAssets?.map((asset: Asset) => (
                <AssetRow
                  key={asset.id}
                  asset={asset}
                />
              ))}

              {hasNextPage && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center cursor-pointer"
                    onClick={() => fetchNextPage()}
                  >
                    {isFetchingNextPage ? "Loading..." : "Show more"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
};

export { HomePage };
