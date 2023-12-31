import { useEffect } from "react";
import { PoolDataService } from "../../../services";
import { useAppState } from "../../../hooks";
import { actions } from "../../../store/store";
import { Header } from "../../widgets";
import { Pool } from "../../modules";

export default () => {
  const { dispatch } = useAppState();

  /*
  const { data: prices } = useQuery({
    queryKey: ["prices"],
    queryFn: () => PoolDataService.get(["prices"]),
    refetchInterval: 5 * 60 * 1000,
  });
  */

  const getAndSavePrices = async () => {
    const prices = await PoolDataService.get(["prices"]);
    dispatch({
      type: actions.SET_PRICES,
      payload: prices,
    });
  };

  const getAndSavePoolData = async () => {
    const poolData = await PoolDataService.get(["poolData"]);
    dispatch({
      type: actions.SET_POOL_DATA,
      payload: poolData,
    });
  };

  useEffect(() => {
    getAndSavePrices();
    getAndSavePoolData();
  }, []);

  return (
    <div className="text-main-text">
      <Header />
      <div className="p-12">
        <Pool />
      </div>
      <div id="portal" />
    </div>
  );
};
