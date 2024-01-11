import { useEffect, useState } from "react";

import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { shortenAddress, useEthers, useLookupAddress } from "@usedapp/core";
// import { Web3Provider } from '@ethersproject/providers';
import { ethers } from "ethers";
import walletIcon from "../../../assets/wallet.svg";
import userDefaultIcon from "../../../assets/icons/user-default.png";
import { HeaderButton } from "../../elements";
import { WalletModal } from "../../modals";
import { shortenENS } from "../../../helpers";

export default function WalletButton() {
  const { account, activate, deactivate } = useEthers();
  const { ens } = useLookupAddress(account);
  const { primaryWallet, setShowAuthFlow } = useDynamicContext();

  const [walletActivated, setWalletActivated] = useState(false);
  const [walletModalVisible, setWalletModalVisible] = useState(false);

  async function activateWallet() {
    // const provider = walletConnector?.getWeb3Provider() as Web3Provider;
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    // @ts-ignore
    await activate(provider);
    setWalletActivated(true);
  }

  async function refresh() {
    if (primaryWallet?.connected) {
      try {
        await activateWallet();
      } catch (e) {
        console.error(e);
      }

      return;
    }

    if (walletActivated) {
      deactivate();
      setWalletActivated(false);
      setShowAuthFlow(true);
    }
  }

  useEffect(() => {
    refresh();
  }, [primaryWallet?.connected]);

  const reload = () => window.location.reload();

  useEffect(() => {
    window.ethereum?.on("accountsChanged", reload);
    window.ethereum?.on("chainChanged", reload);
    return () => {
      window.ethereum?.removeListener("accountsChanged", reload);
      window.ethereum?.removeListener("chainChanged", reload);
    };
  }, []);

  return (
    <>
      {account ? (
        <HeaderButton onClick={() => setWalletModalVisible(true)}>
          <div className="flex flex-row justify-evenly items-center">
            {primaryWallet?.connected && (
              <img width={22} height={22} src={userDefaultIcon} alt="" />
            )}
            <div className="ml-2">
              {ens ? shortenENS(ens) : shortenAddress(account)}
            </div>
          </div>
        </HeaderButton>
      ) : (
        <HeaderButton onClick={() => setShowAuthFlow(true)}>
          <div className="flex flex-row justify-evenly items-center space-x-2 px-2 text-2xl  ">
            <img width={25} height={24} src={walletIcon} title="" alt="" />
            <div className="text-xl min-w-max">
              <span>Connect</span>
              <span className="lg:inline "> Wallet</span>
            </div>
          </div>
        </HeaderButton>
      )}
      <WalletModal
        modalVisible={walletModalVisible}
        setModalVisible={setWalletModalVisible}
        walletIcon={userDefaultIcon}
      />
    </>
  );
}
