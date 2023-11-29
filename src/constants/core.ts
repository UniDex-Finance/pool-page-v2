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
  42161: {
    poolAddress: {
      eth: "0xdAF7D157F5c6E0F1d7917Ca02a7C185cEF81e6d0",
      usdc: "0x09E122453A079bc2Be621769ae7799e53dA0054E",
      dai: "0xb764729C6bEbd6E60E151F2c46aFce7D6Ff513fD",
      usdt: "0x9f6B9e253De52C5fD6c65283ff472b15520a7070",
      wbtc: "0xe736742Eb62F271c48F4a26168FD8F356AeE68db",
      arb: "0xF1Cb521C753e41906073eBEd30FE34BCB00845f8",
      mim: "0x266B30394da3D99a846dD30A2F7C50bb523c5dE1",
      gdai: "0x7638Db20715c5AC09f52bE1E3a4DBb220680BdFd",
      ram: "0x914172b52262E867D8f2959D884e0ea73795B2c6",
      mai: "0xEfD0B28810dC3cdD88763f40DCc44462bb85Cf32",
      gmx: "0xDaa78E776D3788F9FBABDAc02aa6De45f7BC50C6",
      wsteth: "0x53C6c525a635eF56Bce43d4523D90aACE551D81b",
      captoken: "0x99DDb3E66A592579B9D46a47824042F62D690a9e",
      unsheth: "0x5372Af9b4E9d4b9C016574Dad0f2406Dfe023D5F",
      gns: "0x13ff1aB07540b1681173003E361D046530506c11",
    },
    rewardsContract: {
      eth: "0xf2669628818384fa40c3E68e4e5995f4D882F811",
      usdc: "0xa40dCF6C15419d418337E177dAE6a54f1FA65569",
      dai: "0x0a7865B126aFcbA2b02Bc20bd99400Cb86367C39",
      usdt: "0x2F7a4F73C51cb8Ed2a0CEcf8F2deB66dc60db3c8",
      wbtc: "0xb1F2a1C2CC7755AD0DEeF9b1dC9f444995B1ACCE",
      arb: "0x5ab75775F40f70B6a7bb6f3248bffA7f2a8Cd886",
      mim: "0xB937ED209d1f873AaC100FC49102F13825D31651",
      gdai: "0xAfA5E952aC5f2Ec97189575bc8952d74dB73b1Cf",
      ram: "0x899139544E20b3a843aBcbc6217Fc037eeD57062",
      mai: "0x729eDFE0126458Dc917897525ecB19E7F4b48d9b",
      gmx: "0x94916f4429E7315F66a5C6B38Eda704c0ae1Cc9A",
      wsteth: "0x5A45876025e515D03A356b40d7945055b8611bAA",
      captoken: "0x3727EBe1b7744463b43Aa9A365D6B931c2368Fa0",
      unsheth: "0xDFf241260f3cFa5b2c88FC47030097BA6fdCCB85",
      gns: "0x47958D1f65c6514bC1460b2Ae8073564B38549Ad",
    },
    collateral: {
      eth: ADDRESS_ZERO,
      usdc: "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
      dai: "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1",
      usdt: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
      wbtc: "0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f",
      arb: "0x912ce59144191c1204e64559fe8253a0e49e6548",
      mim: "0xfea7a6a0b346362bf88a9e4a88416b77a57d6c2a",
      gdai: "0xd85e038593d7a098614721eae955ec2022b9b91b",
      ram: "0xaaa6c1e32c55a7bfa8066a6fae9b42650f262418",
      mai: "0x3f56e0c36d275367b8c502090edf38289b3dea0d",
      gmx: "0xfc5a1a6eb076a2c7ad06ed22c90d7e710e35ad0a",
      wsteth: "0x5979d7b546e38e414f7e9822514be443a4800529",
      captoken: "0x031d35296154279dc1984dcd93e392b1f946737b",
      unsheth: "0x0ae38f7e10a43b5b2fb064b42a2f4514cba909ef",
      gns: "0x18c11fd286c5ec11c3b683caa813b77f5163a122",
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
      stevmos: "0x42EbA10b9bf487baD672c9479810DbFE305721D3",
    },
    collateral: {
      stevmos: "0x2C68D1d6aB986Ff4640b51e1F14C716a076E44C4",
    },
  },
  137: {
    poolAddress: {
      retro: "0xf10C6fE83330945810a6B732590879Bdc5919F7B",
      cash: "0xB1aA59750F1a46dBd6D49b9976f74123567514BE",
    },
    rewardsContract: {
      retro: "0x8182b69C7048263E82781eC6885e4a696792AcE6",
      cash: "0xDd048400960267A8ef47546782633217bD7b68da",
    },
    collateral: {
      retro: "0xBFA35599c7AEbb0dAcE9b5aa3ca5f2a79624D8Eb",
      cash: "0x5d066d022ede10efa2717ed3d79f22f949f8c175",
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
    },
    rewardsContract: {
      dai: "0x267c39Bbc612FD0dcEeaB8Ec6Ea65c67e2Bf8FAB",
    },
    collateral: {
      dai: "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1",
    },
  },
  8453: {
    poolAddress: {
      eth: "0x9Ba3db52BC401F4EF8ba23e56268C3AdE0290837",
      crvusd: "0xEfD0B28810dC3cdD88763f40DCc44462bb85Cf32",
      bswap: "0xe10f7BCFf83A0263c03Ba27795d11f4B1631Ef4e",
    },
    rewardsContract: {
      eth: "0x9673B0E0F07e4a6da712F6847aE93C3F157DD509",
      crvusd: "0xDaa78E776D3788F9FBABDAc02aa6De45f7BC50C6",
      bswap: "0x3B245f36e39509B41471Ea7793c893f5d97eE69E",
    },
    collateral: {
      eth: ADDRESS_ZERO,
      crvusd: "0x417ac0e078398c154edfadd9ef675d30be60af93",
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
};
