import React, { type HTMLAttributes } from "react";
import "./table.styles.css";

export const Table: React.FC<HTMLAttributes<HTMLTableElement>> = ({ children, ...props }) => (
  <table
    className="custom-table"
    {...props}
  >
    {children}
  </table>
);

export const TableHeader: React.FC<HTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  ...props
}) => <thead {...props}>{children}</thead>;

export const TableRow: React.FC<HTMLAttributes<HTMLTableRowElement>> = ({ children, ...props }) => (
  <tr
    className="custom-table-row"
    {...props}
  >
    {children}
  </tr>
);

export const TableHeaderCell: React.FC<HTMLAttributes<HTMLTableCellElement>> = ({
  children,
  ...props
}) => (
  <th
    className="custom-table-header-cell"
    {...props}
  >
    {children}
  </th>
);

export const TableBody: React.FC<HTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  ...props
}) => <tbody {...props}>{children}</tbody>;

export const TableCell: React.FC<HTMLAttributes<HTMLTableCellElement>> = ({
  children,
  ...props
}) => (
  <td
    className="custom-table-cell"
    {...props}
  >
    {children}
  </td>
);
