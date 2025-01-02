import { BaseAmountCalculator } from './base/base-amount-calculator';
import { BaseAmountCalculatorFactory } from './base/base-amount-calculator.factory';

export class DayAmountCalculatorFactory
  extends BaseAmountCalculator
  implements BaseAmountCalculatorFactory
{
  constructor(unitAmount: number) {
    super({ unitAmount, periodSize: 31 });
    this.setup();
  }

  setup() {
    this.totalAmountToGive = this.unitAmount * (this.periodSize - 1);
    this.totalAmount = this.unitAmount * this.periodSize;
    this.unitAmountWithFees = this.unitAmount;
  }
}
