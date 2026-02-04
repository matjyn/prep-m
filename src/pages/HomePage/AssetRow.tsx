import React from "react";
import { TableRow, TableCell } from "../../components/ui/Table/Table";
import type { Asset } from "../../types/api/assets";
import { AssetDropdown } from "./AssetDropdown";

interface AssetRowProps {
  asset: Asset;
}

const AssetRow: React.FC<AssetRowProps> = ({ asset }) => {
  return (
    <TableRow>
      <TableCell>{asset.name}</TableCell>
      <TableCell>US$ {asset.current_price}</TableCell>
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
        <AssetDropdown />
      </TableCell>
    </TableRow>
  );
};

export { AssetRow };
