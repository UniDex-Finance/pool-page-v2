import { formatUnits } from "ethers/lib/utils";
import { NumericFormat } from "react-number-format";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { ParamsOnClickAction } from "../Columns";
import { ChainId } from "../../../../../types";
import { useEtherBalance, useEthers, useTokenBalance } from "@usedapp/core";
import { CHAINDATA } from "../../../../../constants";
import { ADDRESS_ZERO } from "../../../../../constants/tokens";
import {
  FANTOM_CHAIN_ID,
  METIS_CHAIN_ID,
  ZKSYNC_CHAIN_ID,
} from "../../../../../constants/networks";

const CHAINS_IGNORE = [FANTOM_CHAIN_ID, ZKSYNC_CHAIN_ID, METIS_CHAIN_ID];

type Props = {
  chainId: ChainId;
  collateral: string;
  valueRef: React.MutableRefObject<string>;
  onClickAction: (params: ParamsOnClickAction) => Promise<void>;
  account?: string;
};

export default ({
  chainId,
  collateral,
  valueRef,
  onClickAction,
  account,
}: Props) => {
  const { chainId: chainIdEthers } = useEthers();
  const disabled = chainId !== chainIdEthers;

  const collateraLower = collateral.toLowerCase();
  const addressCollateral = CHAINDATA[chainId]?.currencies?.[collateraLower];
  const balanceDeposit =
    addressCollateral === ADDRESS_ZERO
      ? useEtherBalance(account, { chainId })
      : useTokenBalance(addressCollateral, account, { chainId });

  const balanceDepositFormatted = formatUnits(
    balanceDeposit || 0,
    collateraLower.includes("usdc") && !CHAINS_IGNORE.includes(chainId) ? 6 : 18
  );
  const balanceDepositFormattedNumber = Number(balanceDepositFormatted);

  return (
    <Popover placement="bottom">
      <PopoverHandler>
        <Button
          className="text-[15px] font-normal bg-main-front w-[103px] py-1 px-5"
          disabled={disabled}
        >
          {disabled ? "----" : "DEPOSIT"}
        </Button>
      </PopoverHandler>
      <PopoverContent>
        <div className="flex flex-col justify-center bg-main-back p-4 rounded-lg">
          <NumericFormat
            className="text-white !bg-main-front mb-2"
            crossOrigin={undefined}
            thousandSeparator
            customInput={Input}
            displayType="input"
            placeholder="0.0"
            onValueChange={(values) => {
              valueRef.current = values.floatValue?.toString() || "";
            }}
          />
          <div className="text-white mb-1">
            <span>Available: </span>
            <span>
              {balanceDepositFormattedNumber.toFixed(
                balanceDepositFormattedNumber >= 1 ? 2 : 5
              )}{" "}
              {collateral}
            </span>
          </div>
          <Button
            className="font-normal bg-main-front py-1"
            onClick={() => onClickAction([chainId, collateral, "deposit"])}
          >
            CONFIRM DEPOSIT
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
