import { TableOptions, createColumnHelper } from "@tanstack/react-table";
import { PoolRow } from "../../../../types";

const columnHelper = createColumnHelper<PoolRow>();

export default [
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
] as TableOptions<PoolRow>["columns"];
