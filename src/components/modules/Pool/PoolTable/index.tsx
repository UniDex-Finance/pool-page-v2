import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Button, Card } from "@material-tailwind/react";
import { PoolDataService } from "../../../../services";
import { PoolRow } from "../../../../types";
import columns from "./columns";

// DEV
// import tokenInfos from "../../../../dev/constants/tokenInfos.json";

/*
const ROWS_TEST: PoolRow[] = tokenInfos.data.TokenInfos.map((t) => ({
  chainId: t.chainId,
  collateral: t.symbol,
  tvl: 123,
  apr: 456,
  amountDeposit: 123,
  amountClaim: 456,
}));
*/

const EMPTY_ROW: PoolRow = {
  chainId: 0,
  collateral: "",
  tvl: 0,
  apr: 0,
  amountDeposit: 0,
  amountClaim: 0,
};

export default () => {
  const [poolRows, setPoolRows] = useState<PoolRow[]>([]);

  const onClick = async () => {
    let poolRowsNew: any[] = [];
    try {
      poolRowsNew = await PoolDataService.fetchPoolData("pools");
    } catch (e) {
      poolRowsNew = [];
      console.error(e);
    }

    const poolRowsNewFormatted: PoolRow[] = poolRowsNew.map((p) => ({
      ...EMPTY_ROW,
      chainId: p.chainId,
      collateral: p.symbol,
    }));
    setPoolRows(poolRowsNewFormatted);
  };

  const table = useReactTable({
    columns,
    data: poolRows,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card>
      <Button className="bg-neutral-600 w-40 p-1" onClick={onClick}>
        FETCH TokenInfos
      </Button>
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
