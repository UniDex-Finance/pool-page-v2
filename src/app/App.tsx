import { DynamicContextProvider } from "@dynamic-labs/sdk-react";
import {
  Arbitrum,
  ArbitrumGoerli,
  Config,
  DAppProvider,
  DEFAULT_SUPPORTED_CHAINS,
} from "@usedapp/core";
import { ThemeProvider } from "@material-tailwind/react";
import { createDynamicSettings } from "../helpers";
import { MainLayout } from "../components/layouts";
import { Main } from "../components/pages";
import { NETWORKS_URLS_LEVERAGE } from "../constants";
import {
  BASE_CHAIN_ID,
  SCROLL_CHAIN_ID,
  ZKSYNC_CHAIN_ID,
} from "../constants/networks";

export const BASE = {
  chainId: 8453,
  chainName: "base",
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: "0xDd048400960267A8ef47546782633217bD7b68da",
  multicall2Address: "0x8182b69C7048263E82781eC6885e4a696792AcE6",
  rpcUrl: "https://developer-access-mainnet.base.org",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    address: "0x0000000000000000000000000000000000000000",
    decimals: 18,
  },
  getExplorerAddressLink: (address: string) =>
    `https://zkevm.polygonscan.com/${address}`,
  getExplorerTransactionLink: (tx: string) =>
    `https://zkevm.polygonscan.com/${tx}`,
};

export const SCROLL = {
  chainId: 534352,
  chainName: "scroll",
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: "0x895d9130Dc56196Ab2c0c8787c8D80D5DE15E64f",
  multicall2Address: "0x895d9130Dc56196Ab2c0c8787c8D80D5DE15E64f",
  rpcUrl: "https://rpc.scroll.io/",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    address: "0x0000000000000000000000000000000000000000",
    decimals: 18,
  },
  getExplorerAddressLink: (address: string) =>
    `https://scrollscan.com/${address}`,
  getExplorerTransactionLink: (tx: string) => `https://scrollscan.com/${tx}`,
};

const DYNAMIC_SETTINGS = createDynamicSettings();
const USEDAPP_CONFIG: Config = {
  readOnlyUrls: {
    ...NETWORKS_URLS_LEVERAGE,
    [Arbitrum.chainId]: "https://arb1.arbitrum.io/rpc",
    [ArbitrumGoerli.chainId]:
      "https://arb-goerli.g.alchemy.com/v2/clalwfFmsbGLGqKV6gBYp-y5BdG_F2aQ",
  },
  multicallAddresses: {
    [ZKSYNC_CHAIN_ID]: "0x1De2452e12b982Bc31500FcfD1AFf8FfdAd93CBa",
    [BASE_CHAIN_ID]: "0x8182b69C7048263E82781eC6885e4a696792AcE6",
    [SCROLL_CHAIN_ID]: "0x895d9130Dc56196Ab2c0c8787c8D80D5DE15E64f",
  },
  networks: [...DEFAULT_SUPPORTED_CHAINS, BASE, SCROLL],
};

export default () => (
  <MainLayout>
    <DynamicContextProvider theme="dark" settings={DYNAMIC_SETTINGS}>
      <DAppProvider config={USEDAPP_CONFIG}>
        <ThemeProvider>
          <Main />
        </ThemeProvider>
      </DAppProvider>
    </DynamicContextProvider>
  </MainLayout>
);
