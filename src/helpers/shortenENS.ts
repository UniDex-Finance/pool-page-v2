export default function shortenENS(ens: string) {
  if (ens.length <= 10) {
    return ens;
  }

  const begin = ens.slice(0, 3);
  const end = ens.slice(-6);
  return `${begin}...${end}`;
}
