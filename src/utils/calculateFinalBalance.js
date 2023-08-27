'use strict';

function simpleFinalBalance({ depositAmount, interestRate, investmentMonths }) {
  return depositAmount + (depositAmount * interestRate * (investmentMonths / 12));
}

function compoundFinalBalance({ depositAmount, interestRate, maxPaymentsPerYear, investmentMonths }) {
  return depositAmount * (( 1 + ( interestRate / maxPaymentsPerYear)) ** ((investmentMonths / 12) * maxPaymentsPerYear ));
}

export function calculateFinalBalance({ depositAmount, interestRate, investmentMonths, maxPaymentsPerYear, isCompound }) {
  const finalBalance = isCompound ?
    compoundFinalBalance({ depositAmount, interestRate, maxPaymentsPerYear, investmentMonths }) :
    simpleFinalBalance({ depositAmount, interestRate, investmentMonths });
  return Math.round(finalBalance).toFixed(0);
}