import { ChainId } from "../types";

import BSC_ICON from "../assets/icons_chain/bsc.svg";
import MAINNET_ICON from "../assets/icons_chain/eth.svg";
import POLYGON_ICON from "../assets/icons_chain/polygon.svg";
import FANTOM_ICON from "../assets/icons_chain/fantom.svg";
import AVA_ICON from "../assets/icons_chain/avalanche.svg";
import XDAI_ICON from "../assets/icons_chain/gnosis.svg";
import MOONBEAM_ICON from "../assets/icons/moon_icon.png";
import FUSE_ICON from "../assets/icons/fuse_icon.png";
import KUCOIN_ICON from "../assets/icons/kcc.jpg";
import ARBITRUM_ICON from "../assets/icons_chain/arbitrum.svg";
import MR_ICON from "../assets/icons_chain/moonriver.svg";
import BOBA_ICON from "../assets/icons_chain/boba.svg";
import HARMONY_ICON from "../assets/icons_chain/harmony.svg";
import OP_ICON from "../assets/icons_chain/optimism.svg";
import METIS_ICON from "../assets/icons/metis.png";
import VELAS_ICON from "../assets/icons_chain/velas.svg";
import KAVA_ICON from "../assets/icons_chain/kava.svg";
import CRO_ICON from "../assets/icons_chain/cronos.svg";
import AURORA_ICON from "../assets/icons_chain/aurora.svg";
import ZKSYNC_ICON from "../assets/icons_chain/zksync.svg";
import BASE_ICON from "../assets/icons_chain/base.svg";
import SCROLL_ICON from "../assets/icons_chain/scroll.svg";
import EVMOS_ICON from "../assets/icons_chain/evmos.png";
import MODE_ICON from "../assets/icons_chain/mode.svg";
import MOLTEN_ICON from "../assets/icons_chain/molten.svg";
import MERLIN_ICON from "../assets/icons_chain/merlin.png";

import USDC_LOGO from "../assets/logos/USDC.svg";
import DAI_LOGO from "../assets/logos/DAI.svg";
import FTM_LOGO from "../assets/logos/FTM.svg";
import ETH_LOGO from "../assets/logos/ETH.svg";
import USDT_LOGO from "../assets/logos/USDT.svg";
import WBTC_LOGO from "../assets/logos/BTC.svg";
import MIM_LOGO from "../assets/logos/MIM.png";
import GDAI_LOGO from "../assets/logos/GDAI.webp";
import MAI_LOGO from "../assets/logos/MAI.webp";
import GMX_LOGO from "../assets/logos/GMX.svg";
import WSTETH_LOGO from "../assets/logos/WSTETH.png";
import CAP_LOGO from "../assets/logos/CAPLOGO.svg";
import UNSHETH_LOGO from "../assets/logos/UNSHETH.png";
import GNS_LOGO from "../assets/logos/GNS.png";
import RAM_LOGO from "../assets/logos/RAM.webp";
import CRVUSD_LOGO from "../assets/logos/CRVUSD.png";
import XDAI_LOGO from "../assets/logos/xdai.png";
import TIA_LOGO from "../assets/logos/TIA.png";
import INJ_LOGO from "../assets/logos/INJ.png";
import FORT_LOGO from "../assets/logos/FORT.jpg";
import STEVMOS_ICON from "../assets/logos/stevmos.png";
import BNB_ICON from "../assets/logos/BNB.svg";
import GOLDEN_ICON from "../assets/logos/golden.png";

export const MAINNET_CHAIN_ID = 1;
export const KOVAN_CHAIN_ID = 42;
export const SEPOLIA_CHAIN_ID = 11155111;
export const BSC_CHAIN_ID = 56;
export const POLYGON_CHAIN_ID = 137;
export const FANTOM_CHAIN_ID = 250;
export const FANTOM_TESTNET_CHAIN_ID = 4002;
export const AVA_CHAIN_ID = 43114;
export const XDAI_CHAIN_ID = 100;
export const GNOSIS_CHAIN_ID = 100;
export const MOONBEAM_CHAIN_ID = 1284;
export const FUSE_CHAIN_ID = 122;
export const KUCOIN_CHAIN_ID = 321;
export const ARBITRUM_CHAIN_ID = 42161;
export const AVALANCHE_CHAIN_ID = 43114;
export const MOON_RIVER_CHAIN_ID = 1285;
export const BOBA_CHAIN_ID = 288;
export const HARMONY_CHAIN_ID = 1666600000;
export const OP_CHAIN_ID = 10;
export const CRONOS_CHAIN_ID = 25;
export const AUORA_CHAIN_ID = 1313161554;
export const METIS_CHAIN_ID = 1088;
export const VELAS_CHAIN_ID = 106;
export const KAVA_CHAIN_ID = 459;
export const ZKSYNC_CHAIN_ID = 324;
export const ZKEVM_CHAIN_ID = 1101;
export const BASE_CHAIN_ID = 8453;
export const SCROLL_CHAIN_ID = 534352;
export const EVMOS_CHAIN_ID = 9001;
export const MODE_CHAIN_ID = 34443;
export const MOLTEN_CHAIN_ID = 360;
export const MERLIN_CHAIN_ID = 4200;

