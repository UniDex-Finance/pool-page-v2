import { ethers } from "ethers";

export function toBytes32(value: string) {
  return ethers.utils.formatBytes32String(value);
}

export function fromBytes32(value: string) {
  return ethers.utils.parseBytes32String(value);
}

// Data formatters
export function formatUnits(
  number: ethers.BigNumberish,
  units: ethers.BigNumberish | undefined
) {
  return ethers.utils.formatUnits(number || 0, units || 8);
}

export function parseUnits(
  num: string,
  units?: ethers.BigNumberish | undefined
) {
  return ethers.utils.parseUnits(num, units || 8);
}

export function roundAndFloor(
  value: number,
  fractionDigits: number | undefined
) {
  const scale = 10 ** (fractionDigits || 0);
  const fixed = Math.floor(value * scale) / scale;

  // remove trailing zeros
  return parseFloat(fixed.toString()).toString();
}

export function parseUnitsSafe(amount: string, decimals: number | undefined) {
  return parseUnits(
    // round to avoid ethers Error: fractional component exceeds decimals
    roundAndFloor(parseFloat(amount || "0") || 0, decimals),
    decimals
  );
}

export function getPositionKey(
  user: string,
  productId: string,
  currency: string,
  isLong: boolean
): string {
  const types = ["address", "bytes32", "address", "bool"];
  const pack = ethers.utils.solidityPack(types, [
    user,
    productId,
    currency,
    isLong,
  ]);
  return ethers.utils.solidityKeccak256(["address"], [pack]);
}

export function getURLSearchParam(name: "ref") {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const searchParam = params.get(name);
  return searchParam;
}
