import { ChainId } from "./core";

export type PoolRow = {
  chainId: ChainId;
  collateral: string;
  tvl: number;
  apr: number;
  createdAtTimestamp: number;
  amountDeposit: number;
  amountClaim: number;
};

export type PoolDataName =
  | "pools"
  | "prices"
  | "stats"
  | "tvlTotal"
  | "tvlPool";