export const DEFAULT_NETWORK = OP_CHAIN_ID;

export const NETWORKS_AVAILABLE: ChainId[] = [
  MAINNET_CHAIN_ID,
  SEPOLIA_CHAIN_ID,
  KOVAN_CHAIN_ID,
  BSC_CHAIN_ID,
  POLYGON_CHAIN_ID,
  FANTOM_CHAIN_ID,
  AVA_CHAIN_ID,
  XDAI_CHAIN_ID,
  MOONBEAM_CHAIN_ID,
  FUSE_CHAIN_ID,
  ARBITRUM_CHAIN_ID,
  MOON_RIVER_CHAIN_ID,
  BOBA_CHAIN_ID,
  KUCOIN_CHAIN_ID,
  OP_CHAIN_ID,
  CRONOS_CHAIN_ID,
  AUORA_CHAIN_ID,
  METIS_CHAIN_ID,
  VELAS_CHAIN_ID,
  KAVA_CHAIN_ID,
  ZKSYNC_CHAIN_ID,
  ZKEVM_CHAIN_ID,
  BASE_CHAIN_ID,
  SCROLL_CHAIN_ID,
  EVMOS_CHAIN_ID,
  MODE_CHAIN_ID,
  MOLTEN_CHAIN_ID,

];

export const NETWORKS_AVAILABLE_SIMPLE: ChainId[] = [
  MAINNET_CHAIN_ID,
  SEPOLIA_CHAIN_ID,
  OP_CHAIN_ID,
  ARBITRUM_CHAIN_ID,
  ZKSYNC_CHAIN_ID,
  FANTOM_CHAIN_ID,
  BSC_CHAIN_ID,
  POLYGON_CHAIN_ID,
  AVA_CHAIN_ID,
  XDAI_CHAIN_ID,
  MOON_RIVER_CHAIN_ID,
  BOBA_CHAIN_ID,
  CRONOS_CHAIN_ID,
  AUORA_CHAIN_ID,
  VELAS_CHAIN_ID,
  KAVA_CHAIN_ID,
  METIS_CHAIN_ID,
  BASE_CHAIN_ID,
  SCROLL_CHAIN_ID,
  EVMOS_CHAIN_ID,
  MODE_CHAIN_ID,
  MOLTEN_CHAIN_ID,
];

export const NETWORKS_AVAILABLE_LEVERAGE: ChainId[] = [
  MOLTEN_CHAIN_ID,
  OP_CHAIN_ID,
  ARBITRUM_CHAIN_ID,
  ZKSYNC_CHAIN_ID,
  SCROLL_CHAIN_ID,
  BASE_CHAIN_ID,
  FANTOM_CHAIN_ID,
  AVA_CHAIN_ID,
  BSC_CHAIN_ID,
  METIS_CHAIN_ID,
  SCROLL_CHAIN_ID,
  EVMOS_CHAIN_ID,
  BSC_CHAIN_ID,
  MODE_CHAIN_ID
];

export const NETWORKS_AVAILABLE_LIMIT: ChainId[] = [
  OP_CHAIN_ID,
  ARBITRUM_CHAIN_ID,
  BASE_CHAIN_ID,
  GNOSIS_CHAIN_ID,
  SCROLL_CHAIN_ID,
  MODE_CHAIN_ID,
  MOLTEN_CHAIN_ID,
];

