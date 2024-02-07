import { useEffect } from "react";
import { Contract } from "ethers";
import {
  useCall,
  useEtherBalance,
  useEthers,
  useTokenBalance,
} from "@usedapp/core";
import { Address, ChainId, PoolRow } from "../../../../types";
import { ABIS, CHAINDATA, NETWORK_NAMES_API } from "../../../../constants";
import { ADDRESS_ZERO, CURRENCY_DETAILS } from "../../../../constants/tokens";
import { useAppState } from "../../../../hooks";
import { formatUnits } from "../../../../helpers";

type PropsHook = {
  chainIdRow: ChainId;
  collateralRow: string;
  setPoolRows: React.Dispatch<React.SetStateAction<PoolRow[]>>;
  index: number;
  doNotUpdatePoolRowsRef: React.MutableRefObject<boolean>;
};

const usePoolTVL = ({
  chainIdRow,
  collateralRow,
  setPoolRows,
  index,
  doNotUpdatePoolRowsRef,
}: PropsHook) => {
  const collateralRowLower = collateralRow.toLowerCase();
  const collateralRowUpper = collateralRow.toUpperCase();
  const chainDataRow = CHAINDATA[chainIdRow];
  const addressCollateralRow = chainDataRow?.collateral?.[collateralRowLower];
  const addressPoolRow = chainDataRow?.poolAddress?.[collateralRowLower];
  const decimalsCollateral =
    CURRENCY_DETAILS[chainIdRow]?.[collateralRowUpper]?.decimals || 18;
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

      const tvlRowFormatted = formatUnits(tvlRow || 0, decimalsCollateral);
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
    if (doNotUpdatePoolRowsRef.current) {
      return;
    }
    updateTvlRow();
  }, [tvlRow]);
};

const usePoolDeposited = ({
  chainIdRow,
  collateralRow,
  setPoolRows,
  index,
  doNotUpdatePoolRowsRef,
  library,
  account,
}: PropsHook & { library: any; account: Address | undefined }) => {
  const collateralRowLower = collateralRow.toLowerCase();
  const chainDataRow = CHAINDATA[chainIdRow];
  const addressPoolRow = chainDataRow?.poolAddress?.[collateralRowLower];

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
      18
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
    if (doNotUpdatePoolRowsRef.current) {
      return;
    }
    updateAmountDepositRow();
  }, [amountDeposit]);
};

const usePoolClaimable = ({
  chainIdRow,
  collateralRow,
  setPoolRows,
  index,
  doNotUpdatePoolRowsRef,
  chainIdEthers,
  library,
}: PropsHook & { chainIdEthers: number | undefined; library: any }) => {
  const collateralRowLower = collateralRow.toLowerCase();
  const chainDataRow = CHAINDATA[chainIdRow];
  const addressRewardsRow = chainDataRow?.rewardsContract?.[collateralRowLower];

  /*
  const contractRewardsRow: Contract | false =
    addressRewardsRow &&
    library &&
    new Contract(addressRewardsRow, ABIS["rewards"], library);
  const contractRewardsRowConnected =
    contractRewardsRow && contractRewardsRow.connect(library.getSigner());

  const callResult = useCall(
    addressRewardsRow &&
      library && {
        contract: contractRewardsRowConnected,
        method: "getClaimableReward",
        args: [],
      },
    { chainId: chainIdRow }
  );
  const amountClaim = callResult?.value;
  */

  const updateAmountClaimRow = async () => {
    /*
    const amountClaimFormatted = formatUnits(
      amountClaim?.toString() || "0",
        collateralRowLower.includes("usdc"),
        18
    );
    */

    const contractRewardsRow = new Contract(
      addressRewardsRow,
      ABIS["rewards"],
      library
    );
    const contractRewardsRowConnected = contractRewardsRow.connect(
      library.getSigner()
    );

    const amountClaim = await contractRewardsRowConnected.getClaimableReward();
    const amountClaimFormatted = formatUnits(
      amountClaim?.toString() || "0",
      18
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
    if (doNotUpdatePoolRowsRef.current) {
      return;
    }
    const isChainIdRowMatch = chainIdRow === chainIdEthers;
    if (addressRewardsRow && library && isChainIdRowMatch) {
      updateAmountClaimRow();
    }
  }, [library, chainIdEthers, chainIdEthers]);
};

type Props = PropsHook;

export default (props: Props) => {
  const { library, account, chainId } = useEthers();

  usePoolTVL(props);
  usePoolDeposited({ ...props, library, account });
  usePoolClaimable({ ...props, chainIdEthers: chainId, library });

  return <></>;
};
