import { ChainId } from "@usedapp/core";
import { CHAINDATA } from "../constants";
import { PoolRow } from "../types";

const EMPTY_ROW: PoolRow = {
  chainId: 0,
  collateral: "",
  tvl: 0,
  apr: 0,
  amountDeposit: 0,
  amountClaim: 0,
};

export default (chainIdFilter?: ChainId) => {
  const poolRowsChainData: PoolRow[] = [];
  Object.entries(CHAINDATA).forEach(([entryChainId, entryData]) => {
    if (entryData.isTestnet) {
      return;
    }

    if (chainIdFilter && Number(entryChainId) !== chainIdFilter) {
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

  return poolRowsChainData;
};
