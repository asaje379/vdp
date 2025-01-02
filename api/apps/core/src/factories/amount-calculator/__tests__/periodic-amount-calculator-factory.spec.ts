import { PeriodicAmountCalculatorFactory } from '../periodic-amount-calculator.factory';

describe('Percent Amount calculator factories test', () => {
  it('should return valid result for 100', () => {
    const amountCalculator = new PeriodicAmountCalculatorFactory(2000, 10);
    const result = amountCalculator.execute();

    console.log(result);

    expect(result.benefice).toBe(2000);
    expect(result.periodSize).toBe(10);
    expect(result.totalAmount).toBe(22000);
    expect(result.totalAmountToGive).toBe(20000);
    expect(result.unitAmount).toBe(2000);
    expect(result.unitAmountWithFees).toBe(2200);
  });
});
