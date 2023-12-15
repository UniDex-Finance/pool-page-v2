import { useEthers } from "@usedapp/core";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import {
  NETWORK_ICON_SRC,
  NETWORK_DISPLAY_NAME,
  CHAINDATA,
} from "../../../constants";
import { ChainId } from "../../../types";
import { MAINNET_CHAIN_ID } from "../../../constants/networks";

const CHAIN_FILTER_LIST: ChainId[] = [];
Object.entries(CHAINDATA).forEach(([chainKey, chainData]) => {
  if (!chainData.isTestnet) {
    CHAIN_FILTER_LIST.push(Number(chainKey));
  }
});

export default () => {
  const { chainId, active, switchNetwork } = useEthers();
  const chainIdButton = chainId || MAINNET_CHAIN_ID;

  return (
    <Menu>
      <MenuHandler>
        <Button disabled={!active}>
          <div className="flex text-lg font-normal">
            {active && !chainId ? (
              <div className="text-tertiary-text">Unsupported Network</div>
            ) : (
              <>
                <img
                  className="mr-3"
                  src={NETWORK_ICON_SRC[chainIdButton]}
                  alt={NETWORK_DISPLAY_NAME[chainIdButton]}
                  width={25}
                  height={25}
                />
                <div>{NETWORK_DISPLAY_NAME[chainIdButton]}</div>
              </>
            )}
          </div>
        </Button>
      </MenuHandler>
      <MenuList className="text-main-text font-semibold bg-main-front w-[180px]">
        {CHAIN_FILTER_LIST.map((chainIdFilterItem) => (
          <MenuItem
            key={chainIdFilterItem}
            className="flex justify-center text-lg p-2"
            onClick={() => {
              switchNetwork(chainIdFilterItem);
            }}
          >
            <div className="flex w-[150px]">
              <img
                className="mr-6"
                src={NETWORK_ICON_SRC[chainIdFilterItem]}
                alt=""
                width={30}
                height={30}
              />
              <div className="text-left w-[100px]">
                {NETWORK_DISPLAY_NAME[chainIdFilterItem]}
              </div>
            </div>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
