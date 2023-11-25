import { useRef, useState } from "react";
import { PoolRow } from "../../../types";
import PoolTitle from "./PoolTitle";
import PoolOptions from "./PoolOptions";
import PoolTable from "./PoolTable";

export default () => {
  const [poolRows, setPoolRows] = useState<PoolRow[]>([]);
  const doNotUpdatePoolRowsRef = useRef(false);

  return (
    <div className="flex flex-col items-center">
      <div className="min-w-[1300px] max-w-[1300px]">
        <div className="mb-8">
          <PoolTitle className="mb-8" />
          <PoolOptions poolRows={poolRows} setPoolRows={setPoolRows} />
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
