export function availableState(stateValue: string): number {
  const stateValueToLower = stateValue.toLowerCase();

  switch (stateValueToLower) {
    case "available":
      return 8;
    case "sold out":
      return 3;
    case "delivery expected":
      return 5;
    default:
      return 9;
  }
}
