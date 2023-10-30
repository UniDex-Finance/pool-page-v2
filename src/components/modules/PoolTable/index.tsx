import {
  useReactTable,
  createColumnHelper,
  TableOptions,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Card } from "@material-tailwind/react";
import { PoolRow } from "../../../types";

const ROWS_TEST: PoolRow[] = [
  {
    chainId: 10,
    collateral: "DAI",
    tvl: 123,
    apr: 456,
    amountDeposit: 123,
    amountClaim: 456,
  },
  {
    chainId: 42161,
    collateral: "DAI",
    tvl: 123,
    apr: 456,
    amountDeposit: 123,
    amountClaim: 456,
  },
];

export default () => {
  const columnHelper = createColumnHelper<PoolRow>();
  const columns: TableOptions<PoolRow>["columns"] = [
    columnHelper.accessor("chainId", {
      header: "CHAIN",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("collateral", {
      header: "COLLATERAL",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("tvl", {
      header: "TVL",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("apr", {
      header: "APR",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("amountDeposit", {
      header: "DEPOSITED",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("amountClaim", {
      header: "CLAIMABLE REWARDS",
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: "actionDeposit",
      header: "DEPOSIT",
      cell: () => <button>DEPOSIT</button>,
    }),
    columnHelper.display({
      id: "actionWithdraw",
      header: "WITHDRAW",
      cell: () => <button>WITHDRAW</button>,
    }),
    columnHelper.display({
      id: "actionClaim",
      header: "CLAIM REWARDS",
      cell: () => <button>CLAIM REWARDS</button>,
    }),
  ];

  const table = useReactTable({
    columns,
    data: ROWS_TEST,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  <div className="flex justify-center">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};
