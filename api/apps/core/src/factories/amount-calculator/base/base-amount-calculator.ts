export interface AmountCalculatorArgs {
  unitAmount: number;
  periodSize?: number;
}

export class BaseAmountCalculator {
  protected unitAmount: number;
  protected unitAmountWithFees: number;
  protected periodSize: number;
  protected totalAmountToGive: number;
  protected totalAmount: number;

  constructor({ unitAmount, periodSize }: AmountCalculatorArgs) {
    this.unitAmount = isNaN(+unitAmount) ? 0 : +unitAmount;
    this.periodSize = isNaN(+periodSize) ? 31 : +periodSize;
  }

  get benefice() {
    return (this.totalAmount ?? 0) - (this.totalAmountToGive ?? 0);
  }

  execute() {
    return {
      unitAmount: this.unitAmount,
      unitAmountWithFees: this.unitAmountWithFees,
      totalAmountToGive: this.totalAmountToGive,
      totalAmount: this.totalAmount,
      benefice: this.benefice,
      periodSize: this.periodSize,
    };
  }
}
