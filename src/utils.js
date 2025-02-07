const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };
  
  const isPerfect = (num) => {
    if (num < 2) return false;
    let sum = 1;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        sum += i;
        if (i !== num / i) sum += num / i;
      }
    }
    return sum === num;
  };
  
  const isArmstrong = (num) => {
    const digits = String(num).split("");
    const sum = digits.reduce((acc, digit) => acc + Math.pow(Number(digit), digits.length), 0);
    return sum === num;
  };
  
  const getDigitSum = (num) => {
    return String(num)
      .split("")
      .reduce((acc, digit) => acc + Number(digit), 0);
  };


const classifyNumber = (num) => {
    const properties = [];

    if (isArmstrong(num)) {
        properties.push('armstrong');
    }

    properties.push(num % 2 === 0 ? 'even' : 'odd');

    return {
        isPrime: isPrime(num),
        isPerfect: isPerfect(num),
        properties,
        digitSum: getDigitSum(num)
    };
};

module.exports = { classifyNumber };
