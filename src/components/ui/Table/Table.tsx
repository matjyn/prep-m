import React, { type HTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes } from "react";
import "./table.styles.css";

export const Table: React.FC<HTMLAttributes<HTMLTableElement>> = ({
  children,
  className = "",
  ...props
}) => (
  <table
    className={`table ${className}`.trim()}
    {...props}
  >
    {children}
  </table>
);

export const TableHeader: React.FC<HTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  ...props
}) => <thead {...props}>{children}</thead>;

export const TableRow: React.FC<HTMLAttributes<HTMLTableRowElement>> = ({
  children,
  className = "",
  ...props
}) => (
  <tr
    className={`table-row ${className}`.trim()}
    {...props}
  >
    {children}
  </tr>
);

export const TableHeaderCell: React.FC<ThHTMLAttributes<HTMLTableCellElement>> = ({
  children,
  className = "",
  ...props
}) => (
  <th
    className={`table-header-cell ${className}`.trim()}
    {...props}
  >
    {children}
  </th>
);

export const TableBody: React.FC<HTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  ...props
}) => <tbody {...props}>{children}</tbody>;

export const TableCell: React.FC<TdHTMLAttributes<HTMLTableCellElement>> = ({
  children,
  className = "",
  ...props
}) => (
  <td
    className={`table-cell ${className}`.trim()}
    {...props}
  >
    {children}
  </td>
);

export { SortableTableHeaderCell } from "./SortableTableHeaderCell";
