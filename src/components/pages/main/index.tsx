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

  return (
    <>
      <Header />
      <button
        onClick={async () => {
          const prices = await PoolDataService.get(["prices"]);
          dispatch({
            type: actions.SET_PRICES,
            payload: prices,
          });
        }}
      >
        GET AND SAVE PRICES
      </button>
      <div className="p-12">
        <Pool />
      </div>
      <div id="portal" />
    </>
  );
};
