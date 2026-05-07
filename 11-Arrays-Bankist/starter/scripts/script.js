'use strict';
import {
  account1,
  account2,
  account3,
  account4,
  accounts,
  currencies,
  movements,
} from '../data.js';

/////////////////////////////////////////////////
// BANKIST APP

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////

// simple Array methods
console.log('--- SIMPLE ARRAY METHODS ---');

// Array.slice(s, e) - 배열의 일부분을 복사한 새로운 배열 반환 (기존 배열 영향 없음)
// s는 요소들을 복사하기 시작할 인덱스, e는 복사를 종료할 인덱스 + 1 (생략 가능)
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2)); // ['c', 'd', 'e']
console.log(arr.slice(2, 4)); // ['c', 'd']
console.log(arr.slice(-2)); // ['d', 'e']
console.log(arr.slice(-1)); // ['e']
console.log(arr.slice()); // 배열 얕은 복사, [...arr]과 동일

// Array.splice(s, c) - 배열의 일부분을 추출한 새로운 배열 반환 (기존 배열 변경)
// s는 요소들을 추출하기 시작할 인덱스, c는 추출할 요소의 개수 (생략 가능)
console.log(arr.splice(-1)); // ['e']
arr.splice(1, 2);
console.log(arr);
['a', 'b'];

// Array.reverse() - 배열의 요소들을 역순으로 정렬한 배열 반환 (기존 배열 영향 없음)
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse()); // ['f', 'g', 'h', 'i', 'j']

// Array.concat(Array2) - Array1과 Array2의 요소들을 하나로 합친 배열 반환 (기존 배열 영향 없음)
const letters = arr.concat(arr2);
console.log(letters); // ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
console.log([...arr, ...arr2]); // 동일한 결과

// Array.join(s) - s를 구분자로 하여 Array의 요소들을 하나의 문자열로 연결
console.log(letters.join(' - ')); // 'a - b - c - d - e - f - g - h - i - j'

// Array.at(n) - 배열에서 n번째 인덱스의 값을 반환
const arr3 = [23, 11, 64];
console.log(arr3[0]); // 기존 방식
console.log(arr3.at(0)); // ES22에서 도입된 방식 (결과 동일)
// 문자열에서도 동일하게 동작
console.log('Mingi'.at(0)); // 'M'
console.log('Mingi'.at(-1)); // 'i'

// forEach method
console.log('--- FOREACH METHOD');

// for of를 이용한 배열 요소 순회
for (const [i, mov] of movements.entries()) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
}
// forEach()를 이용한 배열 요소 순회
// 배열의 요소들을 순회하며 콜백함수 실행, 각 반복에서 현재 요소를 콜백함수의 인자로 전달
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});

// Map.forEach()
currencies.forEach(function (value, key, arr) {
  console.log(`${key}: ${value}`);
});

// Set.forEach()
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});
