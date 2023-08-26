function maturityFinalBalance({ depositAmount, interestRate, investmentMonths }) {
  const finalBalance = depositAmount + (depositAmount * interestRate * (investmentMonths / 12));
  return Math.round(finalBalance).toFixed(0);
}

function compoundFinalBalance({ depositAmount, interestRate, maxPaymentsPerYear, investmentMonths }) {
  const finalBalance = depositAmount * (( 1 + ( interestRate / maxPaymentsPerYear)) ** ((investmentMonths / 12) * maxPaymentsPerYear ));
  return Math.round(finalBalance).toFixed(0);
}

export function calculateFinalBalance({ depositAmount, interestRate, investmentMonths, maxPaymentsPerYear, isCompound }) {
  if(!isCompound) {
    return maturityFinalBalance({ depositAmount, interestRate, investmentMonths });
  }
  return compoundFinalBalance({ depositAmount, interestRate, maxPaymentsPerYear, investmentMonths });
}