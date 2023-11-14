type Props = {
  className?: string;
};

export default ({ className }: Props) => (
  <div className={`flex items-center ${className}`}>
    <div className="text-2xl font-semibold min-w-max mr-32">
      UNIDEX PRMM POOLS
    </div>
    <div className="text-secondary-text font-semibold">
      <span>
        UniDex PRMM Pools have trades automatically managed spreads & price
        impact. Deposit and earn Fees & Trader PnL but note, yield can be
        negative resulting in pools not being risk free!{" "}
      </span>
      <a
        className="underline"
        href="https://docs.unidex.exchange/unidex/perpetual-swaps/intro-to-leverage-trading"
      >
        Click here to understand the risks by going over our docs.
      </a>
    </div>
  </div>
);
