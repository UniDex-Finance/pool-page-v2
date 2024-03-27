import questionCircle from "../assets/question-circle.svg";
import { Address, ChainId, TokenData, TokenSymbol } from "../types";
import { TokenDataMinimal } from "../types/token";
import {
  CRYPTO_ICON_SRC,
  MAINNET_CHAIN_ID,
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
  HARMONY_CHAIN_ID,
  OP_CHAIN_ID,
  CRONOS_CHAIN_ID,
  AUORA_CHAIN_ID,
  METIS_CHAIN_ID,
  VELAS_CHAIN_ID,
  SEPOLIA_CHAIN_ID,
  KAVA_CHAIN_ID,
  ZKSYNC_CHAIN_ID,
  BASE_CHAIN_ID,
  SCROLL_CHAIN_ID,
  EVMOS_CHAIN_ID,
  AVALANCHE_CHAIN_ID,
  GNOSIS_CHAIN_ID,
  MODE_CHAIN_ID
} from "./networks";

export const DISABLE_TOKENS: Map<TokenSymbol, boolean> = new Map<
  TokenSymbol,
  boolean
>();
export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

// This is what we use internally to represent ETH.
export const EEEE_ADDRESS = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
export const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";
export const NULL_ADDRESS_ONE_INCH =
  "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
export const NULL_ADDRESS_PARASWAP =
  "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
export const NULL_ADDRESS_FIREBIRD =
  "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
export const NULL_ADDRESS_OPENOCEAN =
  "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
export const NULL_ADDRESS_KYBER_NETWORK =
  "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
export const ETH_INTERNAL = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

export const EMPTY_TOKEN: TokenData = {
  address: "",
  chainId: -1,
  decimals: 0,
  name: "???",
  symbol: "???",
  logoURI: questionCircle,
};

function newNativeToken(
  chainId: number,
  name: string,
  symbol: TokenSymbol,
  logoUri?: string
): TokenData {
  return {
    address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    chainId,
    decimals: 18,
    name,
    symbol,
    logoURI: logoUri,
  };
}

