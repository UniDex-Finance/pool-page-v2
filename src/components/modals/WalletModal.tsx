import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { shortenIfAddress, useEthers } from "@usedapp/core";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

import copyIcon from "../../assets/copy.svg";
import etherscanIcon from "../../assets/etherscan.svg";
import disconnectIcon from "../../assets/disconnect.svg";
import { ModalLayout } from "../layouts";
import { BLOCK_EXPLORER } from "../../constants";
import { Address } from "../../types";

interface Props {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  walletIcon?: string;
}

const IMG_SIZE_PX = 25;
const IMG_STYLE = `max-w-[${IMG_SIZE_PX}px] max-h-[${IMG_SIZE_PX}px]`;

export default function WalletModal({
  modalVisible,
  setModalVisible,
  walletIcon,
}: Props) {
  const { chainId, account, deactivate } = useEthers();
  const { handleLogOut } = useDynamicContext();

  const [, setCopyText] = useState("Copy Address");

  const addressList: Address[] = [account!];

  function copyAddress(address: Address) {
    navigator.clipboard.writeText(address);
  }

  function openBlockExplorer(address: Address) {
    window.open(`${BLOCK_EXPLORER[chainId!]}/address/${address}`);
  }

  function disconnectWallet() {
    deactivate();
    handleLogOut();
    setModalVisible(false);
  }

  useEffect(() => {
    if (!account) {
      setModalVisible(false);
    }
  }, [account]);

  return (
    <ModalLayout
      modalVisible={modalVisible}
      className="text-white bg-[#101119] border-[1px] border-[#252630] rounded-[10px] p-4 w-full sm:w-[460px]"
      title="Account"
      onClose={() => setModalVisible(false)}
    >
      <div className="flex flex-col-reverse">
        {addressList.map((address, i, list) => (
          <div key={i} className="flex flex-row justify-between mt-3">
            <div className="flex items-center">
              <div className="w-[28px] mr-2">
                {walletIcon && (
                  <img width={25} height={25} src={walletIcon} alt="" />
                )}
              </div>
              <div className="relative">
                <div className="flex items-center bg-neutral-900 text-md p-2 rounded-lg">
                  {shortenIfAddress(address)}
                </div>
                {list.length > 1 && (
                  <div className="absolute italic -bottom-2.5 left-2">
                    ({i > 0 ? "Molten Safe" : "Owner"})
                  </div>
                )}
              </div>
            </div>
            <div>
              <button
                className="p-4 mr-2"
                onClick={() => {
                  copyAddress(address);
                  setCopyText("Copied!");
                }}
                onMouseLeave={() => {
                  setCopyText("Copy Address");
                }}
              >
                <img
                  className={IMG_STYLE}
                  width={IMG_SIZE_PX}
                  height={IMG_SIZE_PX}
                  src={copyIcon}
                  title=""
                  alt="Copy"
                />
                {/* <Tooltip className="bottom-14 min-w-[100px] ml-[-36px]">
                            <div className=" bg-[#0073cf] py-1 px-2 rounded-md m-auto w-fit">
                                {copyText}
                            </div>
                        </Tooltip> */}
              </button>
              <button
                className="p-4 mr-2"
                onClick={() => openBlockExplorer(address)}
              >
                <img
                  className={IMG_STYLE}
                  width={IMG_SIZE_PX}
                  height={IMG_SIZE_PX}
                  src={etherscanIcon}
                  title=""
                  alt="Block Explorer"
                />
                {/* <Tooltip defaultView={true} className="bottom-14 ml-[-43px]">
                            Block Explorer
                        </Tooltip> */}
              </button>
              <button
                className="p-4 disabled:opacity-0"
                disabled={i > 0}
                onClick={disconnectWallet}
              >
                <img
                  className={IMG_STYLE}
                  width={IMG_SIZE_PX}
                  height={IMG_SIZE_PX}
                  src={disconnectIcon}
                  title=""
                  alt="Disconnect"
                />
                {/* <Tooltip defaultView={true} className="bottom-14 ml-[-48px]">
                        Disconnect
                    </Tooltip> */}
              </button>
            </div>
          </div>
        ))}
      </div>
    </ModalLayout>
  );
}
