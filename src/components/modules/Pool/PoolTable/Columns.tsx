// import { useEffect, useRef, useState } from "react";
import { useRef } from "react";
import { toast } from "react-toastify";
import { Contract } from "ethers";
import { useEthers } from "@usedapp/core";
import { TableOptions, createColumnHelper } from "@tanstack/react-table";
import { Button } from "@material-tailwind/react";
import { ChainId, PoolRow } from "../../../../types";
import { ABIS, CHAINDATA } from "../../../../constants";
import {
  NETWORK_ICON_SRC,
  NETWORK_NAMES_API,
} from "../../../../constants/networks";
import { parseUnitsSafe } from "../../../../helpers";
import { DepositPopover, WithdrawPopover } from "./popover";
import { useAppState } from "../../../../hooks";
import { Store } from "../../../../types/core";
// import { PoolDataService } from "../../../../services";

export type ButtonAction = "deposit" | "withdraw" | "claim";
export type ParamsOnClickAction = [
  chainIdRow: ChainId,
  collateral: string,
  buttonAction: ButtonAction,
  indexRow?: number,
  opts?: {
    tokenApproved?: boolean;
  }
];

type Props = {
  setPoolRows: React.Dispatch<React.SetStateAction<PoolRow[]>>;
  doNotUpdatePoolRowsRef: React.MutableRefObject<boolean>;
};

export default ({ setPoolRows, doNotUpdatePoolRowsRef }: Props) => {
  const { library: libraryEthers, chainId, account } = useEthers();
  const { state } = useAppState();
  const library = libraryEthers as any;
  const poolData: Store["poolData"] | undefined = state?.poolData;
  const columnHelper = createColumnHelper<PoolRow>();

  const valueDepositRef = useRef("");
  const valueWitdrawRef = useRef("");

  const handlePoolInteraction = async ([
    chainIdRow,
    collateral,
    buttonAction,
    ,
    opts,
  ]: ParamsOnClickAction) => {
    const collateralLower = collateral.toLowerCase();
    const addressCollateral =
      CHAINDATA[chainIdRow]?.poolAddress?.[collateralLower];
    const addressPool = CHAINDATA[chainIdRow].poolAddress[collateralLower];
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
          valueDeposit,
          // TODO: use dict or something else here
          collateralLower.includes("usdc") ? 6 : 18
        );

        if (opts?.tokenApproved) {
          tx = await contractPool.deposit(valueDepositBigNumber);
        } else {
          const contractERC20 = new Contract(
            addressCollateral,
            ABIS["erc20"],
            library.getSigner()
          );
          tx = await contractERC20.approve(addressPool, valueDepositBigNumber);
        }
      } else {
        const valueWithdraw = valueWitdrawRef.current;
        const valueWithdrawBigNumber = parseUnitsSafe(
          valueWithdraw,
          // TODO: use dict or something else here
          collateralLower.includes("usdc") ? 6 : 18
        );
        tx = await contractPool.withdraw(valueWithdrawBigNumber);
      }

      await tx.wait();
      toast.success(`Tx successful (${buttonAction})`);
    } catch (e) {
      console.error(e);
      toast.error(`Tx failed (${buttonAction})`);
    }
  };

  // TODO: do all todos here that are in `handlePoolInteraction`
  const handleRewardsInteraction = async ([
    chainIdRow,
    collateral,
    buttonAction,
    indexRow,
  ]: ParamsOnClickAction) => {
    if (indexRow === undefined) {
      throw Error("`indexRow` missing");
    }

    const collateralLower = collateral.toLowerCase();
    const addressRewards =
      CHAINDATA[chainIdRow].rewardsContract[collateralLower];
    const contractRewards = new Contract(
      addressRewards,
      ABIS["rewards"],
      library
    );
    const contractRewardsConnected = contractRewards.connect(
      library.getSigner()
    );

    try {
      const tx = await contractRewardsConnected.collectReward();
      await tx.wait();
      toast.success(`Tx successful (${buttonAction})`);

      setPoolRows((prevPoolRows) => {
        const poolRowNewAtIndex = prevPoolRows[indexRow];
        poolRowNewAtIndex.amountClaim = 0;
        const poolRowsNew = [...prevPoolRows];
        poolRowsNew[indexRow] = poolRowNewAtIndex;
        return poolRowsNew;
      });
    } catch (e) {
      console.error(e);
      toast.error(`Tx failed (${buttonAction})`);
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
      cell: (info) => {
        const chainIdRow = Number(info.row.getValue("chainId"));
        const collateralRowLower = info.getValue().toLowerCase();
        const dataKeyRow = NETWORK_NAMES_API.unidexPool[chainIdRow];
        const addressRow =
          CHAINDATA[chainIdRow]?.poolAddress?.[collateralRowLower];
        const poolDataRow: Store["poolData"][string][string] | undefined =
          poolData?.[dataKeyRow]?.[addressRow];

        return (
          <div className="flex">
            <div className="flex items-center mr-3">
              {poolDataRow?.logo ? (
                <img
                  className="rounded-full"
                  src={poolDataRow.logo}
                  alt=""
                  width={25}
                  height={25}
                />
              ) : (
                <div className="text-[25px] -ml-[5px] -mr-[5px]">🌕</div>
              )}
            </div>
            <div className="flex items-center">{info.getValue()}</div>
          </div>
        );
      },
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
          <div>
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
        const chainIdRow = Number(info.row.getValue("chainId"));
        const isChainIdRowMatch = chainIdRow === chainId;
        const infoValue = info.getValue();

        return (
          <div>
            <span className="mr-2">
              {!isChainIdRowMatch && "----"}
              {isChainIdRowMatch &&
                (infoValue === 0 || infoValue >= 1
                  ? infoValue.toFixed(2)
                  : infoValue.toFixed(5))}
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
        <DepositPopover
          chainId={info.row.getValue("chainId")}
          collateral={info.row.getValue("collateral")}
          valueRef={valueDepositRef}
          onClickAction={onClickActionWrapper}
          doNotUpdatePoolRowsRef={doNotUpdatePoolRowsRef}
          account={account}
        />
      ),
    }),
    columnHelper.display({
      id: "actionWithdraw",
      header: "WITHDRAW",
      cell: (info) => (
        <WithdrawPopover
          chainId={info.row.getValue("chainId")}
          collateral={info.row.getValue("collateral")}
          valueRef={valueWitdrawRef}
          onClickAction={onClickActionWrapper}
          doNotUpdatePoolRowsRef={doNotUpdatePoolRowsRef}
        />
      ),
    }),
    columnHelper.display({
      id: "actionClaim",
      header: "CLAIM REWARDS",
      cell: (info) => {
        const indexRow = info.row.index;
        const chainIdRow = Number(info.row.getValue("chainId"));
        const disabledRow = chainIdRow !== chainId;

        return (
          <Button
            className="text-[15px] font-normal bg-main-front w-[161px] py-1 px-5"
            disabled={disabledRow}
            onClick={() =>
              onClickActionWrapper([
                info.row.getValue("chainId"),
                info.row.getValue("collateral"),
                "claim",
                indexRow,
              ])
            }
          >
            {disabledRow ? "----" : "CLAIM REWARDS"}
          </Button>
        );
      },
    }),
  ];

  return columns;
};
