import { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Card } from "@material-tailwind/react";
import { CHAINDATA } from "../../../../constants";
import { PoolRow } from "../../../../types";
import Columns from "./Columns";

const EMPTY_ROW: PoolRow = {
  chainId: 0,
  collateral: "",
  tvl: 0,
  apr: 0,
  amountDeposit: 0,
  amountClaim: 0,
};

export default () => {
  const [poolRows, setPoolRows] = useState<PoolRow[]>([EMPTY_ROW]);

  const table = useReactTable({
    columns: Columns(),
    data: poolRows,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    const poolRowsChainData: PoolRow[] = [];
    Object.entries(CHAINDATA).forEach(([entryChainId, entryData]) => {
      if (entryData.isTestnet) {
        return;
      }

      const chainPools: PoolRow[] = Object.keys(entryData.oldpool).map(
        (symbol) => ({
          ...EMPTY_ROW,
          chainId: Number(entryChainId),
          collateral: symbol.toUpperCase(),
        })
      );
      poolRowsChainData.push.apply(poolRowsChainData, chainPools);
    });

    setPoolRows(poolRowsChainData);
  }, []);

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
