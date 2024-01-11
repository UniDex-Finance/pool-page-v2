import {
  DynamicContextProvider,
  EvmNetwork,
} from "@dynamic-labs/sdk-react-core";
import {
  BLOCK_EXPLORER,
  NATIVE_TOKEN_BY_CHAIN_ID,
  NETWORKS_AVAILABLE_SIMPLE,
  NETWORK_DISPLAY_NAME,
  NETWORK_URLS,
} from "../constants";
import { ChainId } from "../types";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { MagicWalletConnectors } from "@dynamic-labs/magic";

type DynamicContextProps = React.ComponentProps<typeof DynamicContextProvider>;

export default (): DynamicContextProps["settings"] => {
  return {
    environmentId: "63f5b880-69e0-4798-b20d-5005d5a1649e",
    initialAuthenticationMode: "connect-only",
    walletConnectors: [EthereumWalletConnectors, MagicWalletConnectors],
    evmNetworks: NETWORKS_AVAILABLE_SIMPLE.map(
      (chainId: ChainId): EvmNetwork => {
        const { decimals, name, symbol } = NATIVE_TOKEN_BY_CHAIN_ID[chainId];
        const nativeCurrency = { decimals, name, symbol };

        return {
          chainId,
          chainName: NETWORK_DISPLAY_NAME[chainId],
          nativeCurrency,
          networkId: chainId,
          rpcUrls: [NETWORK_URLS[chainId]],
          name: NETWORK_DISPLAY_NAME[chainId],
          iconUrls: [""],
          blockExplorerUrls: [BLOCK_EXPLORER[chainId]],
        };
      }
    ),
  };
};
