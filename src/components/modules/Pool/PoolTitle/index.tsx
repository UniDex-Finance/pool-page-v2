type Props = {
  className?: string;
};

export default ({ className }: Props) => (
  <div className={`flex ${className}`}>
    <div className="text-xl min-w-max mr-32">UNIDEX PRMM POOLS</div>
    <div>
      UniDex PRMM Pools have trades automatically managed spreads & price
      impact. Deposit and earn Fees & Trader PnL but note, yield Can be negative
      resulting in pools not being risk free! Click here to understand the risks
      by going over our docs.
    </div>
  </div>
);