export const NETWORK_DISPLAY_NAME: { [chainId: ChainId]: string } = {
  [MAINNET_CHAIN_ID]: "Mainnet",
  [KOVAN_CHAIN_ID]: "Kovan Testnet",
  [SEPOLIA_CHAIN_ID]: "Sepolia Testnet",
  [BSC_CHAIN_ID]: "BNB Chain",
  [POLYGON_CHAIN_ID]: "Polygon",
  [AVA_CHAIN_ID]: "Avalanche",
  [FANTOM_CHAIN_ID]: "Fantom",
  [GNOSIS_CHAIN_ID]: "Gnosis",
  [FUSE_CHAIN_ID]: "Fuse",
  [KUCOIN_CHAIN_ID]: "Kucoin Community Chain",
  [MOONBEAM_CHAIN_ID]: "Moonbase Alpha",
  [ARBITRUM_CHAIN_ID]: "Arbitrum",
  [MOON_RIVER_CHAIN_ID]: "Moonriver",
  [BOBA_CHAIN_ID]: "Boba",
  [OP_CHAIN_ID]: "Optimism",
  [CRONOS_CHAIN_ID]: "Cronos",
  [MODE_CHAIN_ID]: "Mode",
  [METIS_CHAIN_ID]: "Metis",
  [VELAS_CHAIN_ID]: "Velas",
  [KAVA_CHAIN_ID]: "Kava",
  [ZKSYNC_CHAIN_ID]: "zkSync",
  [BASE_CHAIN_ID]: "Base",
  [SCROLL_CHAIN_ID]: "Scroll",
  [EVMOS_CHAIN_ID]: "Evmos",
  [MOLTEN_CHAIN_ID]: "Molten",
  [MERLIN_CHAIN_ID]: "Merlin",
};

