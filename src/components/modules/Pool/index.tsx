/* eslint-disable react-refresh/only-export-components */
import { useEffect, useRef, useState } from "react";
import { PoolRow } from "../../../types";
import { useAppState } from "../../../hooks";
import { PoolDataRangeKey, Store } from "../../../types/core";
import { CHAINDATA } from "../../../constants";
import { NETWORK_NAMES_API } from "../../../constants";
import PoolTitle from "./PoolTitle";
import PoolOptions from "./PoolOptions";
import PoolTable from "./PoolTable";

// DEV
//import poolDataTest from "../dev/poolDataTest.json";

export default () => {
  const [poolRows, setPoolRows] = useState<PoolRow[]>([]);
  const doNotUpdatePoolRowsRef = useRef(false);

  const { state } = useAppState();
  const poolData: Store["poolData"] | undefined = state?.poolData;
  //const poolData: Store["poolData"] = poolDataTest;

  const updatePoolRowsAPR = (aprRange: PoolDataRangeKey) => {
    if (!(poolRows.length && poolData && Object.keys(poolData).length)) {
      return;
    }
  
    const poolRowsNew = poolRows.map((p) => {
      const poolRowDataKey = NETWORK_NAMES_API.unidexPool[p.chainId];
      const poolRowAddress = CHAINDATA[p.chainId].poolAddress[p.collateral.toLowerCase()];
      const poolRowData: Store["poolData"][string][string] | undefined = poolData?.[poolRowDataKey]?.[poolRowAddress];
  
      if (poolRowData) {
        const apr = parseFloat(poolRowData[aprRange].APR);
        const rewardapr = parseFloat(poolRowData[aprRange].RewardAPR);
  
        const pNew: PoolRow = {
          ...p,
          apr,
          rewardapr,
        };
  
        return pNew;
      }
  
      return p;
    });
  
    setPoolRows(poolRowsNew);
  };

  useEffect(() => {
    updatePoolRowsAPR("30DayData");
  }, [poolData, poolRows.length]);

  return (
    <div className="flex flex-col lg:items-center">
      <div className="min-w-[1350px] max-w-[1350px]">
        <div className="mb-8">
          <PoolTitle className="mb-8" />
          <PoolOptions
            poolRows={poolRows}
            setPoolRows={setPoolRows}
            updatePoolRowsAPR={updatePoolRowsAPR}
          />
        </div>
        <div className="h-[1100px]">
          <PoolTable
            poolRows={poolRows}
            setPoolRows={setPoolRows}
            doNotUpdatePoolRowsRef={doNotUpdatePoolRowsRef}
          />
        </div>
      </div>
    </div>
  );
};
