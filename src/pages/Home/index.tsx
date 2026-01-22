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

const Home: React.FC = () => {
  const [limit, setLimit] = useState(10);
  const { data, isLoading, isError, isFetching } = useQueryAssets(limit);

  return (
    <div>
      <h1>Crypto Assets</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error loading assets.</div>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Price (USD)</TableHeaderCell>
                <TableHeaderCell>Icon</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((asset: Asset) => (
                <TableRow key={asset.id}>
                  <TableCell>{asset.name}</TableCell>
                  <TableCell>
                    {asset.price
                      ? asset.price.toLocaleString(undefined, {
                          style: "currency",
                          currency: "USD",
                        })
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {asset.iconUrl ? (
                      <img
                        src={asset.iconUrl}
                        alt={asset.name}
                        style={{ width: 24, height: 24 }}
                      />
                    ) : (
                      <span>No icon</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <button>:</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div style={{ marginTop: 16 }}>
            <button
              onClick={() => setLimit((l) => l + 10)}
              disabled={isFetching}
            >
              {isFetching ? "Loading..." : "Show 10 more"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
