import { Frequency } from '@prisma/client';
import { DayAmountCalculatorFactory } from '../../factories/amount-calculator/day-amount-calculator.factory';
import { PeriodicAmountCalculatorFactory } from '../../factories/amount-calculator/periodic-amount-calculator.factory';

export const frequencyMapping = {
  [Frequency.DAY]: (amount: number) => new DayAmountCalculatorFactory(amount),

  [Frequency.WEEK]: (amount: number, periodSize: number) =>
    new PeriodicAmountCalculatorFactory(amount, periodSize),

  [Frequency.MONTH]: (amount: number, periodSize: number) =>
    new PeriodicAmountCalculatorFactory(amount, periodSize),
};
