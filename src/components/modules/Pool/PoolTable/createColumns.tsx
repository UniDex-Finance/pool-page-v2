import { useMemo } from "react";
import { TableOptions, createColumnHelper } from "@tanstack/react-table";
import { Button } from "@material-tailwind/react";
import { PoolRow } from "../../../../types";

// DEV
import { Contract } from "ethers";
import { ABIS, CHAINDATA } from "../../../../constants";
import { parseUnits } from "../../../../helpers";

const columnHelper = createColumnHelper<PoolRow>();

const onClickDeposit = async (library: any) => {
  const addressPool = CHAINDATA[42161].oldpool["dai"];
  const abiPool = ABIS["pool"];
  const contractPool = new Contract(addressPool, abiPool, library.getSigner());
  // TODO deposit for native token and other decimal amounts
  await contractPool.deposit(parseUnits("0.1", 18));
};

export default (library: any) =>
  useMemo(
    () =>
      [
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
          cell: () => (
            <Button onClick={() => onClickDeposit(library)}>DEPOSIT</Button>
          ),
        }),
        columnHelper.display({
          id: "actionWithdraw",
          header: "WITHDRAW",
          cell: () => <Button>WITHDRAW</Button>,
        }),
        columnHelper.display({
          id: "actionClaim",
          header: "CLAIM REWARDS",
          cell: () => <Button>CLAIM REWARDS</Button>,
        }),
      ] as TableOptions<PoolRow>["columns"],
    [library]
  );
