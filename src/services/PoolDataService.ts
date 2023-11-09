// import { Contract } from "ethers";
import { CHAINDATA } from "../constants";
import { Address, ChainId, PoolDataName } from "../types";

const NAME_TO_URL_CALLBACK: {
  [key in Exclude<PoolDataName, "tvlPool">]: (chainId?: ChainId) => string;
} = {
  pools: () => "https://arkiver.moltennetwork.com/graphql",
  stats: (chainId) => CHAINDATA[chainId!]?.graphUrl,
  prices: () => "https://coins.llama.fi/prices/current",
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
    const response = await fetch(NAME_TO_URL_CALLBACK[name](chainId), {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: NAME_TO_QUERY_CALLBACK[name](addressCollateral),
      }),
    });

    const obj = await response.json();
    const poolData = obj?.data?.[NAME_TO_QUERY_TITLE[name]];
    return poolData;
  }

  static async #getFromContract(/* address: Address */) {
    // const contract = new Contract(address, poolABI);
  }

  static async get([name, chainId, addressCollateral]: ParamsGet): Promise<
    any[] | { [key: string]: any } | undefined
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
