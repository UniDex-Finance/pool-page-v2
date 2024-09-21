import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default ({ children }: Props) => (
  <div className="flex flex-col">
    <div className="p-4 text-center text-white bg-red-600">
      V3 Pooling is now deprecated and staking here will not earn you any rewards nor will any trades go through these pools. The protocol was upgraded to a newer version with completely new contracts. <br /> 
      While there is no risk to your funds, we recommend you unstake from V3 pools and stake in V4 pools on arbitrum to earn increased yield and earn staking rewards. <br />
      Visit <a href="https://leverage.unidex.exchange/pooling" className="underline">leverage.unidex.exchange/pooling</a> to stake in V4 pools on arbitrum to earn increased yield and earn staking rewards. <br />
      Learn more about the upgrade here 👉 <a href="https://mirror.xyz/unidexexchange.eth/s-k0LsV1czUTz4p6fXAyRdjzSpn5VmqEBNy-pJ0tQ7w" className="underline">UniDex V4: Market Making Pool Breakthrough</a>
    </div>
    {children}
  </div>
);