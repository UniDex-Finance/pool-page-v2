import { useEffect, useState } from "react";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { ChainId, PoolRow } from "../../../../types";
import {
  CHAINDATA,
  NETWORK_DISPLAY_NAME,
  NETWORK_ICON_SRC,
} from "../../../../constants";
import { PoolDataService } from "../../../../services";
import { useAppState } from "../../../../hooks";
import { createPoolRows } from "../../../../helpers";
import arrowSelectorWhiteIcon from "../../../../assets/arrow-selector-white.svg";
import actions from "../../../../store/actions";

const CHAIN_FILTER_LIST: ChainId[] = [0];
Object.entries(CHAINDATA).forEach(([chainKey, chainData]) => {
  if (!chainData.isTestnet) {
    CHAIN_FILTER_LIST.push(Number(chainKey));
  }
});

type Props = {
  className?: string;
};

export default ({ className }: Props) => {
  const [chainIdFilter, setChainIdFilter] = useState(0);
  const [tvlTotal, setTvlTotal] = useState("0");

  const { state, dispatch } = useAppState();
  const poolRows: PoolRow[] = state?.poolRows;

  const filterPoolRows = (chainIdNew: ChainId) => {
    const poolRowsNew = createPoolRows(chainIdNew);
    dispatch({
      type: actions.SET_POOL_ROWS,
      payload: poolRowsNew,
    });
  };

  const updateTvl = async () => {
    try {
      const tvlTotalNew = await PoolDataService.get(["tvlTotal"]);
      setTvlTotal((tvlTotalNew as number).toFixed(2));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (poolRows) {
      filterPoolRows(chainIdFilter);
    }
  }, [chainIdFilter]);

  useEffect(() => {
    updateTvl();
  }, []);

  return (
    <div className={`flex justify-between ${className}`}>
      <Menu>
        <MenuHandler>
          <Button className="flex items-center text-md font-semibold bg-main-card py-3 px-6 rounded-lg">
            <div className="mr-6">Chain Filter</div>
            <div className="mr-4">
              {chainIdFilter === 0 ? (
                <div>All Chains</div>
              ) : (
                <div className="flex">
                  <img
                    className="mr-6"
                    src={NETWORK_ICON_SRC[chainIdFilter]}
                    alt=""
                    width={25}
                    height={25}
                  />
                  <div>{NETWORK_DISPLAY_NAME[chainIdFilter]}</div>
                </div>
              )}
            </div>
            <img src={arrowSelectorWhiteIcon} />
          </Button>
        </MenuHandler>
        <MenuList className="text-main-text font-semibold bg-main-front w-[200px]">
          <div className="flex flex-col items-center">
            {CHAIN_FILTER_LIST.map((chainIdFilterItem) => (
              <MenuItem
                key={chainIdFilterItem}
                className="flex justify-center text-lg p-2"
                onClick={() => {
                  setChainIdFilter(chainIdFilterItem);
                }}
              >
                {chainIdFilterItem === 0 ? (
                  <div>All Chains</div>
                ) : (
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
                )}
              </MenuItem>
            ))}
          </div>
        </MenuList>
      </Menu>
      <Button className="flex items-center text-md font-semibold bg-main-card py-3 px-6 rounded-lg">
        <div className="mr-6">APR Date Range RANGE </div>
        <div className="mr-4">---</div>
        <img src={arrowSelectorWhiteIcon} />
      </Button>
      <div className="bg-main-card py-3 px-6 rounded-lg">
        <span className="mr-4">TVL: ${tvlTotal}</span>
        <span className="mr-4">Total Deposited: $---------</span>
        <span>Unclaimed Rewards: $---------</span>
      </div>
    </div>
  );
};
