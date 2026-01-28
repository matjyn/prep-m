import React, { useState, useMemo, useRef } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from "../../components/ui/Table/Table";
import { useQueryAssets } from "../../queries/useQueryAssets";
import type { Asset } from "../../types/api/assets";
import { formatPrice } from "../../utils/format";
import { Modal } from "../../components/ui/Modal/Modal";
import { Dropdown } from "../../components/ui/Dropdown/Dropdown";
import Button from "../../components/ui/Button/Button";

const Home: React.FC = () => {
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const { data, isError, isFetching } = useQueryAssets(
    limit,
    0,
    sortBy === "name" ? sortBy : undefined,
    sortOrder,
  );

  const sortedData = useMemo(() => {
    if (!data) return data;
    if (sortBy === "price") {
      return [...data].sort((a, b) => {
        const aPrice = a.price;
        const bPrice = b.price;
        if (sortOrder === "asc") {
          return aPrice - bPrice;
        } else {
          return bPrice - aPrice;
        }
      });
    }
    return data;
  }, [data, sortBy, sortOrder]);

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
        isOpen={isFetching}
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
                <TableHeaderCell
                  onClick={() => handleSort("name")}
                  className="cursor-pointer"
                >
                  Name {sortBy === "name" ? (sortOrder === "asc" ? "↓" : "↑") : ""}
                </TableHeaderCell>
                <TableHeaderCell
                  onClick={() => handleSort("price")}
                  className="cursor-pointer"
                >
                  Price (USD) {sortBy === "price" ? (sortOrder === "asc" ? "↓" : "↑") : ""}
                </TableHeaderCell>
                <TableHeaderCell>Icon</TableHeaderCell>
                <TableHeaderCell></TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData?.map((asset: Asset) => (
                <TableRow key={asset.id}>
                  <TableCell>{asset.name}</TableCell>
                  <TableCell>{formatPrice(asset.price)}</TableCell>
                  <TableCell>
                    {asset.iconUrl ? (
                      <img
                        src={asset.iconUrl}
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
                    {dropdownRefs.current[asset.id] && (
                      <Dropdown
                        anchorRef={{
                          current: dropdownRefs.current[asset.id] as HTMLElement,
                        }}
                        isOpen={openDropdownId === asset.id}
                        onClose={closeDropdown}
                      >
                        <div
                          className="w-full px-4 py-2 cursor-pointer"
                          onClick={closeDropdown}
                        >
                          Buy
                        </div>
                        <div
                          className="w-full px-4 py-2 cursor-pointer"
                          onClick={() => setOpenDropdownId(null)}
                        >
                          Sell
                        </div>
                      </Dropdown>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {sortedData && sortedData.length > 0 && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center cursor-pointer"
                    onClick={() => !isFetching && setLimit((l) => l + 10)}
                  >
                    {isFetching ? "Loading..." : "Show more"}
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

export default Home;
