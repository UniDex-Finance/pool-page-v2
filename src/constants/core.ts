import { NETWORK_NAMES_API } from ".";
import { ARBITRUM_CHAIN_ID } from "./networks";
import { ADDRESS_ZERO } from "./tokens";

export const CURRENCY_LOGOS = {
  weth: "/src/assets/logos/ETH.svg",
  eth: "/src/assets/logos/ETH.svg",
  usdc: "/src/assets/logos/USDC.svg",
  ftm: "/src/assets/logos/FTM.svg",
  arb: "/src/assets/logos/ARB.svg",
  metis: "/src/assets/logos/METIS.svg",
  cap: "/src/assets/logos/CAP.svg",
  dai: "/src/assets/logos/DAI.svg",
  busd: "/src/assets/logos/BUSD.svg",
  boba: "/src/assets/logos/BOBA.svg",
  op: "/src/assets/logos/OP.svg",
  mim: "/src/assets/logos/MIM.png",
  usdt: "/src/assets/logos/USDT.svg",
  gdai: "/src/assets/logos/GDAI.webp",
  ram: "/src/assets/logos/RAM.webp",
  mai: "/src/assets/logos/MAI.webp",
  gmx: "/src/assets/logos/GMX.svg",
  wsteth: "/src/assets/logos/WSTETH.png",
  gns: "/src/assets/logos/GNS.png",
  captoken: "/src/assets/logos/CAPLOGO.svg",
  unsheth: "/src/assets/logos/UNSHETH.png",
  wbtc: "/src/assets/logos/BTC.svg",
  retro: "/src/assets/logos/RETRO.png",
  cash: "/src/assets/logos/CASH.png",
  ogre: "/src/assets/logos/OGRE.webp",
  base: "/src/assets/logos/BASE.svg",
  bswap: "/src/assets/logos/BSWAP.jpg",
  bvm: "/src/assets/logos/bvm.png",
  crvusd: "/src/assets/logos/CRVUSD.png",
  mantle: "/src/assets/logos/MANTLE.jpg",
  stevmos: "/src/assets/logos/STEVMOS.webp",
  fort: "/src/assets/logos/FORT.jpg",
  bnb: "/src/assets/logos/BNB.svg",
  golden: "/src/assets/logos/golden.png",
};

export const ABIS: { [key: string]: string[] } = {
  router: [
    "function trading() view returns(address)",
    "function treasury() view returns(address)",
    "function capPool() view returns(address)",
    "function oracle() view returns(address)",

    "function getPool(address currency) view returns(address)",
    "function getPoolShare(address currency) view returns(uint256)",
    "function getCapShare(address currency) view returns(uint256)",
    "function getPoolRewards(address currency) view returns(address)",
    "function getCapRewards(address currency) view returns(address)",
  ],
  trading: [
    "function getProduct(bytes32 productId) view returns(tuple(uint64 maxLeverage, uint64 liquidationThreshold, uint64 liquidationFee, uint64 fee, uint64 shortFee, uint64 interest))",
    "function getOrders(bytes32[] keys) view returns(tuple(bool isClose, uint64 size, uint64 margin)[])",
    "function getPositions(bytes32[] keys) view returns(tuple(uint64 size, uint64 margin, uint64 timestamp, uint64 price)[])",

    "function submitOrder(bytes32 productId,address currency,address referral,bool isLong,bytes32 limitPrice,uint256 margin,uint256 size) payable",
    "function submitCloseOrder(bytes32 productId,address currency, address referral, bool isLong, bytes32 limitPrice,uint256 size) payable",
    "function cancelOrder(bytes32 productId,address currency,bool isLong)",

    "event NewOrder(bytes32 indexed key,address indexed user,bytes32 indexed productId,address currency,bool isLong,uint256 margin,uint256 size,bool isClose)",
    "event PositionUpdated(bytes32 indexed key,address indexed user,bytes32 indexed productId,address currency,bool isLong,uint256 margin,uint256 size,uint256 price,uint256 fee)",
    "event ClosePosition(bytes32 indexed key,address indexed user,bytes32 indexed productId,address currency,bool isLong,uint256 price,uint256 margin,uint256 size,uint256 fee,int256 pnl,bool wasLiquidated)",
  ],
  pool: [
    "function getUtilization() view returns(uint256)",
    "function getBalance(address account) view returns(uint256)",
    "function getCurrencyBalance(address account) view returns(uint256)",
    "function totalSupply() view returns(uint256)",
    "function withdrawFee() view returns(uint256)",
    "function openInterest() view returns(uint256)",
    "function utilizationMultiplier() view returns(uint256)",
    "function minDepositTime() view returns(uint256)",

    "function deposit(uint256 amount) payable",
    "function withdraw(uint256 amount)",
  ],
  rewards: [
    "function getClaimableReward() view returns(uint256)",

    "function collectReward()",
  ],
  treasury: [],
  oracle: [
    "event SettlementError(uint256 indexed orderId,bool indexed isClose,string reason)",
  ],
  erc20: [
    "function totalSupply() view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function balanceOf(address account) view returns (uint256)",
    "function transfer(address recipient, uint256 amount) returns (bool)",
    "function allowance(address owner, address spender) view returns (uint256)",
    "function approve(address spender, uint256 amount) returns (bool)",
  ],
};

