import { useState } from "react";
import { Contract } from "ethers";
import { NumericFormat } from "react-number-format";
import { useCall, useEthers } from "@usedapp/core";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { ParamsOnClickAction } from "../Columns";
import { ChainId } from "../../../../../types";
import { ABIS, CHAINDATA } from "../../../../../constants";

type Props = {
  chainId: ChainId;
  collateral: string;
  valueRef: React.MutableRefObject<string>;
  onClickAction: (params: ParamsOnClickAction) => Promise<void>;
  doNotUpdatePoolRowsRef: React.MutableRefObject<boolean>;
};

export default ({
  chainId,
  collateral,
  valueRef,
  onClickAction,
  doNotUpdatePoolRowsRef,
}: Props) => {
  const [open, setOpen] = useState(false);

  const { library, chainId: chainIdEthers } = useEthers();
  const disabled = chainId !== chainIdEthers;

  const collateralLower = collateral.toLowerCase();
  const addressCollateral = CHAINDATA[chainId]?.poolAddress?.[collateralLower];

  const callResult = useCall(
    addressCollateral &&
      library && {
        contract: new Contract(addressCollateral, ABIS["pool"], library),
        method: "minDepositTime",
      },
    { chainId, refresh: "never" }
  );
  const minDepositTime = callResult?.value;
  const minDepositTimeHours = minDepositTime ? minDepositTime / 60 / 60 : 0;

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
          className="text-[15px] font-normal bg-main-front w-[122px] py-1 px-5"
          disabled={disabled}
        >
          {disabled ? "----" : "WITHDRAW"}
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
            <span>Min withdraw time: </span>
            <span className="font-bold">{minDepositTimeHours} hr</span>
          </div>
          <Button
            className="font-normal bg-main-front py-1"
            onClick={() => onClickAction([chainId, collateral, "withdraw"])}
          >
            CONFIRM WITHDRAW
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