export const NATIVE_TOKENS = [
  newNativeToken(
    MAINNET_CHAIN_ID,
    "Ether",
    "ETH",
    "https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
  ),
  newNativeToken(
    SEPOLIA_CHAIN_ID,
    "Sepolia Ether",
    "SepoliaETH",
    "https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
  ),
  newNativeToken(
    KOVAN_CHAIN_ID,
    "Kovan Ether",
    "ETH",
    "https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
  ),
  newNativeToken(
    BSC_CHAIN_ID,
    "Binance Coin",
    "BNB",
    "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/info/logo.png"
  ),
  newNativeToken(
    POLYGON_CHAIN_ID,
    "Matic",
    "MATIC",
    "https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/polygon/assets/0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270/logo.png"
  ),
  newNativeToken(
    FANTOM_CHAIN_ID,
    "Fantom",
    "FTM",
    "https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/0x4E15361FD6b4BB609Fa63C81A2be19d873717870/logo.png"
  ),
  newNativeToken(
    AVA_CHAIN_ID,
    "Avalanche",
    "AVAX",
    "https://avascan.info/cdn/images/addresses/wavax.svg"
  ),
  newNativeToken(
    XDAI_CHAIN_ID,
    "xDai",
    "XDAI",
    "https://raw.githubusercontent.com/1Hive/default-token-list/master/src/assets/xdai/0xe91d153e0b41518a2ce8dd3d7944fa863463a97d/logo.png"
  ),
  newNativeToken(
    MOONBEAM_CHAIN_ID,
    "Moonbeam",
    "DEV",
    "https://docs.moonbeam.network/assets/images/Moonbeam-Favicon-50.png"
  ),
  newNativeToken(
    FUSE_CHAIN_ID,
    "Fuse",
    "Fuse",
    "https://fuseswap.com/static/media/fuse-logo.db1e12ce.svg"
  ),
  newNativeToken(
    ARBITRUM_CHAIN_ID,
    "Ethereum",
    "ETH",
    "https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
  ),
  newNativeToken(
    MOON_RIVER_CHAIN_ID,
    "Moonriver",
    "MOVR",
    "https://res.cloudinary.com/sushi-cdn/image/fetch/w_64/https://raw.githubusercontent.com/sushiswap/icons/master/token/movr.jpg"
  ),
  newNativeToken(
    BOBA_CHAIN_ID,
    "Ethereum",
    "ETH",
    "https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
  ),
  newNativeToken(
    OP_CHAIN_ID,
    "Ethereum",
    "ETH",
    "https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
  ),
  newNativeToken(
    HARMONY_CHAIN_ID,
    "Harmony",
    "ONE",
    "https://swoop-exchange.s3-us-west-1.amazonaws.com/tokens/WONE.png"
  ),
  newNativeToken(
    METIS_CHAIN_ID,
    "Metis",
    "METIS",
    "https://raw.githubusercontent.com/Netswap/tokens/master/assets/0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000/logo.png"
  ),
  newNativeToken(
    AUORA_CHAIN_ID,
    "Ethereum",
    "ETH",
    "https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
  ),
  newNativeToken(
    VELAS_CHAIN_ID,
    "Velas",
    "VLX",
    "https://github.com/wagyuswapapp/assets/blob/master/blockchains/velas/assets/0xc579d1f3cf86749e05cd06f7ade17856c2ce3126/logo.png?raw=true"
  ),
  newNativeToken(
    CRONOS_CHAIN_ID,
    "Crypto.com",
    "CRO",
    "https://s2.coinmarketcap.com/static/img/coins/64x64/14532.png"
  ),
  newNativeToken(
    KAVA_CHAIN_ID,
    "Kava",
    "KAVA",
    "https://raw.githubusercontent.com/Kava-Labs/kava/master/client/assets/kava.png"
  ),
  newNativeToken(
    ZKSYNC_CHAIN_ID,
    "Ethereum",
    "ETH",
    "https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
  ),
  newNativeToken(
    BASE_CHAIN_ID,
    "Ethereum",
    "ETH",
    "https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
  ),
  newNativeToken(
    SCROLL_CHAIN_ID,
    "Ethereum",
    "ETH",
    "https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
  ),
  newNativeToken(
    EVMOS_CHAIN_ID,
    "Evmos",
    "EVMOS",
    "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/stevmos.png"
  ),
  newNativeToken(
    MODE_CHAIN_ID,
    "Ethereum",
    "ETH",
    "https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
  ),
];

export const NATIVE_TOKEN_BY_CHAIN_ID: { [chainId: number]: TokenData } = {
  [MAINNET_CHAIN_ID]: NATIVE_TOKENS[0],
  [SEPOLIA_CHAIN_ID]: NATIVE_TOKENS[1],
  [KOVAN_CHAIN_ID]: NATIVE_TOKENS[1],
  [BSC_CHAIN_ID]: NATIVE_TOKENS[2],
  [POLYGON_CHAIN_ID]: NATIVE_TOKENS[3],
  [FANTOM_CHAIN_ID]: NATIVE_TOKENS[4],
  [AVA_CHAIN_ID]: NATIVE_TOKENS[5],
  [XDAI_CHAIN_ID]: NATIVE_TOKENS[6],
  [MOONBEAM_CHAIN_ID]: NATIVE_TOKENS[7],
  [FUSE_CHAIN_ID]: NATIVE_TOKENS[8],
  [ARBITRUM_CHAIN_ID]: NATIVE_TOKENS[9],
  [MOON_RIVER_CHAIN_ID]: NATIVE_TOKENS[10],
  [BOBA_CHAIN_ID]: NATIVE_TOKENS[11],
  [OP_CHAIN_ID]: NATIVE_TOKENS[12],
  [HARMONY_CHAIN_ID]: NATIVE_TOKENS[13],
  [METIS_CHAIN_ID]: NATIVE_TOKENS[14],
  [AUORA_CHAIN_ID]: NATIVE_TOKENS[15],
  [VELAS_CHAIN_ID]: NATIVE_TOKENS[16],
  [CRONOS_CHAIN_ID]: NATIVE_TOKENS[17],
  [KAVA_CHAIN_ID]: NATIVE_TOKENS[18],
  [ZKSYNC_CHAIN_ID]: NATIVE_TOKENS[19],
  [BASE_CHAIN_ID]: NATIVE_TOKENS[20],
  [SCROLL_CHAIN_ID]: NATIVE_TOKENS[21],
  [EVMOS_CHAIN_ID]: NATIVE_TOKENS[22],
  [MODE_CHAIN_ID]: NATIVE_TOKENS[23],
};