export const CHAINDATA: { [key: number]: { [key: string]: any } } = {
  360: {
    poolAddress: {
      usdc: "0x21708707f03A19C3a4ea5E1a132B5cF96b86F294",
    },
    rewardsContract: {
      usdc: "0x42EbA10b9bf487baD672c9479810DbFE305721D3",
    },
    collateral: {
      usdc: "0x135B641E61CFC9a068b82E02fF0f051f6e5D4721",
    },
  },
  42161: {
    poolAddress: {
      eth: "0xdAF7D157F5c6E0F1d7917Ca02a7C185cEF81e6d0",
      usdc: "0x09E122453A079bc2Be621769ae7799e53dA0054E",
    },
    rewardsContract: {
      eth: "0xf2669628818384fa40c3E68e4e5995f4D882F811",
      usdc: "0xa40dCF6C15419d418337E177dAE6a54f1FA65569",
    },
    collateral: {
      eth: ADDRESS_ZERO,
      usdc: "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
    },
  },
  324: {
    poolAddress: {
      usdc: "0xa41A6a4A04E711B53a82E594CeB525e89206627A",
    },
    rewardsContract: {
      usdc: "0xe66248B8eE03643FDf87bF69ecaF07AdF01E0eaa",
    },
    collateral: {
      usdc: "0x3355df6d4c9c3035724fd0e3914de96a5a83aaf4",
    },
  },
  9001: {
    poolAddress: {
      stevmos: "0x21708707f03A19C3a4ea5E1a132B5cF96b86F294",
    },
    rewardsContract: {
      stevmos: "0x994fE8278Efc9Fe56098b8130392bb208Dc81ee0",
    },
    collateral: {
      stevmos: "0x2C68D1d6aB986Ff4640b51e1F14C716a076E44C4",
    },
  },
  250: {
    poolAddress: {
      ftm: "0xBec7d4561037e657830F78b87e780AeE1d09Fc7B",
    },
    rewardsContract: {
      ftm: "0xb29b4A6589b489E44644f661648A7706B9360059",
    },
    collateral: {
      ftm: ADDRESS_ZERO,
    },
  },
  10: {
    poolAddress: {
      dai: "0xCdDF71750E596b4C38785afFEc3bd4C9bff43f6F",
      eth: "0x68A4cF26705B3cEaB49d1C99DE98F3Db28ee767E",
    },
    rewardsContract: {
      dai: "0x267c39Bbc612FD0dcEeaB8Ec6Ea65c67e2Bf8FAB",
      eth: "0xFEc73187273A535B5773ae9C9Ade05DB1950491a",
    },
    collateral: {
      dai: "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1",
      eth: ADDRESS_ZERO,
    },
  },
  34443: {
    poolAddress: {
      eth: "0x21708707f03A19C3a4ea5E1a132B5cF96b86F294",
    },
    rewardsContract: {
      eth: "0x9673B0E0F07e4a6da712F6847aE93C3F157DD509",
    },
    collateral: {
      eth: ADDRESS_ZERO,
    },
  },
  8453: {
    poolAddress: {
      eth: "0x9Ba3db52BC401F4EF8ba23e56268C3AdE0290837",
      bswap: "0xe10f7BCFf83A0263c03Ba27795d11f4B1631Ef4e",
    },
    rewardsContract: {
      eth: "0x9673B0E0F07e4a6da712F6847aE93C3F157DD509",
      bswap: "0x3B245f36e39509B41471Ea7793c893f5d97eE69E",
    },
    collateral: {
      eth: ADDRESS_ZERO,
      bswap: "0x78a087d713Be963Bf307b18F2Ff8122EF9A63ae9",
    },
  },
  1088: {
    poolAddress: {
      metis: "0x9Ba3db52BC401F4EF8ba23e56268C3AdE0290837",
    },
    rewardsContract: {
      metis: "0x615B1fcf461249b12342726819CB6Da23413CB48",
    },
    collateral: {
      metis: ADDRESS_ZERO,
    },
  },
  56: {
    poolAddress: {
      bnb: "0x4bABA27338E80Ed571353F7e98d1cc4FBBcf46E4",
      golden: "0x91902e2D0CD2bB93b17C0C51a4D180F11a7784be",
    },
    rewardsContract: {
      bnb: "0xc797C9AA0e1B9Bbf7f832b94Fd93a994381Dc79E",
      golden: "0x895d9130Dc56196Ab2c0c8787c8D80D5DE15E64f",
    },
    collateral: {
      bnb: ADDRESS_ZERO,
      golden: "0x7d4984490c4c68f8ead9dddca6d04c514ef77324",
    },
  },
};

export const MOLTEN_PRICES_KEY_ALT: {
  [collateral: string]: string;
} = {
  usdc: `${NETWORK_NAMES_API.defillama[ARBITRUM_CHAIN_ID]}:${CHAINDATA[ARBITRUM_CHAIN_ID].collateral.usdc}`,
};
