type Props = {
  className?: string;
};

export default ({ className }: Props) => (
  <div className={`flex items-center ${className}`}>
    <div className="mr-32 text-2xl font-semibold min-w-max">
      UNIDEX PRMM POOLS
    </div>
    <div className="font-semibold text-secondary-text">
      <span>
        PRMM Pools are not risk free! Each pool follows different market-making strategies to take on traders PnL{" "}
      </span>
      <a
        className="underline"
        href="https://docs.unidex.exchange/unidex/perpetual-swaps/intro-to-leverage-trading"
      >
        (link to docs).
      </a>
    </div>
  </div>
);
