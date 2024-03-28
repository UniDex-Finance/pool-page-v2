/* eslint-disable react-refresh/only-export-components */
import { useState, useMemo, useEffect } from "react";
import { formatUnits } from "ethers/lib/utils";
import { NumericFormat } from "react-number-format";
import { useEthers, useTokenAllowance, useTokenBalance } from "@usedapp/core";
import { ethers } from "ethers";
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
import {
  ADDRESS_ZERO,
  CURRENCY_DETAILS,
} from "../../../../../constants/tokens";
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
  const [balanceDeposit, setBalanceDeposit] = useState<ethers.BigNumber | undefined>();

  const { library, chainId: chainIdEthers, account: accountEthers } = useEthers();
  const disabled = chainId !== chainIdEthers;

  const collateralLower = collateral.toLowerCase();
  const collateralUpper = collateral.toUpperCase();

  const addressCollateral = useMemo(
    () => CHAINDATA[chainIdEthers]?.collateral?.[collateralLower] || ADDRESS_ZERO,
    [chainIdEthers, collateralLower]
  );
  const addressPool = useMemo(
    () => CHAINDATA[chainIdEthers]?.poolAddress?.[collateralLower] || ADDRESS_ZERO,
    [chainIdEthers, collateralLower]
  );
  const decimalsCollateral =
    CURRENCY_DETAILS?.[chainIdEthers]?.[collateralUpper]?.decimals || 18;

  const tokenBalance = useTokenBalance(addressCollateral, accountEthers, { chainId: chainIdEthers });

  useEffect(() => {
    const fetchBalance = async () => {
      if (addressCollateral === ADDRESS_ZERO && library && accountEthers) {
        const balance = await library.getBalance(accountEthers);
        setBalanceDeposit(balance);
      } else if (addressCollateral !== ADDRESS_ZERO && tokenBalance) {
        setBalanceDeposit(tokenBalance);
      }
    };

    fetchBalance();
  }, [addressCollateral, library, accountEthers, tokenBalance]);

  const allowanceDeposit = useTokenAllowance(addressCollateral, accountEthers, addressPool);

  console.log("balanceDeposit", balanceDeposit, "chainId", chainIdEthers, "account", account);

  const balanceDepositFormatted = formatUnits(
    balanceDeposit || 0,
    decimalsCollateral
  );
  const allowanceDepositFormatted = formatUnits(
    allowanceDeposit || 0,
    decimalsCollateral
  );

  const balanceDepositFormattedNumber = Number(balanceDepositFormatted);
  const allowanceDepositFormattedNumber = Number(allowanceDepositFormatted);

  const balanceAvailable = !isNaN(balanceDepositFormattedNumber) && balanceDepositFormattedNumber >= Number(value);
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
        <div className="flex flex-col justify-center p-4 rounded-lg bg-main-back">
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
          <div className="flex items-center justify-between mb-1 text-white">
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
              className="px-2 py-1 font-normal bg-main-front"
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
