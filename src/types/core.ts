// import { PoolRow } from ".";

/**
 * This is an EVM address. It contains '0x' as a prefix.
 */
export type Address = string;
export type ChainId = number;

export type PoolDataRangeKey =
  | "1DayData"
  | "7DayData"
  | "30DayData"
  | "365DayData";

export type Store = {
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
  poolData: {
    [networkName: string]: {
      [address: Address]: {
        [key in PoolDataRangeKey]: {
          APR: string;
          RewardAPR: string;
          Fees: number;
          PnL: number;
          TotalReturn: number;
        };
      } & {
        Currency: Address;
        MinimumDepositTime: string;
        OpenInterest: string;
        TVL: string;
        Utilization: string;
        WithdrawFee: string;
        currency: Address;
        decimals: number;
        feePercentage: number;
        logo: string;
        name: string;
      };
    };
  };
};
