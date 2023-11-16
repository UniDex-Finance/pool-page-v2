// import { PoolRow } from ".";

/**
 * This is an EVM address. It contains '0x' as a prefix.
 */
export type Address = string;
export type ChainId = number;

export type Store = {
  // poolRows: PoolRow[];
  /**
   * `networkAddressPair` structured such as ethereum:0x000...
   */
  prices: {
    [networkAddressPair: string]: {
      decimals: number;
      symbol: string;
      price: number;
      timestamp: number;
      confidence: number;
    };
  };
};
