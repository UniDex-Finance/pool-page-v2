import { useState, useEffect } from "react";
import { Navbar } from "@material-tailwind/react";
// import { BSC_CHAIN_ID } from "../../../constants/networks";
// import { ChainId } from "../../../types";
import { Dropdown /* , Option */ } from "../Dropdown";
import WalletConnect from "../WalletConnect";
import logoLarge from "../../../assets/logo-large.png";
import ChainMenu from "./ChainMenu";

const options = [
  {
    name: "Protocol Links",
    value: "1",
    url: "https://linktr.ee/unidexexchange",
  },
  { name: "Swaps Aggregator", value: "2", url: "https://app.unidex.exchange/" },
  {
    name: "Leverage Stats",
    value: "3",
    url: "https://stats.unidex.exchange/",
  },
  {
    name: "Live Pnl",
    value: "4",
    url: "https://comp.unidex.exchange/#/fantom",
  },
  {
    name: "Staking MOLTEN",
    value: "5",
    url: "https://staking.unidex.exchange",
  },
  {
    name: "Bridge MOLTEN",
    value: "6",
    url: "https://bridge.unidex.exchange",
  },
  {
    name: "Migrate UniDEX",
    value: "7",
    url: "https://migrate.unidex.exchange",
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
  const [, setOpenNav] = useState(false);

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
      className="sticky top-0 z-40 px-2 py-4 mx-auto bg-transparent bg-opacity-0 border-0 border-none rounded-none shadow-none lg:py-2 lg:px-2 backdrop-saturate-500"
      fullWidth
    >
      <div className="flex flex-row items-center justify-between px-4 mx-auto text-white bg-main-back gap-x-4">
        <div className="flex justify-center gap-x-4">
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

          <div
            className="items-center hidden ml-4 lg:flex"
            style={{ alignItems: "center" }}
          >
            <div className="mt-1 mr-6 dropdown">
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

        <div className="flex space-x-6 lg:space-x-4 lg:space-x-6 lg:flex-row lg:items-center">
          <ChainMenu />
          <span className="h-[25px] border-[1px]" />
          <WalletConnect />
        </div>
      </div>
    </Navbar>
  );
}

// chainId || DEFAULT_NETWORK;
