// import { useState } from "react";
// import { ChainId } from "../../../../types";

type Props = {
  className?: string;
};

export default ({ className }: Props) => {
  /*
  const [filterSelectionChain, setFilterSelectionChain] =
    useState<ChainId | null>(null);
    
  const onSelectFilterChain = (selectionChain: ChainId | null) => {
    setFilterSelectionChain(selectionChain);
  };
  */

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
