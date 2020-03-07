const getRroundNumberInteger = num => {
  return Math.round(num);
};

const getRroundNumberMoney = num => {
  return Math.round(num * 100) / 100;
};

export {getRroundNumberInteger, getRroundNumberMoney};
