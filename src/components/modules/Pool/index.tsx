import PoolTitle from "./PoolTitle";
import PoolOptions from "./PoolOptions";
import PoolTable from "./PoolTable";

export default () => (
  <div className="flex flex-col items-center">
    <div className="min-w-[1300px] max-w-[1300px]">
      <div className="mb-8">
        <PoolTitle className="mb-8" />
        <PoolOptions />
      </div>
      <PoolTable />
    </div>
  </div>
);
