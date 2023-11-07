import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Button, Card } from "@material-tailwind/react";
import { PoolDataService } from "../../../../services";
import { PoolRow } from "../../../../types";
import createColumns from "./createColumns";

// DEV
import { Contract } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { useEthers } from "@usedapp/core";
import { ABIS, CHAINDATA } from "../../../../constants";
import { roundAndFloor } from "../../../../helpers";

const EMPTY_ROW: PoolRow = {
  chainId: 0,
  collateral: "",
  tvl: 0,
  apr: 0,
  amountDeposit: 0,
  amountClaim: 0,
};

export default () => {
  const { library, account } = useEthers();
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

  const onClick1 = async () => {
    const currencies = CHAINDATA[42161].currencies;
    const addressCurrency = currencies["dai"];
    const addressPool = CHAINDATA[42161].oldpool["dai"];
    const addressRewards = CHAINDATA[42161].oldpoolrewards["dai"];

    // TODO get TVL for native token
    const abiERC20 = ABIS["erc20"];
    const contractCurrency = new Contract(addressCurrency, abiERC20, library);
    const decimals = await contractCurrency.decimals();
    const balance = await contractCurrency.balanceOf(addressPool);
    const tvlString = formatUnits(balance, decimals || 18);
    const tvl = Number(roundAndFloor(Number(tvlString), 3));

    const abiPool = ABIS["pool"];
    const contractPool = new Contract(addressPool, abiPool, library);
    const currencyBalance = await contractPool.getCurrencyBalance(account);
    const amountDepositString = formatUnits(currencyBalance, decimals || 18);
    const amountDeposit = Number(roundAndFloor(Number(amountDepositString), 3));

    const abiRewards = ABIS["rewards"];
    const contractRewards = new Contract(addressRewards, abiRewards, library);
    const claimableReward = await contractRewards.getClaimableReward();
    const amountClaimString = formatUnits(claimableReward, decimals || 18);
    const amountClaim = Number(roundAndFloor(Number(amountClaimString), 3));

    const poolRowsNew = poolRows.map((p) => {
      if (!(p.chainId === 42161 && p.collateral.toLowerCase() === "dai")) {
        return p;
      }
      return { ...p, tvl, amountDeposit, amountClaim };
    });

    setPoolRows(poolRowsNew);
  };

  const table = useReactTable({
    columns: createColumns(library),
    data: poolRows,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card>
      <div className="flex">
        <Button className="bg-neutral-600 w-40 p-1" onClick={onClick}>
          FETCH TokenInfos
        </Button>
        <Button className="bg-neutral-600 w-40 p-1" onClick={onClick1}>
          Populate row (DAI on ARB)
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
