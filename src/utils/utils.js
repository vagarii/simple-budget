const getRroundNumberInteger = num => {
  return Math.round(num);
};

const getRroundNumberMoney = num => {
  return Math.round(num * 100) / 100;
};

const getBudgetAmountPerDay = (budgetAmountStr, budgetDuration) => {
  if (budgetAmountStr == null || budgetDuration == null) {
    return null;
  }
  switch (budgetDuration) {
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

const getTotalTargetBudget = (
  isRandomRange,
  budgetAmount,
  budgetDuration,
  daysInRange,
  budgetAmountPerDay
) => {
  if (isRandomRange) {
    return daysInRange * budgetAmountPerDay;
  }
  if (daysInRange == 7) {
    // WEEK
    switch (budgetDuration) {
      case "Week":
        return budgetAmount;
      default:
        return daysInRange * budgetAmountPerDay;
    }
  } else if (28 <= daysInRange && daysInRange <= 31) {
    // MONTH
    switch (budgetDuration) {
      case "MONTH":
        return budgetAmount;
      case "QUARTER":
        return budgetAmount / 3;
      case "YEAR":
        return budgetAmount / 12;
      default:
        return daysInRange * budgetAmountPerDay;
    }
  } else if (120 <= daysInRange && daysInRange <= 122) {
    // QUARTER
    switch (budgetDuration) {
      case "MONTH":
        return budgetAmount * 3;
      case "QUARTER":
        return budgetAmount;
      case "YEAR":
        return budgetAmount / 4;
      default:
        return daysInRange * budgetAmountPerDay;
    }
  } else if (daysInRange == 365 || daysInRange == 366) {
    // YEAR
    switch (budgetDuration) {
      case "MONTH":
        return budgetAmount * 12;
      case "QUARTER":
        return budgetAmount * 4;
      case "YEAR":
        return budgetAmount;
      default:
        return daysInRange * budgetAmountPerDay;
    }
  } else {
    return daysInRange * budgetAmountPerDay;
  }
};

export {
  getRroundNumberInteger,
  getRroundNumberMoney,
  getBudgetAmountPerDay,
  getTotalTargetBudget
};
