// import { Contract } from "ethers";
import { CHAINDATA, NETWORK_NAMES_API } from "../constants";
import { Address, ChainId, PoolDataName } from "../types";

const NAME_TO_URL_CALLBACK: {
  [key in Exclude<PoolDataName, "tvlPool">]: (...values: any[]) => string;
} = {
  pools: () => "https://arkiver.moltennetwork.com/graphql",
  stats: (chainId) => CHAINDATA[chainId!]?.graphUrl,
  prices: (chainIds: ChainId[]) => {
    const priceKeys: string[] = [];
    chainIds.forEach((c) => {
      const { currencies } = CHAINDATA[c];
      Object.values(currencies).forEach((addressCurrency) => {
        priceKeys.push(`${NETWORK_NAMES_API.defillama[c]}:${addressCurrency}`);
      });
    });
    return `https://coins.llama.fi/prices/current/${priceKeys}`;
  },
  tvlTotal: () => "https://api.llama.fi/tvl/unidex",
};

const NAME_TO_QUERY_CALLBACK: {
  [key in Exclude<PoolDataName, "tvlPool">]: (
    addressCollateral?: Address
  ) => string;
} = {
  pools: () => `
    query {
      TokenInfos {
        chainId
        symbol
        createdAtTimestamp
      }
    }
  `,
  stats: (addressCollateral) => `
    query { 
      datas(where: {id: "${addressCollateral}"}) {
        cumulativeFees,
        cumulativePnl,
      }
    }`,
  prices: () => "",
  tvlTotal: () => "",
};

const NAME_TO_QUERY_TITLE: {
  [key in Exclude<PoolDataName, "tvlPool">]: string;
} = {
  pools: "TokenInfos",
  stats: "datas",
  prices: "",
  tvlTotal: "",
};

type ParamsGet = [
  name: PoolDataName,
  chainId?: ChainId,
  addressCollateral?: Address
];

export default class {
  static async #getFromAPI(
    name: Exclude<PoolDataName, "tvlPool">,
    method: "GET" | "POST",
    chainId?: ChainId,
    addressCollateral?: Address
  ) {
    let callbackArg: any = chainId;
    // TODO: move creating defillama token list where `PoolDataSevice.get` is called
    if (name === "prices") {
      const callbackArgPrices: ChainId[] = [];
      Object.entries(CHAINDATA).forEach(([entryChainId, entryData]) => {
        if (!entryData.isTestnet) {
          callbackArgPrices.push(Number(entryChainId));
        }
      });
      callbackArg = callbackArgPrices;
    }

    const response = await fetch(NAME_TO_URL_CALLBACK[name](callbackArg), {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body:
        method === "POST"
          ? JSON.stringify({
              query: NAME_TO_QUERY_CALLBACK[name](addressCollateral),
            })
          : undefined,
    });

    const obj = await response.json();
    if (name === "pools") {
      return obj?.data?.[NAME_TO_QUERY_TITLE[name]];
    }

    if (name === "prices") {
      return obj?.coins;
    }

    return obj;
  }

  static async #getFromContract(/* address: Address */) {
    // const contract = new Contract(address, poolABI);
  }

  static async get([name, chainId, addressCollateral]: ParamsGet): Promise<
    any[] | { [key: string]: any } | number | undefined
  > {
    /*
    if (name === "tvlPool" && !address) {
      throw Error("Address required for PoolDataService get tvlPool");
    }
    */

    const nameToFunction: { [key in PoolDataName]: (...values: any[]) => any } =
      {
        pools: async () => await this.#getFromAPI(name as "pools", "POST"),
        stats: async () =>
          await this.#getFromAPI(
            name as "stats",
            "POST",
            chainId,
            addressCollateral
          ),
        prices: async () => await this.#getFromAPI(name as "prices", "GET"),
        tvlTotal: async () => await this.#getFromAPI(name as "tvlTotal", "GET"),
        tvlPool: async () => await this.#getFromContract(/* account! */),
      };

    const poolData = await nameToFunction[name]();
    return poolData;
  }
}
