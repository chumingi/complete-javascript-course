'use strict';
import { game } from './coding_challenge_1.js';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will delever to ${address} at ${time}`,
    );
  },
};

// Array destructuring
const arr = [2, 3, 4];
const a = arr[0]; // 2
const b = arr[1]; // 3
const c = arr[2]; // 4
const [x, y, z] = arr; // [2, 3, 4]
console.log(a, b, c, x, y, z);

// switching variables using destructuring
// const [main, secondary] = restaurant.categories;
let [main, , secondary] = restaurant.categories; // 공백 값을 통해 중간 값 건너뛰기 가능
console.log(main, secondary); // Italian Vegetarian
const tmp = main;
main = secondary;
secondary = tmp;
console.log(main, secondary); // Vegetarian Italian
[main, secondary] = [secondary, main];
console.log(main, secondary); // Italian Vegetarian

// function return destructuring
const [starterCourse, mainCourse] = restaurant.order(2, 2);
console.log(starterCourse, mainCourse); // Garlic Bread Risotto

// nested array destructuring
const nested = [2, 4, [5, 6]];
const [i, , [j, k]] = nested;
console.log(i, j, k); // 2 5 6

// Object destructuring
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant; // 변수명 지정해도 결과 동일
console.log(restaurantName, hours, tags);
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// mutating variable while object destructuring
let aa = 111;
let bb = 999;
const obj1 = { aa: 23, bb: 14 };
({ aa, bb } = obj1);
// 괄호로 감싸지 않으면 Unexpected Token Error 발생
console.log(aa, bb); // 23 14

// nested object destructuring
const {
  fri: { open: o, close: cl },
} = openingHours;
console.log(o, cl);

// function argument destructuring
restaurant.orderDelivery({
  time: '20:30',
  address: 'via del sole, 21',
  mainIndex: 2,
  starterIndex: 2,
}); // 모든 파라미터를 작성하는 대신, 하나의 파라미터(객체) 전달, 4개의 변수를 인자로 받아 사용 가능
restaurant.orderDelivery({
  address: 'via del sole, 21',
}); // 인자로 받을 변수의 default 값 설정 가능

// spread operator (...)
// 객체나 iterable(Array, String, Map, Set) 내의 요소들을 풀어서 개별로 확장해주는 문법
// 새 배열/객체 생성 또는 함수에 파라미터로 전달

const originalArr = [7, 8, 9];
const badNewArr = [1, 2, originalArr[0], originalArr[1], originalArr[2]]; // [1, 2, 7, 8, 9]
const goodNewArr = [1, 2, ...originalArr]; // [1, 2, 7, 8, 9]
console.log(originalArr, badNewArr, goodNewArr);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// copy array
const mainMenuCopy = [...restaurant.mainMenu];
console.log(mainMenuCopy);

// join arrays
const menuJoin = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menuJoin);

// string
const str = 'Mingi';
const letters = [...str, ' ', 's'];
console.log(letters); // ['M', 'i', 'n', 'g', 'i', ' ', 's']
// template literals 내에서는 사용 불가
// console.log(`${...str}`);  // Unexpected token '...'

// 함수에 파라미터로 여러 변수 전달
restaurant.orderPasta = function (inc1, inc2, inc3) {
  console.log(`Here is your delicious pasta with ${inc1}, ${inc2} and ${inc3}`);
};
const ingredients = ['mushrooms', 'aspargus', 'cheese'];
restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
restaurant.orderPasta(...ingredients);

// 객체에서의 spread operator (ES2018 이후)
const newRestaurant = { foundedYear: 1991, ...restaurant };
console.log(newRestaurant);

//
const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurant.name, restaurantCopy.name);

// Rest Pattern
// 여러 요소를 수집하여 하나의 배열로 압축하는 문법

const [fir, sec, ...others] = [1, 2, 3, 4, 5];
console.log(others);

// 마지막 요소 이후의 모든 요소 수집, skip된 요소는 제외
const [pizza, , risotto, ...otherFoods] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(otherFoods);

// 객체에서의 rest pattern
const { sat, ...weekdays } = { ...restaurant.openingHours };
console.log(weekdays);

// rest parameters
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(numbers, sum);
};
add(2, 3);
add(5, 6, 8);
add(1, 8, 2, 9, 2);
const nums = [23, 5, 19];
add(...nums);

//
restaurant.orderPizza = function (mainIngredient, ...otherIngredients) {
  console.log(mainIngredient, otherIngredients);
};
restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spanich');
restaurant.orderPizza('mushrooms');

// short circuiting (&& and ||)

// || - 첫 연산 대상이 참이면 || 뒤는 보지 않음
console.log('--- OR ---');
console.log(3 || 'mingi'); // 3
console.log('' || 'mingi'); // 'mingi'
console.log(undefined || null); // null
console.log(0 || '' || 'Hello' || 23 || null); // 'Hello'

// 삼항 연산자 대신 || 사용 가능
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1); // 10
restaurant.numGuests = 15;
const guests2 = restaurant.numGuests || 10;
console.log(guests2); // 15
restaurant.numGuests = 0;
const guests3 = restaurant.numGuests || 10;
console.log(guests3); // 10

// && - 첫 연산 대상이 거짓이면 && 뒤는 보지 않음
console.log('--- AND ---');
console.log(0 && 'mingi'); // 0
console.log(2 && 'mingi'); // 'mingi'
console.log(23 && 'Hello' && null && 0); // null

// if 조건문 대신 && 사용 가능
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushroom', 'spinach');
}
restaurant.orderPizza && restaurant.orderPizza('mushroom', 'spinach');

// Nullishing Coalescing Operator (??)
// || 연산자에서 0과 ''도 flase로 처리하는 문제 해결

restaurant.guestCorrect = 0;
const guestCorrect = restaurant.guestCorrect ?? 10;
console.log(guestCorrect); // 0

// Logical Assignment Operators

const rest1 = {
  name: 'Capri',
  numGuests: 20,
};
const rest2 = {
  name: 'La Pizza',
  owner: 'Chu Mingi',
};

// OR assignment operator (||=)
// rest1.numGuests = rest1.numGuests || 10;
rest1.numGuests ||= 10;
// rest2.numGuests = rest2.numGuests || 10;
rest2.numGuests ||= 10;
console.log(rest1.numGuests, rest2.numGuests); // 20 10

// NULLISH assignment operator (??=)
rest1.numGuests = 0;
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;
console.log(rest1.numGuests, rest2.numGuests); // 0 10

// AND assignment operator (&&=)
// rest1.owner = rest1.owner && '<ANOYMOUS>';
rest1.owner &&= '<ANOYMOUS>';
// rest2.owner = rest2.owner && '<ANOYMOUS>';
rest2.owner &&= '<ANOYMOUS>';
console.log(rest1.owner, rest2.owner); // undefined <ANOYMOUS>

// for of loop
// 전체 배열을 자동으로 반복하고, 각 반복에서 현재 배열 요소에 대한 엑세스 권한 부여
console.log('--- FOR OF LOOP ---');
const menu1 = [...restaurant.mainMenu, ...restaurant.starterMenu];
for (const item of menu1) console.log(item);

// .entries() 함수를 이용하여 [인덱스, 요소] 형태로 반복
// for (const item of menu1.entries()) {
for (const [i, e] of menu1.entries()) {
  // item => [i, e]로 구조분해
  console.log(`${i + 1}: ${e}`);
}

// enhanced object literal
// ES6에서는 object literal을 더 쉽게 작성할 수 있는 3가지 방법 도입

// 1. 한 객체를 다른 객체의 요소로 사용할 때
// 속성명과 값에 같은 이름 사용하여 중복되는 문제 해결
/* ES6 이전
const openingHours = {...}
const restaurant = {
  ...
  openingHours: openingHours
}
*/
/* ES6 이후
const openingHours = {...}
const restaurant = {
  ...
  openingHours
}
*/

// 2. 메소드를 생성할 때
// 함수 표현식을 더 간단하게 작성 가능
/* ES6 이전
const restaurant = {
  ...
  order: function(starterIndex, mainIndex) {...}
}
*/
/* ES6 이후
const restaurant = {
  ...
  order(starterIndex, mainIndex) {...}
}
*/

// 속성명을 작성할 때
// 문자 그대로 작성하지 않고 연산 가능
/* ES6 이전
const openingHours = {
  thu: {...},
  fri: {...},
  sat: {...},
}
*/
/* ES6 이후
const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
const openingHours = {
  [weekdays[3]]: {...}, // thu
  [weekdays[4]]: {...}, // fri
  [weekdays[5]]: {...}, // sat
  [`day-${2 + 4}`]: {...}, // day-6
}
*/

// optional chaining (?.)
// 특정 속성이 존재하지 않으면 (null 또는 undefined), undefined를 즉시 반환하여 에러 방지
// null 또는 undefined이기 때문에, nullish operator (??)와 함께 사용 가능

console.log('--- OPTIONAL CHAINING ---');
if (restaurant.openingHours && restaurant.openingHours.mon) {
  console.log(restaurant.openingHours.mon.open);
}
// optional chaining을 이용한 간략화
console.log(restaurant.openingHours?.mon?.open); // undefined

// real world example
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 9;
  console.log(`On ${day}, we open at ${open}`);
}

// 메소드가 존재하는지 확인하고 호출
console.log(restaurant.orderRisotto?.(0, 1) ?? 'method does not exist'); // undefined 반환, method does not exist 출력

// 배열이 비어있는지 확인
const users = [
  { name: 'Jonas', email: 'hello@jonas.io' },
  { name: 'Mingi', email: 'chumingi794gmail.com' },
];
if (users.length >= 0) {
  console.log(users[0].name);
} else {
  console.log('users array empty');
}
// optional chaining을 이용한 간략화
console.log(users[0]?.name ?? 'users array empty');

// looping objects - object keys, values, entries

console.log('--- LOOPING OBJECTS ---');

// .keys() - 속성명을 이용한 반복
const properties = Object.keys(openingHours);
console.log(properties); // ['thu', 'fri', 'sat']
let openStr = `We are open on ${properties.length}, day: `;
for (const day of Object.keys(openingHours)) {
  openStr += `${day}, `;
}
console.log(openStr);

// .values() - 속성값을 이용한 반복
const values = Object.values(openingHours);
console.log(values);

// .entries() - 속성명 + 속성값을 이용한 반복
const entreis = Object.entries(openingHours);
console.log(entreis);
for (const [day, { open, close }] of entreis) {
  console.log(`On ${day} we open at ${open} and close at ${close}`);
}

// coding challenge #2

console.log('--- CODING CHALLENGE #2 ---');

// 1
for (const [i, player] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${player}`);
}

// 2
const odds = Object.values(game.odds);
let average = 0;
for (const odd of odds) {
  average += odd;
}
average /= odds.length;
console.log(average);

// 3
for (const [team, odd] of Object.entries(game.odds)) {
  const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
  console.log(`Odd of ${teamStr}: ${odd}`);
}
