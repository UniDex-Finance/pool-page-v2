import { useEffect, useState } from "react";
import { PoolDataService } from "../../../../services";

type Props = {
  className?: string;
};

export default ({ className }: Props) => {
  const [, setTvlTotal] = useState("0");

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
      <button>Chain Filter</button>
      <button>APR Date Range RANGE v</button>
      <div>
        <span className="mr-4">TVL: $1,234,567</span>
        <span className="mr-4">Total Deposited: $1,234,567</span>
        <span>Unclaimed Rewards: $1,234,567</span>
      </div>
    </div>
  );
};
