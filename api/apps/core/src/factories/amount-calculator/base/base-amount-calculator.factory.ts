export interface AmountCalculatorResult {
  unitAmount: number;
  unitAmountWithFees: number;
  totalAmountToGive: number;
  totalAmount: number;
  benefice: number;
  periodSize: number;
}

export interface BaseAmountCalculatorFactory {
  execute: () => AmountCalculatorResult;
}