export const USDC_ADDRESS_BY_CHAIN: { [chainId: ChainId]: Address } = {
  [MAINNET_CHAIN_ID]: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  [KOVAN_CHAIN_ID]: "0xb7a4F3E9097C08dA09517b5aB877F7a917224ede",
  [BSC_CHAIN_ID]: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
  [POLYGON_CHAIN_ID]: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
  [FANTOM_CHAIN_ID]: "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75",
  [AVA_CHAIN_ID]: "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664",
  [XDAI_CHAIN_ID]: "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83",
  [MOONBEAM_CHAIN_ID]: "0x818ec0A7Fe18Ff94269904fCED6AE3DaE6d6dC0b",
  [FUSE_CHAIN_ID]: "0x620fd5fa44BE6af63715Ef4E65DDFA0387aD13F5",
  [ARBITRUM_CHAIN_ID]: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
  [MOON_RIVER_CHAIN_ID]: "0xe3f5a90f9cb311505cd691a46596599aa1a0ad7d",
  [BOBA_CHAIN_ID]: "0x66a2A913e447d6b4BF33EFbec43aAeF87890FBbc",
  [OP_CHAIN_ID]: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
  [HARMONY_CHAIN_ID]: "0x985458E523dB3d53125813eD68c274899e9DfAb4",
  [METIS_CHAIN_ID]: "0xEA32A96608495e54156Ae48931A7c20f0dcc1a21",
  [AUORA_CHAIN_ID]: "0xB12BFcA5A55806AaF64E99521918A4bf0fC40802",
  [VELAS_CHAIN_ID]: "0xe2C120f188eBd5389F71Cf4d9C16d05b62A58993",
  [CRONOS_CHAIN_ID]: "0xc21223249CA28397B4B6541dfFaEcC539BfF0c59",
  [KAVA_CHAIN_ID]: "0xfA9343C3897324496A05fC75abeD6bAC29f8A40f",
  [ZKSYNC_CHAIN_ID]: "0x3355df6d4c9c3035724fd0e3914de96a5a83aaf4",
};

export const COINGECKO_NATIVE_TOKEN_IDS: { [chainId: ChainId]: string } = {
  [MAINNET_CHAIN_ID]: "ethereum",
  [KOVAN_CHAIN_ID]: "ethereum",
  [BSC_CHAIN_ID]: "binancecoin",
  [POLYGON_CHAIN_ID]: "matic-network",
  [FANTOM_CHAIN_ID]: "fantom",
  [AVA_CHAIN_ID]: "avalanche-2",
  [XDAI_CHAIN_ID]: "xdai",
  [MOONBEAM_CHAIN_ID]: "moonbeam",
  [FUSE_CHAIN_ID]: "fuse-network-token",
  [ARBITRUM_CHAIN_ID]: "ethereum",
  [MOON_RIVER_CHAIN_ID]: "moonriver",
  [BOBA_CHAIN_ID]: "ethereum",
  [OP_CHAIN_ID]: "ethereum",
  [HARMONY_CHAIN_ID]: "harmony",
  [METIS_CHAIN_ID]: "metis-token",
  [AUORA_CHAIN_ID]: "ethereum",
  [VELAS_CHAIN_ID]: "velas",
  [CRONOS_CHAIN_ID]: "crypto-com-chain",
  [KAVA_CHAIN_ID]: "kava",
  [ZKSYNC_CHAIN_ID]: "zksync",
};

export const DEFAULT_FROM_BY_CHAIN_ID = NATIVE_TOKEN_BY_CHAIN_ID;

