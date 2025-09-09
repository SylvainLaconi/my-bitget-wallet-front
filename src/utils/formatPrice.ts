export function formatPrice(nbOfDigits: number, num?: number | null) {
  return parseFloat(Number(num ?? 0).toPrecision(nbOfDigits));
}
