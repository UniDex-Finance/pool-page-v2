import { useEffect } from "react";
import {
  useCall,
  useEtherBalance,
  useEthers,
  useTokenBalance,
} from "@usedapp/core";
import { Address, ChainId, PoolRow } from "../../../../types";
import { ABIS, CHAINDATA, NETWORK_NAMES_API } from "../../../../constants";
import { ADDRESS_ZERO } from "../../../../constants/tokens";
import { useAppState } from "../../../../hooks";
import { formatUnits } from "../../../../helpers";
import {
  FANTOM_CHAIN_ID,
  METIS_CHAIN_ID,
  ZKSYNC_CHAIN_ID,
} from "../../../../constants/networks";
import { Contract } from "ethers";

const CHAINS_IGNORE = [FANTOM_CHAIN_ID, ZKSYNC_CHAIN_ID, METIS_CHAIN_ID];

type PropsHook = {
  chainIdRow: ChainId;
  collateralRow: string;
  setPoolRows: React.Dispatch<React.SetStateAction<PoolRow[]>>;
  index: number;
};

const usePoolTVL = ({
  chainIdRow,
  collateralRow,
  setPoolRows,
  index,
}: PropsHook) => {
  const collateralRowLower = collateralRow.toLowerCase();
  const chainDataRow = CHAINDATA[chainIdRow];
  const addressCollateralRow = chainDataRow?.currencies?.[collateralRowLower];
  const addressPoolRow = chainDataRow?.oldpool?.[collateralRowLower];
  const pricesKeyRow = `${NETWORK_NAMES_API.defillama[chainIdRow]}:${addressCollateralRow}`;

  const { state } = useAppState();
  const prices = state?.prices;

  const tvlRow =
    addressCollateralRow === ADDRESS_ZERO
      ? useEtherBalance(addressPoolRow, { chainId: chainIdRow })
      : useTokenBalance(addressCollateralRow, addressPoolRow, {
          chainId: chainIdRow,
        });

  const updateTvlRow = () => {
    if (tvlRow && prices && Object.keys(prices).length) {
      if (!prices[pricesKeyRow]) {
        return;
      }

      const tvlRowFormatted = formatUnits(
        tvlRow || 0,
        collateralRowLower === "usdc" && !CHAINS_IGNORE.includes(chainIdRow)
          ? 6
          : 18
      );
      const tvlRowFormattedNumber = Number(tvlRowFormatted);
      const priceCurrencyRow = prices[pricesKeyRow];
      const tvlRowFormattedNumberUSD =
        tvlRowFormattedNumber * priceCurrencyRow.price;

      setPoolRows((prevPoolRows) => {
        const poolRowNewAtIndex = prevPoolRows[index];
        poolRowNewAtIndex.tvl = tvlRowFormattedNumberUSD;
        const poolRowsNew = [...prevPoolRows];
        poolRowsNew[index] = poolRowNewAtIndex;
        return poolRowsNew;
      });
    }
  };

  useEffect(() => {
    updateTvlRow();
  }, [tvlRow]);
};

const usePoolDeposited = ({
  chainIdRow,
  collateralRow,
  setPoolRows,
  index,
  library,
  account,
}: PropsHook & { library: any; account: Address | undefined }) => {
  const collateralRowLower = collateralRow.toLowerCase();
  const chainDataRow = CHAINDATA[chainIdRow];
  const addressPoolRow = chainDataRow?.oldpool?.[collateralRowLower];

  const callResult = useCall(
    addressPoolRow &&
      library &&
      account && {
        contract: new Contract(addressPoolRow, ABIS["pool"], library),
        method: "getCurrencyBalance",
        args: [account],
      },
    { chainId: chainIdRow }
  );
  const amountDeposit = callResult?.value;

  const updateAmountDepositRow = () => {
    const amountDepositFormatted = formatUnits(
      amountDeposit?.toString() || "0",
      collateralRowLower === "usdc" && !CHAINS_IGNORE.includes(chainIdRow)
        ? 6
        : 18
    );
    setPoolRows((prevPoolRows) => {
      const poolRowNewAtIndex = prevPoolRows[index];
      poolRowNewAtIndex.amountDeposit = Number(amountDepositFormatted);
      const poolRowsNew = [...prevPoolRows];
      poolRowsNew[index] = poolRowNewAtIndex;
      return poolRowsNew;
    });
  };

  useEffect(() => {
    updateAmountDepositRow();
  }, [amountDeposit]);
};

const usePoolClaimable = ({
  chainIdRow,
  collateralRow,
  setPoolRows,
  index,
  library,
}: PropsHook & { library: any }) => {
  const collateralRowLower = collateralRow.toLowerCase();
  const chainDataRow = CHAINDATA[chainIdRow];
  const addressRewardsRow = chainDataRow?.oldpoolrewards?.[collateralRowLower];
  const callResult = useCall(
    addressRewardsRow &&
      library && {
        contract: new Contract(addressRewardsRow, ABIS["rewards"], library),
        method: "getClaimableReward",
      },
    { chainId: chainIdRow }
  );
  const amountClaim = callResult?.value;

  const updateAmountClaimRow = () => {
    const amountClaimFormatted = formatUnits(
      amountClaim?.toString() || "0",
      collateralRowLower === "usdc" && !CHAINS_IGNORE.includes(chainIdRow)
        ? 6
        : 18
    );
    setPoolRows((prevPoolRows) => {
      const poolRowNewAtIndex = prevPoolRows[index];
      poolRowNewAtIndex.amountClaim = Number(amountClaimFormatted);
      const poolRowsNew = [...prevPoolRows];
      poolRowsNew[index] = poolRowNewAtIndex;
      return poolRowsNew;
    });
  };

  useEffect(() => {
    updateAmountClaimRow();
  }, [amountClaim]);
};

type Props = PropsHook;

export default (props: Props) => {
  const { library, account } = useEthers();

  usePoolTVL(props);
  usePoolDeposited({ ...props, library, account });
  usePoolClaimable({ ...props, library });

  return <></>;
};
