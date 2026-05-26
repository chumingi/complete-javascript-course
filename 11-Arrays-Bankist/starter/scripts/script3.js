import { movements } from '../data.js';

// Array.map((cur, i, arr) => {}) - 원본 배열의 각 요소를 순회하며, 각 요소에 콜백 함수를 적용한 새로운 배열 반환
// cur: 현재 요소, i: 인덱스, arr: 전체 배열
console.log(' --- MAP METHOD --- ');

// map 방식
const eurToUsd = 1.1;
const movementsUSD = movements.map(function (mov) {
  return mov * eurToUsd;
  // return 23;  // 모든 요소가 23인 새 배열 반환
});

console.log(movements);
console.log(movementsUSD);

// for of 방식
const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSDfor);

// 화살표 함수를 이용한 map 방식
const movementsUSDarrow = movements.map(mov => mov * eurToUsd);
console.log(movementsUSDarrow);

// map()의 3개 파라미터 (값, 인덱스, 전체 배열)
const movementsDescription = movements.map((mov, i, arr) => {
  if (mov > 0) {
    return `Movement ${i + 1}: You deposited ${mov}`;
  } else {
    return `Movement ${i + 1}: You withdrew ${Math.abs(mov)}`;
  }
});
console.log(movementsDescription);

// Array.filter((cur, i, arr) => {}) - 원본 배열의 각 요소를 순회하며, 조건에 맞는 요소들을 모은 새로운 배열 반환
// cur: 현재 요소, i: 인덱스, arr: 전체 배열
console.log(' --- FILTER METHOD --- ');

const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

// for of 방식
const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

// 화살표 함수 방식
const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

// Array.reduce((acc, cur, i, arr) => {}, initialValue) - 배열의 각 요소를 하나로 압축한 결과값을 반환
// acc: 누적된 값, cur: 현재 요소, i: 인덱스, arr: 전체 배열, initialValue: 초기값 (생략 시 배열의 첫 번째 요소가 초기값이 됨)
console.log(' --- REDUCE METHOD --- ');

const balance = movements.reduce(function (acc, cur, i, arr) {
  console.log(`Acc: ${acc}, Cur: ${cur}`);
  return acc + cur;
}, 0);
console.log(balance);

// for of 방식
let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

// 화살표 함수 방식
const balance3 = movements.reduce((acc, mov) => acc + mov, 0);
console.log(balance3);

// reduce()를 이용한 배열의최댓값 반환
const max = movements.reduce(function (acc, mov) {
  if (acc > mov) {
    return acc;
  } else {
    return mov;
  }
}, movements[0]);
console.log(max);

// coding challenge #2
console.log(' --- CODING CHALLENGE #2 WITH LEARNER --- ');

const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  console.log(humanAges);
  const adultHumanAges = humanAges.filter(age => age >= 18);
  console.log(adultHumanAges);
  // const averageHumanAge = adultHumanAges.reduce((acc, age) => acc + age, 0) / adultHumanAges.length;
  const averageHumanAge = adultHumanAges.reduce(
    (acc, age, i, arr) => acc + age / arr.length,
    0,
  );
  return averageHumanAge;
};

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);

// coding challenge #3
console.log(' --- CODING CHALLENGE #3 WITH LEARNER --- ');

const calcAverageHumanAge2 = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0); // adults.length

const avg1 = calcAverageHumanAge2([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge2([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);