export const DEFAULT_TO_BY_CHAIN_ID: { [chainId: number]: Address } = {
  [MAINNET_CHAIN_ID]: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  [KOVAN_CHAIN_ID]: "",
  [BSC_CHAIN_ID]: "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3",
  [POLYGON_CHAIN_ID]: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
  [FANTOM_CHAIN_ID]: "0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E",
  [AVA_CHAIN_ID]: "0x6e84a6216ea6dacc71ee8e6b0a5b7322eebc0fdd",
  [XDAI_CHAIN_ID]: "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d",
  [MOONBEAM_CHAIN_ID]: "",
  [FUSE_CHAIN_ID]: "",
  [ARBITRUM_CHAIN_ID]: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
  [MOON_RIVER_CHAIN_ID]: "",
  [BOBA_CHAIN_ID]: "0x5008F837883EA9a07271a1b5eB0658404F5a9610",
  [OP_CHAIN_ID]: "0x5d47baba0d66083c52009271faf3f50dcc01023c",
  [HARMONY_CHAIN_ID]: "0x6983D1E6DEf3690C4d616b13597A09e6193EA013",
  [METIS_CHAIN_ID]: "0x90fE084F877C65e1b577c7b2eA64B8D8dd1AB278",
  [AUORA_CHAIN_ID]: "0xFa94348467f64D5A457F75F8bc40495D33c65aBB",
  [VELAS_CHAIN_ID]: "0x33f879690c165cc320b0ba04ceb1f9ceac80f376",
  [CRONOS_CHAIN_ID]: "0x2d03bece6747adc00e1a131bba1469c15fd11e03",
  [KAVA_CHAIN_ID]: "0xfA9343C3897324496A05fC75abeD6bAC29f8A40f",
  [ZKSYNC_CHAIN_ID]: "0xee1e88eb20becdebe1e88f50c9f8b1d72478f2d0",
};

export const NATIVE_WRAPPED_TOKEN: { [chainStr: string]: string } = {
  ethereum: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", // WETH
  bsc: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c", // WBNB
  matic: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270", // WMATIC?
};

function newMinimalToken(
  address: Address,
  symbol: string,
  name: string
): TokenDataMinimal {
  return {
    address,
    name,
    symbol,
  };
}

export const NATIVE_WRAPPED_TOKEN_BY_CHAIN_ID: {
  [chainId: number]: TokenDataMinimal;
} = {
  [MAINNET_CHAIN_ID]: newMinimalToken(
    "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "WETH",
    "Wrapped ETH"
  ),
  [BSC_CHAIN_ID]: newMinimalToken(
    "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
    "WBNB",
    "Wrapped BNB"
  ),
  [POLYGON_CHAIN_ID]: newMinimalToken(
    "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
    "WMATIC",
    "Wrapped MATiC"
  ),
  [ARBITRUM_CHAIN_ID]: newMinimalToken(
    "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
    "WETH",
    "Wrapped ETH"
  ),
  [XDAI_CHAIN_ID]: newMinimalToken(
    "0xe91d153e0b41518a2ce8dd3d7944fa863463a97d",
    "WXDAI",
    "Wrapped xDai"
  ),
  [AVA_CHAIN_ID]: newMinimalToken(
    "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7",
    "WAVAX",
    "Wrapped AVAX"
  ),
  [FANTOM_CHAIN_ID]: newMinimalToken(
    "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83",
    "WFTM",
    "Wrapped FTM"
  ),
  [MOON_RIVER_CHAIN_ID]: newMinimalToken(
    "0x98878b06940ae243284ca214f92bb71a2b032b8a",
    "WMOVR",
    "Wrapped MOVR"
  ),
  [BOBA_CHAIN_ID]: newMinimalToken(
    "0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000",
    "WETH",
    "Wrapped ETH"
  ),
  [OP_CHAIN_ID]: newMinimalToken(
    "0x4200000000000000000000000000000000000006",
    "WETH",
    "Wrapped ETH"
  ),
  [HARMONY_CHAIN_ID]: newMinimalToken(
    "0xcf664087a5bb0237a0bad6742852ec6c8d69a27a",
    "WONE",
    "Wrapped ONE"
  ),
  [METIS_CHAIN_ID]: newMinimalToken(
    "0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000",
    "METIS",
    "Wrapped Metisß"
  ),
  [AUORA_CHAIN_ID]: newMinimalToken(
    "0xC9BdeEd33CD01541e1eeD10f90519d2C06Fe3feB",
    "WETH",
    "Wrapped ETH"
  ),
  [VELAS_CHAIN_ID]: newMinimalToken(
    "0xc579d1f3cf86749e05cd06f7ade17856c2ce3126",
    "WVLX",
    "Wrapped Velas"
  ),
  [CRONOS_CHAIN_ID]: newMinimalToken(
    "0x0625a68d25d304aed698c806267a4e369e8eb12a",
    "WCRO",
    "Wrapped CRO"
  ),
  [KAVA_CHAIN_ID]: newMinimalToken(
    "0xc86c7C0eFbd6A49B35E8714C5f59D99De09A225b",
    "KAVA",
    "Kava"
  ),
  [ZKSYNC_CHAIN_ID]: newMinimalToken(
    "0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91",
    "WETH",
    "Wrapped ETH"
  ),
};

