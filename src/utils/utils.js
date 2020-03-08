const getRroundNumberInteger = num => {
  return Math.round(num);
};

const getRroundNumberMoney = num => {
  return Math.round(num * 100) / 100;
};

const getBudgetAmountPerDay = (budgetAmountStr, budgetTimeDuration) => {
  if (budgetAmountStr == null || budgetTimeDuration == null) {
    return null;
  }
  switch (budgetTimeDuration.text) {
    case "YEAR":
      return parseFloat(budgetAmountStr) / 365;
    case "QUARTER":
      return parseFloat(budgetAmountStr) / 91;
    case "MONTH":
      return parseFloat(budgetAmountStr) / 30;
    case "WEEK":
      return parseFloat(budgetAmountStr) / 7;
    default:
      return parseFloat(budgetAmountStr);
  }
};

export {getRroundNumberInteger, getRroundNumberMoney, getBudgetAmountPerDay};
