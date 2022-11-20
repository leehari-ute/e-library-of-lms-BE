const difference = (A, B) => {
  const arrA = Array.isArray(A) ? A.map((x) => x.toString()) : [A.toString()];
  const arrB = Array.isArray(B) ? B.map((x) => x.toString()) : [B.toString()];

  const result = [];
  arrA.forEach((item) => {
    if (arrB.indexOf(item) === -1) {
      result.push(item);
    }
  });

  return result;
};

module.exports = difference;
