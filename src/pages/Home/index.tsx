import React, { useState } from "react";
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

const Home: React.FC = () => {
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const { data, isError, isFetching } = useQueryAssets(limit, 0, sortBy || undefined, sortOrder);

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

  return (
    <div className="animateIn">
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
              {data?.map((asset: Asset) => (
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
                  <TableCell className="text-right">▼</TableCell>
                </TableRow>
              ))}
              {data && data.length > 0 && (
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