export const NETWORK_NAMES_API: {
  [api: string]: {
    [chainId: ChainId]: string;
  };
} = {
  dexscreener: {
    [MAINNET_CHAIN_ID]: "ethereum",
    [SEPOLIA_CHAIN_ID]: "",
    [KOVAN_CHAIN_ID]: "",
    [BSC_CHAIN_ID]: "bsc",
    [POLYGON_CHAIN_ID]: "polygon",
    [AVA_CHAIN_ID]: "avalanche",
    [FANTOM_CHAIN_ID]: "fantom",
    [XDAI_CHAIN_ID]: "gnosischain",
    [FUSE_CHAIN_ID]: "fuse",
    [KUCOIN_CHAIN_ID]: "kcc",
    [MOONBEAM_CHAIN_ID]: "moonbeam",
    [ARBITRUM_CHAIN_ID]: "arbitrum",
    [MOON_RIVER_CHAIN_ID]: "moonriver",
    [BOBA_CHAIN_ID]: "boba",
    [HARMONY_CHAIN_ID]: "harmony",
    [OP_CHAIN_ID]: "optimism",
    [CRONOS_CHAIN_ID]: "cronos",
    [AUORA_CHAIN_ID]: "aurora",
    [METIS_CHAIN_ID]: "metis",
    [VELAS_CHAIN_ID]: "velas",
    [KAVA_CHAIN_ID]: "kava",
    [ZKSYNC_CHAIN_ID]: "zksync",
    [MOLTEN_CHAIN_ID]: "molten",
  },
  coingecko: {
    [MAINNET_CHAIN_ID]: "ethereum",
    [SEPOLIA_CHAIN_ID]: "",
    [KOVAN_CHAIN_ID]: "",
    [BSC_CHAIN_ID]: "binance-smart-chain",
    [POLYGON_CHAIN_ID]: "polygon-pos",
    [AVA_CHAIN_ID]: "avalanche",
    [FANTOM_CHAIN_ID]: "fantom",
    [XDAI_CHAIN_ID]: "xdai",
    [FUSE_CHAIN_ID]: "fuse",
    [KUCOIN_CHAIN_ID]: "kucoin-community-chain",
    [MOONBEAM_CHAIN_ID]: "moonbeam",
    [ARBITRUM_CHAIN_ID]: "arbitrum-one",
    [MOON_RIVER_CHAIN_ID]: "moonriver",
    [BOBA_CHAIN_ID]: "boba",
    [HARMONY_CHAIN_ID]: "harmony-shard-0",
    [OP_CHAIN_ID]: "optimistic-ethereum",
    [CRONOS_CHAIN_ID]: "cronos",
    [AUORA_CHAIN_ID]: "aurora",
    [METIS_CHAIN_ID]: "metis-andromeda",
    [VELAS_CHAIN_ID]: "velas",
    [KAVA_CHAIN_ID]: "kava",
    [ZKSYNC_CHAIN_ID]: "zksync",
    [MOLTEN_CHAIN_ID]: "molten",
    [MERLIN_CHAIN_ID]: "merlin",
  },
  debank: {
    [MAINNET_CHAIN_ID]: "eth",
    [SEPOLIA_CHAIN_ID]: "",
    [KOVAN_CHAIN_ID]: "",
    [BSC_CHAIN_ID]: "bsc",
    [POLYGON_CHAIN_ID]: "matic",
    [AVA_CHAIN_ID]: "avax",
    [FANTOM_CHAIN_ID]: "ftm",
    [XDAI_CHAIN_ID]: "xdai",
    [FUSE_CHAIN_ID]: "fuse",
    [KUCOIN_CHAIN_ID]: "kcc",
    [MOONBEAM_CHAIN_ID]: "mobm",
    [ARBITRUM_CHAIN_ID]: "arb",
    [MOON_RIVER_CHAIN_ID]: "movr",
    [BOBA_CHAIN_ID]: "boba",
    [HARMONY_CHAIN_ID]: "hmy",
    [OP_CHAIN_ID]: "op",
    [CRONOS_CHAIN_ID]: "cro",
    [AUORA_CHAIN_ID]: "aurora",
    [METIS_CHAIN_ID]: "metis",
    [VELAS_CHAIN_ID]: "",
    [KAVA_CHAIN_ID]: "kava",
    [ZKSYNC_CHAIN_ID]: "zksync",
    [MOLTEN_CHAIN_ID]: "molten",
  },
  owlracle: {
    [MAINNET_CHAIN_ID]: "eth",
    [SEPOLIA_CHAIN_ID]: "",
    [KOVAN_CHAIN_ID]: "",
    [BSC_CHAIN_ID]: "bsc",
    [POLYGON_CHAIN_ID]: "poly",
    [AVA_CHAIN_ID]: "avax",
    [FANTOM_CHAIN_ID]: "ftm",
    [XDAI_CHAIN_ID]: "",
    [FUSE_CHAIN_ID]: "fuse",
    [KUCOIN_CHAIN_ID]: "",
    [MOONBEAM_CHAIN_ID]: "",
    [ARBITRUM_CHAIN_ID]: "arb",
    [MOON_RIVER_CHAIN_ID]: "movr",
    [BOBA_CHAIN_ID]: "",
    [HARMONY_CHAIN_ID]: "harmony",
    [OP_CHAIN_ID]: "op",
    [CRONOS_CHAIN_ID]: "cro",
    [AUORA_CHAIN_ID]: "aurora",
    [METIS_CHAIN_ID]: "metis",
    [VELAS_CHAIN_ID]: "",
    [MOLTEN_CHAIN_ID]: "molten",
  },
  gasless: {
    [MAINNET_CHAIN_ID]: "mainnet",
    [BSC_CHAIN_ID]: "bsc",
    [POLYGON_CHAIN_ID]: "polygon",
    [FANTOM_CHAIN_ID]: "fantom",
    [XDAI_CHAIN_ID]: "xdai",
    [ARBITRUM_CHAIN_ID]: "arbitrum",
    [OP_CHAIN_ID]: "optimism",
    [MOLTEN_CHAIN_ID]: "molten",
  },
  defillama: {
    [MAINNET_CHAIN_ID]: "ethereum",
    [KOVAN_CHAIN_ID]: "",
    [BSC_CHAIN_ID]: "bsc",
    [POLYGON_CHAIN_ID]: "polygon",
    [AVA_CHAIN_ID]: "avax",
    [FANTOM_CHAIN_ID]: "fantom",
    [XDAI_CHAIN_ID]: "xdai",
    [FUSE_CHAIN_ID]: "fuse",
    [KUCOIN_CHAIN_ID]: "",
    [MOONBEAM_CHAIN_ID]: "moonbeam",
    [ARBITRUM_CHAIN_ID]: "arbitrum",
    [MOON_RIVER_CHAIN_ID]: "moonriver",
    [BOBA_CHAIN_ID]: "boba",
    [HARMONY_CHAIN_ID]: "harmony",
    [OP_CHAIN_ID]: "optimism",
    [CRONOS_CHAIN_ID]: "cronos",
    [AUORA_CHAIN_ID]: "aurora",
    [METIS_CHAIN_ID]: "metis",
    [VELAS_CHAIN_ID]: "velas",
    [KAVA_CHAIN_ID]: "kava",
    [ZKSYNC_CHAIN_ID]: "era",
    [ZKEVM_CHAIN_ID]: "polygon_zkevm",
    [BASE_CHAIN_ID]: "base",
    [SCROLL_CHAIN_ID]: "scroll",
    [EVMOS_CHAIN_ID]: "evmos",
    [MODE_CHAIN_ID]: "mode",
    [MOLTEN_CHAIN_ID]: "molten",
    [MERLIN_CHAIN_ID]: "merlin",
  },
  /** NOTE: some names may be guesses */
  unidexPool: {
    [MAINNET_CHAIN_ID]: "ethereum",
    [KOVAN_CHAIN_ID]: "",
    [BSC_CHAIN_ID]: "bsc",
    [POLYGON_CHAIN_ID]: "polygon",
    [AVA_CHAIN_ID]: "avax",
    [FANTOM_CHAIN_ID]: "fantom",
    [XDAI_CHAIN_ID]: "xdai",
    [FUSE_CHAIN_ID]: "fuse",
    [KUCOIN_CHAIN_ID]: "",
    [MOONBEAM_CHAIN_ID]: "moonbeam",
    [ARBITRUM_CHAIN_ID]: "arbitrum",
    [MOON_RIVER_CHAIN_ID]: "moonriver",
    [BOBA_CHAIN_ID]: "boba",
    [HARMONY_CHAIN_ID]: "harmony",
    [OP_CHAIN_ID]: "optimism",
    [CRONOS_CHAIN_ID]: "cronos",
    [AUORA_CHAIN_ID]: "aurora",
    [METIS_CHAIN_ID]: "metis",
    [VELAS_CHAIN_ID]: "velas",
    [KAVA_CHAIN_ID]: "kava",
    [ZKSYNC_CHAIN_ID]: "zksync",
    [ZKEVM_CHAIN_ID]: "zkevm",
    [BASE_CHAIN_ID]: "base",
    [SCROLL_CHAIN_ID]: "scroll",
    [EVMOS_CHAIN_ID]: "evmos",
    [MODE_CHAIN_ID]: "mode",
    [MOLTEN_CHAIN_ID]: "molten",
    [MERLIN_CHAIN_ID]: "merlin",
  },
};

