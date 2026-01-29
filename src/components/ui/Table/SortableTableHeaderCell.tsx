import React from "react";
import { TableHeaderCell } from "./Table";

interface SortableTableHeaderCellProps {
  field: string;
  sortBy: string | null;
  sortOrder: "asc" | "desc";
  onSort: (field: string) => void;
  children: React.ReactNode;
  className?: string;
}

export const SortableTableHeaderCell: React.FC<SortableTableHeaderCellProps> = ({
  field,
  sortBy,
  sortOrder,
  onSort,
  children,
  className = "",
}) => {
  const isActive = sortBy === field;
  const arrow = isActive ? (sortOrder === "asc" ? "↓" : "↑") : "";

  return (
    <TableHeaderCell
      onClick={() => onSort(field)}
      className={`cursor-pointer ${className}`.trim()}
    >
      {children} {arrow}
    </TableHeaderCell>
  );
};
