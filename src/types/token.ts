import { Address, ChainId } from './core';

export interface TokenData {
  symbol: TokenSymbol;
  name: string;
  address: Address;
  decimals: number;
  chainId: ChainId;
  logoURI?: string;
  isFavorite?: boolean;
  equals?: (other: any) => boolean;
  sortsBefore?: (other: any) => boolean;
}

export type TokenSymbol = string;

export interface TokenDataMinimal {
  name: string;
  symbol: string;
  address: string;
}

export interface TokenDataByChain {
  [chainId: number]: TokenData[];
}
