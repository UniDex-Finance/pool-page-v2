// import { useEffect, useRef, useState } from "react";
import { useRef } from "react";
import { NumericFormat } from "react-number-format";
import { Contract } from "ethers";
import { useEthers } from "@usedapp/core";
import { TableOptions, createColumnHelper } from "@tanstack/react-table";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { ChainId, PoolRow } from "../../../../types";
import { ABIS, CHAINDATA, CURRENCY_LOGOS } from "../../../../constants";
import {
  METIS_CHAIN_ID,
  NETWORK_ICON_SRC,
} from "../../../../constants/networks";
import { parseUnitsSafe } from "../../../../helpers";
// import { PoolDataService } from "../../../../services";

type CurrencyLogos = typeof CURRENCY_LOGOS;

type ButtonAction = "deposit" | "withdraw" | "claim";
type ParamsOnClickAction = [
  chainIdRow: ChainId,
  collateral: string,
  buttonAction: ButtonAction
];

export default () => {
  const { library: libraryEthers, chainId } = useEthers();
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
      cell: (info) => {
        return (
          <div>
            <span>$</span>
            <span>{info.getValue().toFixed(2)}</span>
          </div>
        );
      },
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
      cell: (info) => {
        const infoValue = info.getValue();
        return (
          <div className="ml-11">
            <span className="mr-2">
              {infoValue === 0 || infoValue >= 1
                ? infoValue.toFixed(2)
                : infoValue.toFixed(5)}
            </span>
            <span>{info.row.getValue("collateral")}</span>
          </div>
        );
      },
    }),
    columnHelper.accessor("amountClaim", {
      id: "amountClaim",
      header: "CLAIMABLE REWARDS",
      cell: (info) => {
        const infoValue = info.getValue();
        return (
          <div className="ml-11">
            <span className="mr-2">
              {infoValue === 0 || infoValue >= 1
                ? infoValue.toFixed(2)
                : infoValue.toFixed(5)}
            </span>
            <span>{info.row.getValue("collateral")}</span>
          </div>
        );
      },
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