export const NETWORK_ICON_SRC: {
  // @ts-ignore
  [chainId: ChainId];
} = {
  [MAINNET_CHAIN_ID]: MAINNET_ICON,
  [SEPOLIA_CHAIN_ID]: MAINNET_ICON,
  [KOVAN_CHAIN_ID]: MAINNET_ICON,
  [BSC_CHAIN_ID]: BSC_ICON,
  [POLYGON_CHAIN_ID]: POLYGON_ICON,
  [AVA_CHAIN_ID]: AVA_ICON,
  [FANTOM_CHAIN_ID]: FANTOM_ICON,
  [XDAI_CHAIN_ID]: XDAI_ICON,
  [MOONBEAM_CHAIN_ID]: MOONBEAM_ICON,
  [KUCOIN_CHAIN_ID]: KUCOIN_ICON,
  [FUSE_CHAIN_ID]: FUSE_ICON,
  [ARBITRUM_CHAIN_ID]: ARBITRUM_ICON,
  [MOON_RIVER_CHAIN_ID]: MR_ICON,
  [BOBA_CHAIN_ID]: BOBA_ICON,
  [HARMONY_CHAIN_ID]: HARMONY_ICON,
  [OP_CHAIN_ID]: OP_ICON,
  [CRONOS_CHAIN_ID]: CRO_ICON,
  [AUORA_CHAIN_ID]: AURORA_ICON,
  [METIS_CHAIN_ID]: METIS_ICON,
  [VELAS_CHAIN_ID]: VELAS_ICON,
  [KAVA_CHAIN_ID]: KAVA_ICON,
  [ZKSYNC_CHAIN_ID]: ZKSYNC_ICON,
  [BASE_CHAIN_ID]: BASE_ICON,
  [SCROLL_CHAIN_ID]: SCROLL_ICON,
  [EVMOS_CHAIN_ID]: EVMOS_ICON,
  [MODE_CHAIN_ID]: MODE_ICON,
  [MOLTEN_CHAIN_ID]: MOLTEN_ICON,
  [MERLIN_CHAIN_ID]: MERLIN_ICON,
};

