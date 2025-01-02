import { BaseAmountCalculator } from './base/base-amount-calculator';
import { BaseAmountCalculatorFactory } from './base/base-amount-calculator.factory';

export class PeriodicAmountCalculatorFactory
  extends BaseAmountCalculator
  implements BaseAmountCalculatorFactory
{
  private percent: number;

  constructor(unitAmount: number, periodSize: number, percent = 7.5) {
    super({ unitAmount, periodSize });
    this.percent = percent;
    this.setup();
  }

  setup() {
    const percent = Math.ceil(this.unitAmount * (this.percent / 100));
    this.unitAmountWithFees = this.unitAmount + percent;
    this.totalAmountToGive = this.unitAmount * this.periodSize;
    this.totalAmount = this.unitAmountWithFees * this.periodSize;
  }
}
