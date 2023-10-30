/**
 * This is an EVM address. It contains '0x' as a prefix.
 */
export type Address = string;
export type ChainId = number;
export type TokenSymbol = string;
export type Slippage = string;
export type Layout = number;
export type GasPreference = "slow" | "normal" | "fast";

export type OrderSelection = "from" | "to";
export type TradeSetting = "slippageTolerance" | "gasPreference";
export type HashElements = {
  hashChainId: ChainId | undefined;
  hashFromAddress: Address | undefined;
  hashToAddress: Address | undefined;
};

export type SearchMessage = {
  visible: boolean;
  loading?: boolean;
  text?: string;
};

export type OrderEvent =
  | "setupOrder"
  | "approveToken"
  | "switchNetwork"
  | "connectWallet"
  | "insufficentBalance"
  | "selectToken"
  | "enterAmount"
  | "updatingPrice";

export type OrderButtonState = {
  event: OrderEvent;
  text: (data?: string) => string;
  disabled: boolean;
  className: string;
  prevState?: OrderButtonState;
};

export type AggregatorSource = "kyber" | "0x" | "firebird" | "1inch";

export type GasPrices = {
  timestamp: string;
  latestBlock: number;
  avgTime: number;
  avgTx: number;
  avgGas: number;
  speeds: Array<GasPricesSpeed>;
};

export type GasPricesSpeed = {
  acceptace: number;
  gasPrice: string;
  estimatedFee: number;
};

type AssetType = "cryptos" | "index" | "stock" | "currency" | "experimental";
type AssetPairType =
  | "crypto_pair"
  | "index_pair"
  | "stock_pair"
  | "currency_pair"
  | "experimental_pair";
type LeverageAPIType =
  | "crypto"
  | "index"
  | "stock"
  | "currency"
  | "experimental";
type LeverageAPIPythType =
  | "Crypto"
  | "Equity.US"
  | "FX"
  | "Metal"
  | "experimental";

export type TradingPair = {
  name: string;
  hours: string;
  logo: string;
  baseSpread: number;
  maxSlippage: number;
  maxLeverage: number;
  type: AssetPairType;
  chartDataKey: string;
  priceDataKey: string;
  leverageAPIType: LeverageAPIType;
  leverageAPIPythType: LeverageAPIPythType;
  slippageExponent: number;
  assets?: {
    name: string;
    type: AssetType;
  }[];
  maxLiquidity: {
    [token: string]: number;
  };
  pairDetails: any;
};

export type CurrencyPair = {
  name: string;
  value: string;
  img?: string;
};

// New types for lev-aggregator
export type MoltenData = {
  enabled: boolean;
  address: string;
};

export type TokenPrice = {
  price: number;
  decimals: number;
  timestamp: number;
  tokenAddress: string;
};

export type TokenPrices = {
  [symbol: string]: TokenPrice;
};
