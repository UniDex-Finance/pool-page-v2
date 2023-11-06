// import { Contract } from "ethers";
import { Address, PoolDataName } from "../types";

const NAME_TO_URL: { [key in Exclude<PoolDataName, "tvlPool">]: string } = {
  pools: "https://arkiver.moltennetwork.com/graphql",
  prices: "https://coins.llama.fi/prices/current",
  tvlTotal: "https://api.llama.fi/tvl/unidex",
};

const NAME_TO_QUERY_TITLE: {
  [key in Exclude<PoolDataName, "tvlPool">]: string;
} = {
  pools: "TokenInfos",
  prices: "",
  tvlTotal: "",
};

const NAME_TO_QUERY: { [key in Exclude<PoolDataName, "tvlPool">]: string } = {
  pools: `
    query GetTokenInfos {
      TokenInfos {
        chainId
        symbol
      }
    }
  `,
  prices: "",
  tvlTotal: "",
};

type ParamsGet = [name: PoolDataName, address?: Address];

export default class {
  static async #getFromAPI(
    name: Exclude<PoolDataName, "tvlPool">,
    method: "GET" | "POST"
  ) {
    const response = await fetch(NAME_TO_URL[name], {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: NAME_TO_QUERY[name] }),
    });

    const obj = await response.json();
    const poolData = obj?.data?.[NAME_TO_QUERY_TITLE[name]];
    return poolData;
  }

  static async #getFromContract(/* address: Address */) {
    // const contract = new Contract(address, poolABI);
  }

  static async get([name, address]: ParamsGet): Promise<
    any[] | {} | undefined
  > {
    if (name === "tvlPool" && !address) {
      throw Error("Address required for PoolDataService get tvlPool");
    }

    const nameToFunction: { [key in PoolDataName]: (...values: any[]) => any } =
      {
        pools: async () => await this.#getFromAPI(name as "pools", "POST"),
        prices: async () => await this.#getFromAPI(name as "prices", "GET"),
        tvlTotal: async () => await this.#getFromAPI(name as "tvlTotal", "GET"),
        tvlPool: async () => await this.#getFromContract(/* address! */),
      };

    const poolData = await nameToFunction[name]();
    return poolData;
  }
}
