import React, { useState, useRef, useMemo } from "react";
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
  const [limit] = useState(10);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const { data, isError, isPending, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useQueryAssets({
      limit,
    });

  const allAssets = data?.pages.flat() || [];

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
    } else if (sortBy === "name") {
      sorted.sort((a, b) => {
        if (sortOrder === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
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
