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
// import { ZeroDevSmartWalletConnectors } from "@dynamic-labs/ethereum-aa";

type DynamicContextProps = React.ComponentProps<typeof DynamicContextProvider>;

export default (): DynamicContextProps["settings"] => {
  return {
    environmentId: "308246e6-b10e-4895-b94d-4b018dcf4d63",
    initialAuthenticationMode: "connect-only",
    walletConnectors: [
      EthereumWalletConnectors,
    ],
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
