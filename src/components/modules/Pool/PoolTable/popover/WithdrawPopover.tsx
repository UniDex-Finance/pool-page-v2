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
};

export default ({ chainId, collateral, valueRef, onClickAction }: Props) => {
  const { library } = useEthers();
  const collateraLower = collateral.toLowerCase();
  const addressCollateral = CHAINDATA[chainId]?.oldpool?.[collateraLower];

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
    <Popover placement="bottom">
      <PopoverHandler>
        <Button className="text-[15px] font-normal bg-main-front py-1 px-5">
          WITHDRAW
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
            <span>{minDepositTimeHours} hr</span>
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
