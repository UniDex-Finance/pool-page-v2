import { useState, useEffect } from "react";
import { Navbar, IconButton } from "@material-tailwind/react";
// import { BSC_CHAIN_ID } from "../../../constants/networks";
// import { ChainId } from "../../../types";
import { Dropdown /* , Option */ } from "../Dropdown";
import WalletConnect from "../WalletConnect";
import logoLarge from "../../../assets/logo-large.png";

const options = [
  {
    name: "Protocol Links",
    value: "1",
    url: "https://linktr.ee/unidexexchange",
  },
  { name: "Swaps Aggregator", value: "2", url: "https://app.unidex.exchange/" },
  {
    name: "Liquidity Pools",
    value: "3",
    url: "https://v1.unidex.exchange/#/pool",
  },
  {
    name: "Leverage Stats",
    value: "4",
    url: "https://v1.unidex.exchange/#/stats",
  },
  {
    name: "Live Pnl",
    value: "5",
    url: "https://comp.unidex.exchange/#/fantom",
  },
];

const optionsInfo = [
  { name: "Info Hub", value: "3", url: "https://linktr.ee/unidexexchange" },
  {
    name: "Documentation",
    value: "4",
    url: "https://unidexexchange.gitbook.io/unidex/",
  },
  {
    name: "Token Terminal",
    value: "4",
    url: "https://tokenterminal.com/terminal/projects/unidex",
  },
  {
    name: "Dune Dashboard",
    value: "4",
    url: "https://dune.com/shogun/unidex-exchange-analytics",
  },
  { name: "Discord", value: "4", url: "https:/discord.gg/unidex" },
  { name: "Telegram", value: "4", url: "https://t.me/unidexfinance" },
  { name: "Twitter", value: "4", url: "https://twitter.com/unidexfinance" },
  { name: "Mirror", value: "4", url: "https://mirror.xyz/unidexexchange.eth" },
];

/*
// eslint-disable-next-line prefer-const
let supportedChainsByChainId: { [chainId: ChainId]: Option } = {
  10: {
    name: "Optimism",
    value: "10",
    img: "/src/assets/icons_chain/optimism.svg",
  },
  42161: {
    name: "Arbitrum",
    value: "42161",
    img: "/src/assets/icons_chain/arbitrum.svg",
  },
  250: {
    name: "Fantom",
    value: "250",
    img: "/src/assets/icons_chain/fantom.svg",
  },
  324: {
    name: "zkSync",
    value: "324",
    img: "/src/assets/icons_chain/zksync.svg",
  },
  8453: {
    name: "BASE",
    value: "8453",
    img: "/src/assets/icons/icons_chain/base.svg",
  },
  534352: {
    name: "Scroll",
    value: "534352",
    img: "/src/assets/icons_chain/scroll.svg",
  },
  1088: { name: "Metis", value: "1088", img: "/src/assets/icons/metis.png" },
  43114: {
    name: "Avalanche",
    value: "43114",
    img: "/src/assets/icons_chain/avalanche.svg",
  },
  [BSC_CHAIN_ID]: {
    name: "Binance",
    value: BSC_CHAIN_ID.toString(),
    img: "/src/assets/icons_chain/bsc.svg",
  },
  0: { name: "Wallet Disconnected", value: "-1", img: "" },
};
*/

export default function Header() {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const onInfoHub = (data: any) => {
    window.open(data.url, "_blank");
  };

  return (
    <Navbar
      className="mx-auto py-4 lg:py-2 px-2 lg:px-2 sticky top-0 border-0 rounded-none border-none z-40 shadow-none bg-opacity-0 backdrop-saturate-500 bg-transparent"
      fullWidth
    >
      <div className="bg-main-back mx-auto flex items-center justify-between text-white px-4 gap-x-4 flex-row">
        <div className="flex gap-x-4 justify-center">
          <div
            onClick={() => {
              setOpenNav(false);
            }}
            aria-hidden="true"
            className="flex cursor-pointer"
          >
            <img
              src={logoLarge}
              width={145}
              height={40}
              alt="Logo"
              className="cursor-pointer min-w-[145px] hidden md:block py-2"
            />
            <img
              src={logoLarge}
              width={84}
              height={22}
              alt="Logo"
              className="cursor-pointer min-w-[64px] md:hidden"
            />
          </div>

          <div className="hidden lg:flex items-center ml-4" style={{ alignItems: "center" }}>
            <div className="dropdown mr-6 mt-1">
              <Dropdown
                selectedOverride={options[0]}
                options={options}
                size="medium"
                titleStyle="title"
                onChange={onInfoHub}
              />
            </div>
            <Dropdown
              selectedOverride={optionsInfo[0]}
              options={optionsInfo}
              size="small"
              titleStyle="title"
              onChange={onInfoHub}
            />
          </div>
        </div>

        <div className="hidden lg:flex space-x-6 lg:space-x-4 lg:space-x-6 lg:flex-row lg:items-center mr-6">
          <span className="vertical-line-1" />
          <WalletConnect />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
    </Navbar>
  );
}

// chainId || DEFAULT_NETWORK;
