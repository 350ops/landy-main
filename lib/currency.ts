const USD_TO_QAR = 3.64;

const qarFormatter = new Intl.NumberFormat("en-QA", {
  style: "currency",
  currency: "QAR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function convertUsdToQar(amountUsd: number): number {
  return amountUsd * USD_TO_QAR;
}

export function formatQar(amountUsd: number): string {
  return qarFormatter.format(convertUsdToQar(amountUsd));
}

export function formatQarFromFollowers(followers: number, pricePerFollowerUsd: number): string {
  return formatQar(followers * pricePerFollowerUsd);
}
