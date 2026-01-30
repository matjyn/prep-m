import React, { useState, useRef, useMemo, useEffect } from "react";
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
import { formatPrice } from "../../utils/format";
import { Modal } from "../../components/ui/Modal/Modal";
import { Button } from "../../components/ui/Button/Button";
import { AssetDropdown } from "./AssetDropdown";

const HomePage: React.FC = () => {
  const limit = useRef<number>(10);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const desiredPageCount = useRef<number>(1);

  const { data, isError, isPending, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useQueryAssets({
      limit: limit.current,
      sortBy,
      sortOrder,
    });

  const allAssets = data?.pages.flat() || [];
  const currentPageCount = data?.pages.length || 0;

  useEffect(() => {
    if (
      !isPending &&
      !isFetchingNextPage &&
      currentPageCount < desiredPageCount.current &&
      hasNextPage
    ) {
      fetchNextPage();
    }
  }, [currentPageCount, isPending, isFetchingNextPage, hasNextPage, fetchNextPage]);

  const sortedAssets = useMemo(() => {
    let sorted = [...allAssets];
    if (sortBy === "current_price") {
      sorted.sort((a, b) => {
        if (sortOrder === "asc") {
          return a.current_price - b.current_price;
        } else {
          return b.current_price - a.current_price;
        }
      });
    }
    return sorted;
  }, [allAssets, sortBy, sortOrder]);

  const handleSort = (field: string) => {
    if (sortBy === field) {
      if (sortOrder === "asc") {
        setSortOrder("desc");
      } else {
        setSortBy(null);
        setSortOrder("asc");
      }
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const handleDropdownToggle = (assetId: string) => {
    setOpenDropdownId(openDropdownId === assetId ? null : assetId);
  };

  const closeDropdown = () => {
    setOpenDropdownId(null);
  };

  const handleShowMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
      desiredPageCount.current = currentPageCount + 1;
    }
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
                <TableRow key={asset.id}>
                  <TableCell>{asset.name}</TableCell>
                  <TableCell>{formatPrice(asset.current_price)}</TableCell>
                  <TableCell>
                    {asset.image ? (
                      <img
                        src={asset.image}
                        alt={asset.name}
                        className="w-4 h-4"
                      />
                    ) : (
                      <span>No icon</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      ref={(el) => {
                        if (el) dropdownRefs.current[asset.id] = el;
                      }}
                      onClick={() => handleDropdownToggle(asset.id)}
                    >
                      ⋮
                    </Button>
                    <AssetDropdown
                      isOpen={openDropdownId === asset.id}
                      onClose={closeDropdown}
                      anchorRef={{ current: dropdownRefs.current[asset.id] as HTMLElement }}
                    />
                  </TableCell>
                </TableRow>
              ))}
              {hasNextPage && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center cursor-pointer"
                    onClick={handleShowMore}
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
