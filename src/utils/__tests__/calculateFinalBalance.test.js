'use strict';

import { expect, test } from 'vitest';
import { calculateFinalBalance } from '../calculateFinalBalance';

const scenarios = [
  {
    name: 'Interest paid at maturity',
    input: {
      depositAmount: 10000,
      interestRate: 0.011,
      investmentMonths: 36,
      maxPaymentsPerYear: 1,
      isCompound: false,
    },
    expected: '10330',
  },
  {
    name: 'Interest paid monthly for term greater than 1 year',
    input: {
      depositAmount: 80000,
      interestRate: 0.011,
      investmentMonths: 60,
      maxPaymentsPerYear: 12,
      isCompound: true,
    },
    expected: '84521',
  },
  {
    name: 'Interest paid monthly for term less than 1 year',
    input: {
      depositAmount: 80000,
      interestRate: 0.011,
      investmentMonths: 8,
      maxPaymentsPerYear: 12,
      isCompound: true,
    },
    expected: '80589',
  },
  {
    name: 'Interest paid quarterly for term greater than 1 year',
    input: {
      depositAmount: 80000,
      interestRate: 0.011,
      investmentMonths: 60,
      maxPaymentsPerYear: 4,
      isCompound: true,
    },
    expected: '84517',
  },
  {
    name: 'Interest paid quarterly for term less than 1 year',
    input: {
      depositAmount: 80000,
      interestRate: 0.011,
      investmentMonths: 8,
      maxPaymentsPerYear: 4,
      isCompound: true,
    },
    expected: '80588',
  },
  {
    name: 'Interest paid yearly',
    input: {
      depositAmount: 80000,
      interestRate: 0.011,
      investmentMonths: 60,
      maxPaymentsPerYear: 1,
      isCompound: true,
    },
    expected: '84498',
  },
];

scenarios.forEach(({ name, input, expected }) => {
  test(name, () => {
    expect(calculateFinalBalance(input)).toEqual(expected);
  });
});