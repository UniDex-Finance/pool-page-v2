// import { useEffect, useRef, useState } from "react";
import { useEffect, useRef, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Contract } from "ethers";
import {
  useCall,
  useEtherBalance,
  useEthers,
  useTokenBalance,
} from "@usedapp/core";
import { TableOptions, createColumnHelper } from "@tanstack/react-table";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { Address, ChainId, PoolRow } from "../../../../types";
import {
  ABIS,
  CHAINDATA,
  CURRENCY_LOGOS,
  NETWORK_NAMES_API,
} from "../../../../constants";
import { formatUnits, parseUnitsSafe } from "../../../../helpers";
import { ADDRESS_ZERO } from "../../../../constants/tokens";
import { useAppState } from "../../../../hooks";
import {
  METIS_CHAIN_ID,
  NETWORK_ICON_SRC,
} from "../../../../constants/networks";
// import { PoolDataService } from "../../../../services";

type CurrencyLogos = typeof CURRENCY_LOGOS;

type PropsPoolCell = {
  chainIdRow: ChainId;
  collateralRow: string;
};

const usePoolTVL = ({ chainIdRow, collateralRow }: PropsPoolCell) => {
  const collateralRowLower = collateralRow.toLowerCase();
  const chainDataRow = CHAINDATA[chainIdRow];
  const addressCollateralRow = chainDataRow?.currencies?.[collateralRowLower];
  const addressPoolRow = chainDataRow?.oldpool?.[collateralRowLower];
  const pricesKeyRow = `${NETWORK_NAMES_API.defillama[chainIdRow]}:${addressCollateralRow}`;

  const [tvlRowUSD, setTvlRowUSD] = useState("0");
  const { state } = useAppState();
  const prices = state?.prices;

  const tvlRow =
    addressCollateralRow === ADDRESS_ZERO
      ? useEtherBalance(addressPoolRow, { chainId: chainIdRow })
      : useTokenBalance(addressCollateralRow, addressPoolRow, {
          chainId: chainIdRow,
        });

  useEffect(() => {
    if (tvlRow && prices && Object.keys(prices).length) {
      if (!prices[pricesKeyRow]) {
        return;
      }

      const tvlRowFormatted = formatUnits(
        tvlRow || 0,
        collateralRowLower === "usdc" && chainIdRow !== METIS_CHAIN_ID ? 6 : 18
      );
      const tvlRowFormattedNumber = Number(tvlRowFormatted);
      const priceCurrencyRow = prices[pricesKeyRow];
      const tvlRowFormattedNumberUSD =
        tvlRowFormattedNumber * priceCurrencyRow.price;
      setTvlRowUSD(tvlRowFormattedNumberUSD.toFixed(2));
    }
  }, [prices, tvlRow]);

  return Number(tvlRowUSD).toLocaleString();
};

const usePoolDeposited = ({
  chainIdRow,
  collateralRow,
  library,
  account,
}: PropsPoolCell & { library: any; account: Address | undefined }) => {
  const collateralRowLower = collateralRow.toLowerCase();
  const chainDataRow = CHAINDATA[chainIdRow];
  const addressPoolRow = chainDataRow?.oldpool?.[collateralRowLower];
  const callResult = useCall(
    addressPoolRow &&
      library &&
      account && {
        contract: new Contract(addressPoolRow, ABIS["pool"], library),
        method: "getCurrencyBalance",
        args: [account],
      }
  );

  const amountDeposit = callResult?.value;
  const amountDepositFormatted = formatUnits(
    amountDeposit?.toString() || "0",
    collateralRowLower === "usdc" && chainIdRow !== METIS_CHAIN_ID ? 6 : 18
  );
  const amountDepositFormattedRounded = Number(amountDepositFormatted).toFixed(
    2
  );
  return Number(amountDepositFormattedRounded).toLocaleString();
};

