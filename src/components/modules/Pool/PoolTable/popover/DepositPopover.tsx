import { useState } from "react";
import { formatUnits } from "ethers/lib/utils";
import { NumericFormat } from "react-number-format";
import {
  useEtherBalance,
  useEthers,
  useTokenAllowance,
  useTokenBalance,
} from "@usedapp/core";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { ParamsOnClickAction } from "../Columns";
import { ChainId } from "../../../../../types";
import { CHAINDATA } from "../../../../../constants";
import { ADDRESS_ZERO } from "../../../../../constants/tokens";
import { roundAndFloor } from "../../../../../helpers";

type Props = {
  chainId: ChainId;
  collateral: string;
  valueRef: React.MutableRefObject<string>;
  onClickAction: (params: ParamsOnClickAction) => Promise<void>;
  doNotUpdatePoolRowsRef: React.MutableRefObject<boolean>;
  account?: string;
};

export default ({
  chainId,
  collateral,
  valueRef,
  onClickAction,
  doNotUpdatePoolRowsRef,
  account,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const { chainId: chainIdEthers } = useEthers();
  const disabled = chainId !== chainIdEthers;

  const collateralLower = collateral.toLowerCase();
  const addressCollateral = CHAINDATA[chainId]?.collateral?.[collateralLower];
  const addressPool = CHAINDATA[chainId]?.poolAddress?.[collateralLower];

  const balanceDeposit =
    addressCollateral === ADDRESS_ZERO
      ? useEtherBalance(account, { chainId })
      : useTokenBalance(addressCollateral, account, { chainId });
  const allowanceDeposit = useTokenAllowance(
    addressCollateral,
    account,
    addressPool
  );

  const balanceDepositFormatted = formatUnits(
    balanceDeposit || 0,
    collateralLower.includes("usdc") ? 6 : 18
  );
  const allowanceDepositFormatted = formatUnits(
    allowanceDeposit || 0,
    collateralLower.includes("usdc") ? 6 : 18
  );

  const balanceDepositFormattedNumber = Number(balanceDepositFormatted);
  const allowanceDepositFormattedNumber = Number(allowanceDepositFormatted);

  const balanceAvailable = balanceDepositFormattedNumber >= Number(value);
  const tokenApproved =
    addressCollateral === ADDRESS_ZERO ||
    allowanceDepositFormattedNumber >= Number(value);

  return (
    <Popover
      placement="bottom"
      open={open}
      handler={(value) => {
        setOpen(value);
        doNotUpdatePoolRowsRef.current = value;
      }}
    >
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
            value={value}
            onValueChange={(values) => {
              const valueNew = values.floatValue?.toString() || "";
              valueRef.current = valueNew;
              setValue(valueNew);
            }}
          />
          <div className="flex justify-between items-center text-white mb-1">
            <div>
              <span>Available: </span>
              <span className="font-bold">
                {balanceDepositFormattedNumber.toFixed(
                  balanceDepositFormattedNumber >= 1 ? 2 : 5
                )}{" "}
                {collateral}
              </span>
            </div>
            <Button
              className="font-normal bg-main-front py-1 px-2"
              onClick={() => {
                const maxRoundedNumber = roundAndFloor(
                  balanceDepositFormattedNumber,
                  balanceDepositFormattedNumber >= 1 ? 3 : 8
                );
                valueRef.current = maxRoundedNumber;
                setValue(maxRoundedNumber);
              }}
            >
              MAX
            </Button>
          </div>
          <Button
            className={`font-normal bg-main-front py-1 disabled:bg-main-front-disabled ${
              !tokenApproved ? "bg-sky-400" : ""
            }`}
            disabled={!balanceAvailable}
            onClick={() =>
              onClickAction([
                chainId,
                collateral,
                "deposit",
                undefined,
                { tokenApproved },
              ])
            }
          >
            {!balanceAvailable && "LOW BALANCE"}
            {balanceAvailable &&
              (tokenApproved ? "CONFIRM DEPOSIT" : "APPROVE TOKEN")}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
