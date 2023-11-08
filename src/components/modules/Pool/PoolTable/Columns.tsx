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
import { ABIS, CHAINDATA } from "../../../../constants";
import { parseUnitsSafe } from "../../../../helpers";

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
          collateralLower === "usdc" ? 6 : 18
        );
        tx = await contractPool.deposit(valueDepositBigNumber);
      } else {
        const valueWithdraw = valueWitdrawRef.current;
        const valueWithdrawBigNumber = parseUnitsSafe(
          valueWithdraw.toString(),
          // TODO: use dict or something else here
          collateralLower === "usdc" ? 6 : 18
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
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("collateral", {
      id: "collateral",
      header: "COLLATERAL",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("tvl", {
      id: "tvl",
      header: "TVL",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("apr", {
      id: "apr",
      header: "APR",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("amountDeposit", {
      id: "amountDeposit",
      header: "DEPOSITED",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("amountClaim", {
      id: "amountClaim",
      header: "CLAIMABLE REWARDS",
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: "actionDeposit",
      header: "DEPOSIT",
      cell: (info) => (
        <Popover placement="bottom">
          <PopoverHandler>
            <Button>DEPOSIT</Button>
          </PopoverHandler>
          <PopoverContent>
            <div className="flex flex-col justify-center">
              <NumericFormat
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
            <Button>WITHDRAW</Button>
          </PopoverHandler>
          <PopoverContent>
            <div className="flex flex-col justify-center">
              <NumericFormat
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
