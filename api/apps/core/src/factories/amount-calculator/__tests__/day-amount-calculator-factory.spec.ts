import { DayAmountCalculatorFactory } from '../day-amount-calculator.factory';

describe('Day Amount calculator factories test', () => {
  it('should return valid result for 100', () => {
    const amountCalculator = new DayAmountCalculatorFactory(100);
    const result = amountCalculator.execute();

    console.log(result);

    expect(result.benefice).toBe(100);
    expect(result.periodSize).toBe(31);
    expect(result.totalAmount).toBe(3100);
    expect(result.totalAmountToGive).toBe(3000);
    expect(result.unitAmount).toBe(100);
    expect(result.unitAmountWithFees).toBe(100);
  });
});
