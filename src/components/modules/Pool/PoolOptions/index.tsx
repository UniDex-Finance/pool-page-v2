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
  NETWORK_NAMES_API,
} from "../../../../constants";
import { PoolDataService } from "../../../../services";
import { useAppState } from "../../../../hooks";
import { createPoolRows } from "../../../../helpers";
import arrowSelectorWhiteIcon from "../../../../assets/arrow-selector-white.svg";

const CHAIN_FILTER_LIST: ChainId[] = [0];
Object.entries(CHAINDATA).forEach(([chainKey, chainData]) => {
  if (!chainData.isTestnet) {
    CHAIN_FILTER_LIST.push(Number(chainKey));
  }
});

type Props = {
  poolRows: PoolRow[];
  setPoolRows: React.Dispatch<React.SetStateAction<PoolRow[]>>;
  className?: string;
};

export default ({ poolRows, setPoolRows, className }: Props) => {
  const [chainIdFilter, setChainIdFilter] = useState<ChainId>(0);
  const [tvlTotal, setTvlTotal] = useState(0);
  const [despositTotal, setDepositTotal] = useState(0);
  const [claimTotal, setClaimTotal] = useState(0);

  const { state } = useAppState();
  const prices = state?.prices;

  const filterPoolRows = (chainIdNew: ChainId) => {
    const poolRowsNew = createPoolRows(chainIdNew);
    setPoolRows(poolRowsNew);
  };

  const updateTvlTotal = async () => {
    try {
      const tvlTotalNew = await PoolDataService.get(["tvlTotal"]);
      setTvlTotal(tvlTotalNew as number);
    } catch (e) {
      console.error(e);
    }
  };

  const updateDepositTotal = () => {
    if (!prices) {
      return;
    }

    let depositTotalNew = 0;
    poolRows.forEach((p) => {
      const collateralRowLower = p.collateral.toLowerCase();
      const pricesKeyRow = `${NETWORK_NAMES_API.defillama[p.chainId]}:${
        CHAINDATA[p.chainId]?.currencies?.[collateralRowLower]
      }`;

      const priceMultiplier = prices[pricesKeyRow]?.price || 0;
      depositTotalNew += p.amountDeposit * priceMultiplier;
    });

    setDepositTotal(depositTotalNew);
  };

  const updateClaimTotal = () => {
    if (!prices) {
      return;
    }

    let claimTotalNew = 0;
    poolRows.forEach((p) => {
      const collateralRowLower = p.collateral.toLowerCase();
      const pricesKeyRow = `${NETWORK_NAMES_API.defillama[p.chainId]}:${
        CHAINDATA[p.chainId]?.currencies?.[collateralRowLower]
      }`;

      const priceMultiplier = prices[pricesKeyRow]?.price || 0;
      claimTotalNew += p.amountClaim * priceMultiplier;
    });

    setClaimTotal(claimTotalNew);
  };

  useEffect(() => {
    if (poolRows) {
      filterPoolRows(chainIdFilter);
    }
  }, [chainIdFilter]);

  useEffect(() => {
    updateTvlTotal();
  }, []);

  useEffect(() => {
    updateDepositTotal();
  }, [poolRows, chainIdFilter]);

  useEffect(() => {
    updateClaimTotal();
  }, [updateClaimTotal]);

  return (
    <div className={`flex justify-between ${className}`}>
      <div className="flex">
        <Menu>
          <MenuHandler>
            <Button className="flex items-center text-md font-semibold bg-main-card mr-5 py-3 px-6 rounded-lg">
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
        <Button className="flex items-center text-md font-semibold bg-main-card mr-5 py-3 px-6 rounded-lg">
          <div className="mr-6">APR Date Range RANGE </div>
          <div className="mr-4">---</div>
          <img src={arrowSelectorWhiteIcon} />
        </Button>
      </div>
      <div className="flex justify-between font-semibold bg-main-card w-1/2 py-3 px-6 rounded-lg">
        <span className="mr-4">TVL: ${tvlTotal.toFixed(2)}</span>
        <span className="mr-4">
          Total Deposited: ${despositTotal.toFixed(2)}
        </span>
        <span>Unclaimed Rewards: ${claimTotal.toFixed(2)}</span>
      </div>
    </div>
  );
};
