// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
*/

console.log(' --- CODING CHALLENGE #3 BY MYSELF FIRST --- ');

/* 아이디어
  - 함수에 전달받은 ages 배열의 모든 요소에 대하여, 조건별 공식을 이용하여 인간 나이로 환산한다. (map)
  - 변환한 인간 나이 중 18 이상인 것들만 반환한 새 배열을 만든다. (filter)
  - 인간 ㄴ아ㅣ 18 이상인 요소들의 평균을 구한다. (reduce)
*/

const calcAverageHumanAge = function (ages) {
  return ages
    .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
};

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3])); // Expected output: 4
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4])); // Expected output: 4