export const CRYPTO_ICON_SRC = {
  USDC: USDC_LOGO,
  "USDC.E": USDC_LOGO,
  FTM: FTM_LOGO,
  DAI: DAI_LOGO,
  ETH: ETH_LOGO,
  WETH: ETH_LOGO,
  METIS: METIS_ICON,
  AVA: AVA_ICON,
  USDT: USDT_LOGO,
  BTC: WBTC_LOGO,
  WBTC: WBTC_LOGO,
  MIM: MIM_LOGO,
  GDAI: GDAI_LOGO,
  MAI: MAI_LOGO,
  GMX: GMX_LOGO,
  WSTETH: WSTETH_LOGO,
  CAP: CAP_LOGO,
  UNSHETH: UNSHETH_LOGO,
  GNS: GNS_LOGO,
  RAM: RAM_LOGO,
  ARB: ARBITRUM_ICON,
  CRVUSD: CRVUSD_LOGO,
  XDAI: XDAI_LOGO,
  TIA: TIA_LOGO,
  INJ: INJ_LOGO,
  FORT: FORT_LOGO,
  STEVMOS: STEVMOS_ICON,
  BNB: BNB_ICON,
  GOLDEN: GOLDEN_ICON,
};

export const NETWORK_URLS: { [chainId: ChainId]: string } = {
  [MAINNET_CHAIN_ID]:
    "https://eth-mainnet.g.alchemy.com/v2/LnOWF7MPoOba1gqE1VVE4HwfzV3sZ7C1",
  [SEPOLIA_CHAIN_ID]:
    "wss://eth-mainnet.g.alchemy.com/v2/k4-7Agacy4KzCQ7xPvGGVVoMxsnB_sYy",
  [KOVAN_CHAIN_ID]:
    "https://eth-kovan.alchemyapi.io/v2/kKt4rItTbSfgSw5yTtZlRmqwQXU890aF",
  [BSC_CHAIN_ID]: "https://lb.nodies.app/v1/9af780ad7c9c42a0996c70d19a58c25f",
  [POLYGON_CHAIN_ID]:
    "https://lb.nodies.app/v1/d4fda5437eb44c82aed6b20fe472c8c9",
  [AVA_CHAIN_ID]: "https://api.avax.network/ext/bc/C/rpc",
  [FANTOM_CHAIN_ID]: "https://rpcapi.fantom.network",
  [XDAI_CHAIN_ID]: "https://rpc.gnosis.gateway.fm",
  [MOONBEAM_CHAIN_ID]: "https://rpc.testnet.moonbeam.network",
  [FUSE_CHAIN_ID]: "https://rpc.fuse.io",
  [ARBITRUM_CHAIN_ID]:
    "https://lb.nodies.app/v1/b33051ceac4b4a75a4bbc5102dc86ea0",
  [MOON_RIVER_CHAIN_ID]: "https://rpc.moonriver.moonbeam.network",
  [BOBA_CHAIN_ID]: "https://mainnet.boba.network",
  [HARMONY_CHAIN_ID]: "https://api.harmony.one",
  [OP_CHAIN_ID]: "https://lb.nodies.app/v1/91092cbc290e46a3a99251b4f18fb8c6",
  [CRONOS_CHAIN_ID]: "https://evm-cronos.crypto.org",
  [AUORA_CHAIN_ID]: "https://mainnet.aurora.dev",
  [METIS_CHAIN_ID]: "https://andromeda.metis.io/?owner=1088",
  [VELAS_CHAIN_ID]: "https://evmexplorer.velas.com/rpc",
  [KUCOIN_CHAIN_ID]: "https://rpc-mainnet.kcc.network",
  [KAVA_CHAIN_ID]: "https://lcd.kava3.data.kava.io",
  [ZKSYNC_CHAIN_ID]: "https://mainnet.era.zksync.io",
  [BASE_CHAIN_ID]: "https://lb.nodies.app/v1/7434c7c488a742aeaec6c61ba456ffef",
  [SCROLL_CHAIN_ID]: "https://rpc.scroll.io/",
  [EVMOS_CHAIN_ID]: "https://lb.nodies.app/v1/c5884321d7ef4c35be44cccc4236e1c3",
  [MODE_CHAIN_ID]:
    "https://mode-mainnet.blastapi.io/e1bf927b-39ad-47cf-98ff-b2b3c33ea5d4",
  [MOLTEN_CHAIN_ID]: "https://molten.calderachain.xyz/http",
  [MERLIN_CHAIN_ID]: "https://rpc.merlinchain.io",
};