export const USD_PEG_TOKEN: { [chainStr: string]: string } = {
  ethereum: "0xdac17f958d2ee523a2206206994597c13d831ec7", // USDT
  bsc: "0xe9e7cea3dedca5984780bafc599bd69add087d56", // BUSD
  matic: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f", // USDT
};

export const DEFAULT_FROM_TOKEN_DATA = {
  symbol: "ETH",
  name: "Ether",
  address: EEEE_ADDRESS,
  decimals: 18,
  chainId: 1,
  logoURI:
    "https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
};

export const DEFAULT_TO_TOKEN_DATA = {
  symbol: "USDC",
  name: "USD Coin",
  address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  decimals: 6,
  chainId: 1,
  logoURI:
    "https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
};

export const CURRENCY_DETAILS: {
  [chainId: ChainId]: {
    [symbol: string]: {
      name: string;
      value: string;
      img?: string;
      address: string;
      decimals: number;
      llama?: string;
    };
  };
} = {
  [OP_CHAIN_ID]: {
    ETH: {
      name: "ETH",
      value: "ETH",
      img: CRYPTO_ICON_SRC.ETH,
      address: "0x0000000000000000000000000000000000000000",
      decimals: 18,
      llama: "optimism:0x0000000000000000000000000000000000000000",
    },
    DAI: {
      name: "DAI",
      value: "DAI",
      img: CRYPTO_ICON_SRC.DAI,
      address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
      decimals: 18,
      llama: "optimism:0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
    },
  },
  [SCROLL_CHAIN_ID]: {
    ETH: {
      name: "ETH",
      value: "ETH",
      img: CRYPTO_ICON_SRC.ETH,
      address: "0x0000000000000000000000000000000000000000",
      decimals: 18,
      llama: "arbitrum:0x0000000000000000000000000000000000000000",
    },
  },
  [ZKSYNC_CHAIN_ID]: {
    USDC: {
      name: "USDC",
      value: "USDC",
      img: CRYPTO_ICON_SRC.USDC,
      address: "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4",
      decimals: 6,
      llama: "era:0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4",
    },
  },
  [EVMOS_CHAIN_ID]: {
    STEVMOS: {
      name: "STEVMOS",
      value: "STEVMOS",
      img: CRYPTO_ICON_SRC.STEVMOS,
      address: "0x2C68D1d6aB986Ff4640b51e1F14C716a076E44C4",
      decimals: 18,
      llama: "evmos:0x2C68D1d6aB986Ff4640b51e1F14C716a076E44C4",
    },
  },
  [MODE_CHAIN_ID]: {
    ETH: {
      name: "ETH",
      value: "ETH",
      img: CRYPTO_ICON_SRC.ETH,
      address: "0x0000000000000000000000000000000000000000",
      decimals: 18,
      llama: "optimism:0x0000000000000000000000000000000000000000",
    },
  },
  [BSC_CHAIN_ID]: {
    USDT: {
      name: "USDT",
      value: "USDT",
      img: CRYPTO_ICON_SRC.USDT,
      address: "0x55d398326f99059fF775485246999027B3197955",
      decimals: 18,
      llama: "bsc:0x55d398326f99059fF775485246999027B3197955",
    },
    BUSD: {
      name: "BUSD",
      value: "BUSD",
      img: CRYPTO_ICON_SRC.USDT,
      address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
      decimals: 18,
    },
    BNB: {
      name: "BNB",
      value: "BNB",
      img: CRYPTO_ICON_SRC.BNB,
      address: "0x0000000000000000000000000000000000000000",
      decimals: 18,
    },
    GOLDEN: {
      name: "BNB",
      value: "BNB",
      img: CRYPTO_ICON_SRC.GOLDEN,
      address: "0x7d4984490c4c68f8ead9dddca6d04c514ef77324",
      decimals: 9,
    },
  },
  [GNOSIS_CHAIN_ID]: {
    XDAI: {
      name: "XDAI",
      value: "XDAI",
      img: CRYPTO_ICON_SRC.XDAI,
      address: "0x0000000000000000000000000000000000000000",
      decimals: 18,
      llama: "gnosis:0x0000000000000000000000000000000000000000",
    },
  },
  [BASE_CHAIN_ID]: {
    ETH: {
      name: "ETH",
      value: "ETH",
      img: CRYPTO_ICON_SRC.ETH,
      address: "0x0000000000000000000000000000000000000000",
      decimals: 18,
      llama: "base:0x0000000000000000000000000000000000000000",
    },
    CRVUSD: {
      name: "CRVUSD",
      value: "CRVUSD",
      img: CRYPTO_ICON_SRC.CRVUSD,
      address: "0x417ac0e078398c154edfadd9ef675d30be60af93",
      decimals: 18,
      llama: "base:0x417ac0e078398c154edfadd9ef675d30be60af93",
    },
  },
  [FANTOM_CHAIN_ID]: {
    FTM: {
      name: "FTM",
      value: "FTM",
      img: CRYPTO_ICON_SRC.FTM,
      address: "0x0000000000000000000000000000000000000000",
      decimals: 18,
      llama: "fantom:0x0000000000000000000000000000000000000000",
    },
    USDC: {
      name: "USDC",
      value: "USDC",
      img: CRYPTO_ICON_SRC.USDC,
      address: "0x04068da6c83afcfa0e13ba15a6696662335d5b75",
      decimals: 6,
      llama: "fantom:0x04068da6c83afcfa0e13ba15a6696662335d5b75",
    },
    USDT: {
      name: "USDT",
      value: "USDT",
      img: CRYPTO_ICON_SRC.USDT,
      address: "0xd226392C23fb3476274ED6759D4a478db3197d82",
      decimals: 6,
    },
    DAI: {
      name: "DAI",
      value: "DAI",
      img: CRYPTO_ICON_SRC.DAI,
      address: "0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e",
      decimals: 18,
      llama: "fantom:0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e",
    },
  },
  [METIS_CHAIN_ID]: {
    METIS: {
      name: "METIS",
      value: "METIS",
      img: CRYPTO_ICON_SRC.METIS,
      address: "0x0000000000000000000000000000000000000000",
      decimals: 18,
      llama: "metis:0x0000000000000000000000000000000000000000",
    },
  },
  [ARBITRUM_CHAIN_ID]: {
    ETH: {
      name: "ETH",
      value: "ETH",
      img: CRYPTO_ICON_SRC.ETH,
      address: "0x0000000000000000000000000000000000000000",
      decimals: 18,
      llama: "arbitrum:0x0000000000000000000000000000000000000000",
    },
    "USDC.E": {
      name: "USDC.e",
      value: "USDC.e",
      img: CRYPTO_ICON_SRC.USDC,
      address: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
      decimals: 6,
      llama: "arbitrum:0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
    },
    USDC: {
      name: "USDC",
      value: "USDC",
      img: CRYPTO_ICON_SRC.USDC,
      address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      decimals: 6,
      llama: "arbitrum:0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    },
    DAI: {
      name: "DAI",
      value: "DAI",
      img: CRYPTO_ICON_SRC.DAI,
      address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
      decimals: 18,
      llama: "arbitrum:0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
    },
    USDT: {
      name: "USDT",
      value: "USDT",
      img: CRYPTO_ICON_SRC.USDT,
      address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
      decimals: 6,
      llama: "arbitrum:0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
    },
    GDAI: {
      name: "GDAI",
      value: "GDAI",
      img: CRYPTO_ICON_SRC.GDAI,
      address: "0xd85e038593d7a098614721eae955ec2022b9b91b",
      decimals: 18,
      llama: "arbitrum:0xd85e038593d7a098614721eae955ec2022b9b91b",
    },
    WBTC: {
      name: "WBTC",
      value: "WBTC",
      img: CRYPTO_ICON_SRC.WBTC,
      address: "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
      decimals: 8,
      llama: "arbitrum:0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
    },
    ARB: {
      name: "ARB",
      value: "ARB",
      img: CRYPTO_ICON_SRC.ARB,
      address: "0x912ce59144191c1204e64559fe8253a0e49e6548",
      decimals: 18,
      llama: "arbitrum:0x912ce59144191c1204e64559fe8253a0e49e6548",
    },
    MIM: {
      name: "MIM",
      value: "MIM",
      img: CRYPTO_ICON_SRC.MIM,
      address: "0xfea7a6a0b346362bf88a9e4a88416b77a57d6c2a",
      decimals: 18,
      llama: "arbitrum:0xfea7a6a0b346362bf88a9e4a88416b77a57d6c2a",
    },

    RAM: {
      name: "RAM",
      value: "RAM",
      img: CRYPTO_ICON_SRC.RAM,
      address: "0xaaa6c1e32c55a7bfa8066a6fae9b42650f262418",
      decimals: 18,
      llama: "arbitrum:0xaaa6c1e32c55a7bfa8066a6fae9b42650f262418",
    },
    MAI: {
      name: "MAI",
      value: "MAI",
      img: CRYPTO_ICON_SRC.MAI,
      address: "0x3F56e0c36d275367b8C502090EDF38289b3dEa0d",
      decimals: 18,
      llama: "arbitrum:0x3F56e0c36d275367b8C502090EDF38289b3dEa0d",
    },
    GMX: {
      name: "GMX",
      value: "GMX",
      img: CRYPTO_ICON_SRC.GMX,
      address: "0xfc5a1a6eb076a2c7ad06ed22c90d7e710e35ad0a",
      decimals: 18,
      llama: "arbitrum:0xfc5a1a6eb076a2c7ad06ed22c90d7e710e35ad0a",
    },
    WSTETH: {
      name: "WSTETH",
      value: "WSTETH",
      img: CRYPTO_ICON_SRC.WSTETH,
      address: "0x5979D7b546E38E414F7E9822514be443A4800529",
      decimals: 18,
      llama: "arbitrum:0x5979D7b546E38E414F7E9822514be443A4800529",
    },
    CAP: {
      name: "CAP",
      value: "CAP",
      img: CRYPTO_ICON_SRC.CAP,
      address: "0x031d35296154279dc1984dcd93e392b1f946737b",
      decimals: 18,
      llama: "arbitrum:0x031d35296154279dc1984dcd93e392b1f946737b",
    },
    UNSHETH: {
      name: "UNSHETH",
      value: "UNSHETH",
      img: CRYPTO_ICON_SRC.UNSHETH,
      address: "0x0Ae38f7E10A43B5b2fB064B42a2f4514cbA909ef",
      decimals: 18,
      llama: "arbitrum:0x0Ae38f7E10A43B5b2fB064B42a2f4514cbA909ef",
    },
    GNS: {
      name: "GNS",
      value: "GNS",
      img: CRYPTO_ICON_SRC.GNS,
      address: "0x18c11FD286C5EC11c3b683Caa813B77f5163A122",
      decimals: 18,
      llama: "arbitrum:0x18c11FD286C5EC11c3b683Caa813B77f5163A122",
    },
  },
  [AVALANCHE_CHAIN_ID]: {
    AVAX: {
      name: "AVAX",
      value: "AVAX",
      img: CRYPTO_ICON_SRC.AVA,
      address: "0x0000000000000000000000000000000000000000",
      decimals: 18,
    },
    ETH: {
      name: "ETH",
      value: "ETH",
      img: CRYPTO_ICON_SRC.ETH,
      address: "0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f",
      decimals: 18,
    },
    "USDC.E": {
      name: "USDC.e",
      value: "USDC.e",
      img: CRYPTO_ICON_SRC.USDC,
      address: "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664",
      decimals: 6,
    },
    MIM: {
      name: "MIM",
      value: "MIM",
      img: CRYPTO_ICON_SRC.MIM,
      address: "0x130966628846BFd36ff31a822705796e8cb8C18D",
      decimals: 18,
    },
  },
};
