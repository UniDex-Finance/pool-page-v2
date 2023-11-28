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
import { PoolDataRangeKey } from "../../../../types/core";
import arrowSelectorWhiteIcon from "../../../../assets/arrow-selector-white.svg";

const POOL_RANGE_TO_TEXT: { [key in PoolDataRangeKey]: string } = {
  "1DayData": "1 Day",
  "7DayData": "7 Days",
  "30DayData": "30 Days",
  "365DayData": "365 Days",
};

const CHAIN_FILTER_LIST: ChainId[] = [0];
Object.entries(CHAINDATA).forEach(([chainKey, chainData]) => {
  if (!chainData.isTestnet) {
    CHAIN_FILTER_LIST.push(Number(chainKey));
  }
});

type Props = {
  poolRows: PoolRow[];
  setPoolRows: React.Dispatch<React.SetStateAction<PoolRow[]>>;
  updatePoolRowsAPR: (aprRange: PoolDataRangeKey) => void;
  className?: string;
};

export default ({
  poolRows,
  setPoolRows,
  updatePoolRowsAPR,
  className,
}: Props) => {
  const [chainIdFilter, setChainIdFilter] = useState<ChainId>(0);
  const [tvlTotal, setTvlTotal] = useState(0);
  const [despositTotal, setDepositTotal] = useState(0);
  const [claimTotal, setClaimTotal] = useState(0);
  const [aprRangeText, setAprRangeText] = useState<string>("7 Days");

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
        CHAINDATA[p.chainId]?.collateral?.[collateralRowLower]
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
        CHAINDATA[p.chainId]?.collateral?.[collateralRowLower]
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
    updateDepositTotal();
  }, [poolRows, chainIdFilter]);

  useEffect(() => {
    updateClaimTotal();
  }, [updateClaimTotal]);

  useEffect(() => {
    updateTvlTotal();
  }, []);

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
          </MenuList>
        </Menu>
        <Menu>
          <MenuHandler>
            <Button className="flex items-center text-md font-semibold bg-main-card mr-5 py-3 px-6 rounded-lg">
              <div className="mr-6">APR Date Range </div>
              <div className="mr-4">{aprRangeText}</div>
              <img src={arrowSelectorWhiteIcon} />
            </Button>
          </MenuHandler>
          <MenuList className="text-main-text font-semibold bg-main-front w-[200px]">
            {Object.entries(POOL_RANGE_TO_TEXT).map(([entryKey, entryText]) => (
              <MenuItem
                key={entryKey}
                className="flex justify-center text-lg p-2"
                onClick={() => {
                  updatePoolRowsAPR(entryKey as PoolDataRangeKey);
                  setAprRangeText(entryText);
                }}
              >
                {entryText}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
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
