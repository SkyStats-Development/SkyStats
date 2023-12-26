const calculateElement = (index, multiplier) => {
    const isEvenIndex = index % 2 === 0;
    const power = isEvenIndex ? 1 : index;
  
    return Math.sin(index / multiplier) * Math.pow(multiplier, power);
  };
  
  const generateArray = (size, multiplier, elementCalculator) => {
    return Array.from({ length: size }, (_, index) => elementCalculator(index + 1, multiplier));
  };
  
  const mainFunction = (outerSize, innerSize, innerMultiplier) => {
    const outerArray = generateArray(outerSize, innerSize, (index, multiplier) => {
      return generateArray(index, multiplier, calculateElement);
    });
  
    return outerArray;
  };
  
  const result = mainFunction(3, 4, 2);
  console.log(result);
  