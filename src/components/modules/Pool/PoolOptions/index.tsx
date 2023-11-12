import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { PoolDataService } from "../../../../services";
import arrowSelectorWhiteIcon from "../../../../assets/arrow-selector-white.svg";

type Props = {
  className?: string;
};

export default ({ className }: Props) => {
  const [tvlTotal, setTvlTotal] = useState("0");

  const updateTvl = async () => {
    try {
      const tvlTotalNew = await PoolDataService.get(["tvlTotal"]);
      setTvlTotal((tvlTotalNew as number).toFixed(2));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    updateTvl();
  }, []);

  return (
    <div className={`flex justify-between ${className}`}>
      <Button className="flex items-center text-md font-semibold bg-main-card py-3 px-6 rounded-lg">
        <div className="mr-6">Chain Filter</div>
        <div className="mr-4">---</div>
        <img src={arrowSelectorWhiteIcon} />
      </Button>
      <Button className="flex items-center text-md font-semibold bg-main-card py-3 px-6 rounded-lg">
        <div className="mr-6">APR Date Range RANGE </div>
        <div className="mr-4">---</div>
        <img src={arrowSelectorWhiteIcon} />
      </Button>
      <div className="bg-main-card py-3 px-6 rounded-lg">
        <span className="mr-4">TVL: ${tvlTotal}</span>
        <span className="mr-4">Total Deposited: $---------</span>
        <span>Unclaimed Rewards: $---------</span>
      </div>
    </div>
  );
};