export const NETWORK_URLS_SIMPLE: { [chainId: ChainId]: string } = {
  [MAINNET_CHAIN_ID]:
    "https://rpc.ankr.com/eth/757fd7b22f376e3de558f4314e5ec7acfed5b77c6ec675900d6ca9a97708f9ee",
  [SEPOLIA_CHAIN_ID]:
    "wss://eth-mainnet.g.alchemy.com/v2/k4-7Agacy4KzCQ7xPvGGVVoMxsnB_sYy",
  [KOVAN_CHAIN_ID]:
    "https://eth-kovan.alchemyapi.io/v2/kKt4rItTbSfgSw5yTtZlRmqwQXU890aF",
  [BSC_CHAIN_ID]: "https://lb.nodies.app/v1/9af780ad7c9c42a0996c70d19a58c25f",
  [POLYGON_CHAIN_ID]:
    "https://lb.nodies.app/v1/d4fda5437eb44c82aed6b20fe472c8c9",
  [AVA_CHAIN_ID]: "https://api.avax.network/ext/bc/C/rpc",
  [FANTOM_CHAIN_ID]: "https://rpcapi.fantom.network",
  [XDAI_CHAIN_ID]: "https://rpc.gnosis.gateway.fm",
  [MOONBEAM_CHAIN_ID]: "https://rpc.testnet.moonbeam.network",
  [FUSE_CHAIN_ID]: "https://rpc.fuse.io",
  [ARBITRUM_CHAIN_ID]:
    "https://lb.nodies.app/v1/b33051ceac4b4a75a4bbc5102dc86ea0",
  [MOON_RIVER_CHAIN_ID]: "https://rpc.moonriver.moonbeam.network",
  [BOBA_CHAIN_ID]: "https://mainnet.boba.network",
  [HARMONY_CHAIN_ID]: "https://api.harmony.one",
  [OP_CHAIN_ID]: "https://lb.nodies.app/v1/91092cbc290e46a3a99251b4f18fb8c6",
  [CRONOS_CHAIN_ID]: "https://evm-cronos.crypto.org",
  [AUORA_CHAIN_ID]: "https://mainnet.aurora.dev",
  [METIS_CHAIN_ID]: "https://andromeda.metis.io/?owner=1088",
  [VELAS_CHAIN_ID]: "https://evmexplorer.velas.com/rpc",
  [KUCOIN_CHAIN_ID]: "https://rpc-mainnet.kcc.network",
  [KAVA_CHAIN_ID]: "https://lcd.kava3.data.kava.io",
  [ZKSYNC_CHAIN_ID]: "https://mainnet.era.zksync.io",
  [BASE_CHAIN_ID]: "https://lb.nodies.app/v1/7434c7c488a742aeaec6c61ba456ffef",
  [SCROLL_CHAIN_ID]: "https://rpc.scroll.io/",
  [EVMOS_CHAIN_ID]: "https://lb.nodies.app/v1/c5884321d7ef4c35be44cccc4236e1c3",
  [MODE_CHAIN_ID]:
    "https://mode-mainnet.blastapi.io/e1bf927b-39ad-47cf-98ff-b2b3c33ea5d4",
  [MOLTEN_CHAIN_ID]: "https://molten.calderachain.xyz/http",
  [MERLIN_CHAIN_ID]: "https://rpc.merlinchain.io",

};

export const NETWORKS_URLS_LEVERAGE: { [chainId: ChainId]: string } = {
  [OP_CHAIN_ID]:
    "https://rpc.ankr.com/optimism/757fd7b22f376e3de558f4314e5ec7acfed5b77c6ec675900d6ca9a97708f9ee",
  [POLYGON_CHAIN_ID]: "https://polygon-rpc.com",
  [ZKSYNC_CHAIN_ID]: "https://mainnet.era.zksync.io",
  [FANTOM_CHAIN_ID]: "https://rpcapi.fantom.network",
  [METIS_CHAIN_ID]: "https://andromeda.metis.io/?owner=1088",
  [AVA_CHAIN_ID]: "https://avalanche.public-rpc.com",
  [BSC_CHAIN_ID]: "https://lb.nodies.app/v1/9af780ad7c9c42a0996c70d19a58c25f	",
  [GNOSIS_CHAIN_ID]: "https://rpc.gnosis.gateway.fm",
  [BASE_CHAIN_ID]:
    "https://rpc.ankr.com/base/757fd7b22f376e3de558f4314e5ec7acfed5b77c6ec675900d6ca9a97708f9ee",
  [SCROLL_CHAIN_ID]: "https://rpc.scroll.io/",
  [EVMOS_CHAIN_ID]: "https://lb.nodies.app/v1/c5884321d7ef4c35be44cccc4236e1c3",
  [MODE_CHAIN_ID]:
    "https://mode-mainnet.blastapi.io/e1bf927b-39ad-47cf-98ff-b2b3c33ea5d4",
  [MOLTEN_CHAIN_ID]: "https://molten.calderachain.xyz/http",
  [MERLIN_CHAIN_ID]: "https://rpc.merlinchain.io",

};

