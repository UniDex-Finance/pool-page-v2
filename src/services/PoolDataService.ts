import { PoolDataName } from "../types";

const NAME_TO_URL: { [key in PoolDataName]: string } = {
  pools: "https://arkiver.moltennetwork.com/graphql",
  prices: "https://coins.llama.fi/prices/current",
  tvl: "https://api.llama.fi/tvl/unidex",
};

const NAME_TO_QUERY_TITLE: { [key in PoolDataName]: string } = {
  pools: "TokenInfos",
  prices: "",
  tvl: "",
};

const NAME_TO_QUERY: { [key in PoolDataName]: string } = {
  pools: `
    query GetTokenInfos {
      TokenInfos {
        chainId
        symbol
      }
    }
  `,
  prices: "",
  tvl: "",
};

export default class {
  static async fetchPoolData(name: PoolDataName) {
    const response = await fetch(NAME_TO_URL[name], {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: NAME_TO_QUERY[name] }),
    });

    const obj = await response.json();
    const poolDataList = obj?.data?.[NAME_TO_QUERY_TITLE[name]];
    return poolDataList;
  }
}