const usePoolClaimable = ({
  chainIdRow,
  collateralRow,
  library,
}: PropsPoolCell & { library: any }) => {
  const collateralRowLower = collateralRow.toLowerCase();
  const chainDataRow = CHAINDATA[chainIdRow];
  const addressRewardsRow = chainDataRow?.oldpoolrewards?.[collateralRowLower];
  const callResult = useCall(
    addressRewardsRow &&
      library && {
        contract: new Contract(addressRewardsRow, ABIS["rewards"], library),
        method: "getClaimableReward",
      }
  );

  const amountClaim = callResult?.value;
  const amountClaimFormatted = formatUnits(
    amountClaim?.toString() || "0",
    collateralRowLower === "usdc" && chainIdRow !== METIS_CHAIN_ID ? 6 : 18
  );
  const amountClaimFormattedRounded = Number(amountClaimFormatted).toFixed(2);
  return Number(amountClaimFormattedRounded).toLocaleString();
};

/*
type PoolStats = {
  cumulativeFees: string;
  cumulativePnl: string;
};


const PoolAPR = ({
  chainIdRow,
  collateralRow,
  // tvlRow,
  createdAtTimestampRow,
  library,
}: PropsPoolCell & {
  library: any;
  createdAtTimestampRow: number;
  // tvlRow: number;
}) => {
  const [poolShareRow, setPoolShareRow] = useState<string>();
  const [poolStatsRow, setPoolStatsRow] = useState<PoolStats>();
  const [poolAPRRow, setPoolAPRRow] = useState<string>("10");

  const chainDataRow = CHAINDATA[chainIdRow];
  const collateralRowLower = collateralRow.toLowerCase();
  const addressRouterRow = chainDataRow?.router;
  const callResult = useCall(
    addressRouterRow &&
      library && {
        contract: new Contract(addressRouterRow, ABIS["router"], library),
        method: "getPoolShare",
        args: [chainDataRow?.currencies?.[collateralRowLower]],
      }
  );

  const addressCollateralRow = chainDataRow?.currencies?.[collateralRowLower];
  const addressPoolRow = chainDataRow?.oldpool?.[collateralRowLower];
  const tvlRow =
    addressCollateralRow === ADDRESS_ZERO
      ? useEtherBalance(addressPoolRow, { chainId: chainIdRow })
      : useTokenBalance(addressCollateralRow, addressPoolRow, {
          chainId: chainIdRow,
        });
  const tvlRowFormatted = formatUnits(
    tvlRow || 0,
    collateralRowLower === "usdc" && chainIdRow !== METIS_CHAIN_ID ? 6 : 18
  );
  const tvlRowFormattedNumber = Number(tvlRowFormatted);

  const fetchPoolStats = async () => {
    const poolStatsNew = await PoolDataService.get([
      "stats",
      chainIdRow,
      CHAINDATA[chainIdRow]?.currencies?.[collateralRowLower],
    ]);
    setPoolStatsRow((poolStatsNew as PoolStats[] | undefined)?.[0]);
  };

  useEffect(() => {
    if (chainIdRow && collateralRow) {
      fetchPoolStats();
    }
  }, [chainIdRow, collateralRow]);

  useEffect(() => {
    setPoolShareRow(callResult?.value?.toString());
  }, [callResult]);

  useEffect(() => {
    if (poolShareRow && poolStatsRow && tvlRowFormattedNumber) {
      const {
        cumulativeFees: cumulativeFeesRow,
        cumulativePnl: cumulativePnlRow,
      } = poolStatsRow;

      if (cumulativeFeesRow && cumulativePnlRow) {
        const decimalsCollateralRow = collateralRowLower === "usdc" 
          && chainIdRow !== METIS_CHAIN_ID ? 6 : 18;
        const cumulativeFeesRowFormatted = formatUnits(
          cumulativeFeesRow,
          decimalsCollateralRow
        );
        const cumulativePnlRowFormatted = formatUnits(
          cumulativePnlRow,
          decimalsCollateralRow
        );
        const poolShareRowFormatted = formatUnits(
          poolShareRow || "0",
          decimalsCollateralRow
        );

        const timeSinceInception = Date.now() - createdAtTimestampRow;
        const timeInAYear = 365 * 24 * 3600 * 1000;
        const timeScaler = timeInAYear / timeSinceInception;
        const poolAPRRowNumberNew =
          (timeScaler *
            100 *
            ((Number(cumulativeFeesRowFormatted) *
              Number(poolShareRowFormatted)) /
              100 -
              1 * Number(cumulativePnlRowFormatted)) +
            0.05582) /
          tvlRowFormattedNumber;

        const ignoreAPR =
          tvlRowFormattedNumber < 1e-5 || poolAPRRowNumberNew < 10;
        setPoolAPRRow(ignoreAPR ? "10" : poolAPRRowNumberNew.toFixed(2));
      }
    }
  }, [poolShareRow, poolStatsRow, tvlRowFormattedNumber]);

  return poolAPRRow;
};
*/

