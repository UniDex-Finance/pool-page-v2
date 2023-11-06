import { useState } from "react";
import { Contract } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { useEthers } from "@usedapp/core";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Button, Card } from "@material-tailwind/react";
import { PoolDataService } from "../../../../services";
import { PoolRow } from "../../../../types";
import { ABIS, CHAINDATA } from "../../../../constants";
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
  const { library } = useEthers();
  const [poolRows, setPoolRows] = useState<PoolRow[]>([]);

  const onClick = async () => {
    let poolRowsNew: any[] = [];
    try {
      const poolRowsResponse = await PoolDataService.get(["pools"]);
      if (poolRowsResponse) {
        poolRowsNew = poolRowsResponse as PoolRow[];
      }
    } catch (e) {
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
      <div className="flex">
        <Button className="bg-neutral-600 w-40 p-1" onClick={onClick}>
          FETCH TokenInfos
        </Button>
        <Button
          className="bg-neutral-600 w-40 p-1"
          onClick={async () => {
            const abiERC20 = ABIS["erc20"];
            const currencies = CHAINDATA[10].currencies;
            const currency = currencies["dai"];
            const addressPool = CHAINDATA[10].oldpool["dai"];
            const contractPool = new Contract(currency, abiERC20, library);
            const decimals = await contractPool.decimals();
            const balance = await contractPool.balanceOf(addressPool);
            const balanceFormatted = formatUnits(balance, decimals || 18);
            console.log("HERE balanceFormatted", balanceFormatted);
          }}
        >
          log DAI on OP
        </Button>
      </div>

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