export const BLOCK_EXPLORER: { [chainId: ChainId]: string } = {
  [MAINNET_CHAIN_ID]: "https://etherscan.io",
  [SEPOLIA_CHAIN_ID]: "https://sepolia.etherscan.io/",
  [KOVAN_CHAIN_ID]: "https://kovan.etherscan.io",
  [BSC_CHAIN_ID]: "https://www.bscscan.com",
  [AVA_CHAIN_ID]: "https://snowtrace.io",
  [POLYGON_CHAIN_ID]: "https://polygonscan.com",
  [FANTOM_CHAIN_ID]: "https://ftmscan.com",
  [XDAI_CHAIN_ID]: "https://blockscout.com/xdai/mainnet",
  [MOONBEAM_CHAIN_ID]: "https://moonbase.subscan.io",
  [FUSE_CHAIN_ID]: "https://explorer.fuse.io",
  [ARBITRUM_CHAIN_ID]: "https://arbiscan.io",
  [MOON_RIVER_CHAIN_ID]: "https://blockscout.moonriver.moonbeam.network",
  [BOBA_CHAIN_ID]: "https://bobascan.com",
  [HARMONY_CHAIN_ID]: "https://explorer.harmony.one",
  [KUCOIN_CHAIN_ID]: "https://explorer.kcc.io",
  [OP_CHAIN_ID]: "https://optimistic.etherscan.io",
  [CRONOS_CHAIN_ID]: "https://cronoscan.com",
  [AUORA_CHAIN_ID]: "https://aurorascan.dev",
  [METIS_CHAIN_ID]: "https://andromeda-explorer.metis.io",
  [VELAS_CHAIN_ID]: "https://evmexplorer.velas.com",
  [KAVA_CHAIN_ID]: "https://explorer.kava.io/",
  [ZKSYNC_CHAIN_ID]: "https://zksync2-mainnet.zkscan.io/",
  [BASE_CHAIN_ID]: "https://basescan.org/",
  [SCROLL_CHAIN_ID]: "https://scrollscan.com/",
  [EVMOS_CHAIN_ID]: "https://escan.live/",
  [MODE_CHAIN_ID]: "https://explorer.mode.network/",
  [MOLTEN_CHAIN_ID]: "https://molten.calderaexplorer.xyz",
  [MERLIN_CHAIN_ID]: "https://scan.merlinchain.io",
};

export const CHAIN_SYMBOL: { [chainId: ChainId]: string } = {
  [MAINNET_CHAIN_ID]: "ETH",
  [SEPOLIA_CHAIN_ID]: "SepoliaETH",
  [KOVAN_CHAIN_ID]: "ETH",
  [BSC_CHAIN_ID]: "BNB",
  [POLYGON_CHAIN_ID]: "MATIC",
  [AVA_CHAIN_ID]: "AVAX",
  [FANTOM_CHAIN_ID]: "FTM",
  [XDAI_CHAIN_ID]: "XDAI",
  [FUSE_CHAIN_ID]: "FUSE",
  [KUCOIN_CHAIN_ID]: "KCS",
  [ARBITRUM_CHAIN_ID]: "ETH",
  [MOON_RIVER_CHAIN_ID]: "MOVR",
  [BOBA_CHAIN_ID]: "ETH",
  [HARMONY_CHAIN_ID]: "ONE",
  [OP_CHAIN_ID]: "ETH",
  [CRONOS_CHAIN_ID]: "CRO",
  [AUORA_CHAIN_ID]: "ETH",
  [METIS_CHAIN_ID]: "METIS",
  [VELAS_CHAIN_ID]: "VLX",
  [MOONBEAM_CHAIN_ID]: "GLMR",
  [KAVA_CHAIN_ID]: "KAVA",
  [ZKSYNC_CHAIN_ID]: "ETH",
  [BASE_CHAIN_ID]: "ETH",
  [SCROLL_CHAIN_ID]: "ETH",
  [EVMOS_CHAIN_ID]: "EVMOS",
  [MODE_CHAIN_ID]: "ETH",
  [MOLTEN_CHAIN_ID]: "MOLTEN",
  [MERLIN_CHAIN_ID]: "MERLIN",
};