type ButtonAction = "deposit" | "withdraw" | "claim";
type ParamsOnClickAction = [
  chainIdRow: ChainId,
  collateral: string,
  buttonAction: ButtonAction
];

export default () => {
  const { library: libraryEthers, chainId, account } = useEthers();
  const library = libraryEthers as any;
  const columnHelper = createColumnHelper<PoolRow>();
  const valueDepositRef = useRef("");
  const valueWitdrawRef = useRef("");

  const handlePoolInteraction = async ([
    chainIdRow,
    collateral,
    buttonAction,
  ]: ParamsOnClickAction) => {
    const collateralLower = collateral.toLowerCase();
    const addressPool = CHAINDATA[chainIdRow].oldpool[collateralLower];
    const contractPool = new Contract(
      addressPool,
      ABIS["pool"],
      library.getSigner()
    );

    try {
      // TODO: start loading toast and get id
      let tx: any;
      if (buttonAction === "deposit") {
        const valueDeposit = valueDepositRef.current;
        const valueDepositBigNumber = parseUnitsSafe(
          valueDeposit.toString(),
          // TODO: use dict or something else here
          collateralLower === "usdc" && chainIdRow !== METIS_CHAIN_ID ? 6 : 18
        );
        tx = await contractPool.deposit(valueDepositBigNumber);
      } else {
        const valueWithdraw = valueWitdrawRef.current;
        const valueWithdrawBigNumber = parseUnitsSafe(
          valueWithdraw.toString(),
          // TODO: use dict or something else here
          collateralLower === "usdc" && chainIdRow !== METIS_CHAIN_ID ? 6 : 18
        );
        tx = await contractPool.withdraw(valueWithdrawBigNumber);
      }

      await tx.wait();
      // TODO show success toast and pass loading toast id
    } catch (e) {
      // TODO show error toast and pass loading toast id
      console.error(e);
    }
  };

  // TODO: do all todos here that are in `handlePoolInteraction`
  const handleRewardsInteraction = async ([
    chainIdRow,
    collateral,
    ,
  ]: ParamsOnClickAction) => {
    const collateralLower = collateral.toLowerCase();
    const addressRewards = CHAINDATA[chainIdRow].rewards[collateralLower];
    const contractRewards = new Contract(
      addressRewards,
      ABIS["rewards"],
      library.getSigner()
    );

    try {
      const tx = await contractRewards.collectReward();
      await tx.wait();
    } catch (e) {
      console.error(e);
    }
  };

  const onClickAction = async (params: ParamsOnClickAction) => {
    const [chainIdRow, , buttonAction] = params;
    if (!chainId) {
      // TODO: show connect wallet toast
      return;
    }
    if (chainIdRow !== chainId) {
      // TODO: show switch chain toast
      return;
    }

    if (buttonAction === "deposit" || buttonAction === "withdraw") {
      handlePoolInteraction(params);
    } else if (buttonAction === "claim") {
      handleRewardsInteraction(params);
    }
  };

  const onClickActionWrapper = async (params: ParamsOnClickAction) => {
    try {
      onClickAction(params);
    } catch (e) {
      console.error(e);
    }
  };

  const columns: TableOptions<PoolRow>["columns"] = [
    columnHelper.accessor("chainId", {
      id: "chainId",
      header: "CHAIN",
      cell: (info) => (
        <img
          src={NETWORK_ICON_SRC[info.getValue()]}
          alt={info.getValue()}
          width={25}
          height={25}
        />
      ),
    }),
    columnHelper.accessor("collateral", {
      id: "collateral",
      header: "COLLATERAL",
      cell: (info) => (
        <div className="flex ml-10">
          <img
            className="mr-3"
            src={
              CURRENCY_LOGOS[
                info.getValue().toLowerCase() as keyof CurrencyLogos
              ]
            }
            alt=""
            width={25}
            height={25}
          />
          <div>{info.getValue()}</div>
        </div>
      ),
    }),
    columnHelper.accessor("tvl", {
      id: "tvl",
      header: "TVL",
      cell: (info) => (
        <div>
          <span>$</span>
          <span>
            {usePoolTVL({
              chainIdRow: info.row.getValue("chainId"),
              collateralRow: info.row.getValue("collateral"),
            })}
          </span>
        </div>
      ),
    }),
    // TODO: update value pf and use `apr` accessor instead
    columnHelper.accessor("apr", {
      id: "apr",
      header: "APR",
      cell: (info) => (
        <div>
          <span>{info.getValue()}</span>
          <span>%</span>
        </div>
      ),
    }),
    columnHelper.accessor("amountDeposit", {
      id: "amountDeposit",
      header: "DEPOSITED",
      cell: (info) => (
        <div className="ml-11">
          <span className="mr-2">
            {usePoolDeposited({
              chainIdRow: info.row.getValue("chainId"),
              collateralRow: info.row.getValue("collateral"),
              library: library,
              account: account,
            })}
          </span>
          <span>{info.row.getValue("collateral")}</span>
        </div>
      ),
    }),
    columnHelper.accessor("amountClaim", {
      id: "amountClaim",
      header: "CLAIMABLE REWARDS",
      cell: (info) => (
        <div className="mr-16">
          <span className="mr-2">
            {usePoolClaimable({
              chainIdRow: info.row.getValue("chainId"),
              collateralRow: info.row.getValue("collateral"),
              library: library,
            })}
          </span>
          <span>{info.row.getValue("collateral")}</span>
        </div>
      ),
    }),
    columnHelper.display({
      id: "actionDeposit",
      header: "DEPOSIT",
      cell: (info) => (
        <Popover placement="bottom">
          <PopoverHandler>
            <Button className="text-[15px] font-normal bg-main-front py-1 px-5">
              DEPOSIT
            </Button>
          </PopoverHandler>
          <PopoverContent>
            <div className="flex flex-col justify-center bg-main-back p-4 rounded-lg">
              <NumericFormat
                className="text-white !bg-main-front mb-4"
                crossOrigin={undefined}
                thousandSeparator
                customInput={Input}
                displayType="input"
                placeholder="0.0"
                onValueChange={(values) => {
                  valueDepositRef.current = values.floatValue?.toString() || "";
                }}
              />
              <Button
                className="font-normal bg-main-front py-1"
                onClick={() =>
                  onClickActionWrapper([
                    info.row.getValue("chainId"),
                    info.row.getValue("collateral"),
                    "deposit",
                  ])
                }
              >
                CONFIRM DEPOSIT
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      ),
    }),
    columnHelper.display({
      id: "actionWithdraw",
      header: "WITHDRAW",
      cell: (info) => (
        <Popover placement="bottom">
          <PopoverHandler>
            <Button className="text-[15px] font-normal bg-main-front py-1 px-5">
              WITHDRAW
            </Button>
          </PopoverHandler>
          <PopoverContent>
            <div className="flex flex-col justify-center bg-main-back p-4 rounded-lg">
              <NumericFormat
                className="text-white !bg-main-front mb-4"
                crossOrigin={undefined}
                thousandSeparator
                customInput={Input}
                displayType="input"
                placeholder="0.0"
                onValueChange={(values) => {
                  valueWitdrawRef.current = values.floatValue?.toString() || "";
                }}
              />
              <Button
                className="font-normal bg-main-front py-1"
                onClick={() =>
                  onClickActionWrapper([
                    info.row.getValue("chainId"),
                    info.row.getValue("collateral"),
                    "withdraw",
                  ])
                }
              >
                CONFIRM WITHDRAW
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      ),
    }),
    columnHelper.display({
      id: "actionClaim",
      header: "CLAIM REWARDS",
      cell: (info) => (
        <Button
          className="text-[15px] font-normal bg-main-front w-max py-1 px-5"
          onClick={() =>
            onClickActionWrapper([
              info.row.getValue("chainId"),
              info.row.getValue("collateral"),
              "claim",
            ])
          }
        >
          CLAIM REWARDS
        </Button>
      ),
    }),
  ];

  return columns;
};
