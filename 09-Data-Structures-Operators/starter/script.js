'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const italianFoods = new Set([
  'pasta',
  'gnocchi',
  'tomatoes',
  'olive oil',
  'garlic',
  'basil',
]);

const mexicanFoods = new Set([
  'tortillas',
  'beans',
  'rice',
  'tomatoes',
  'avocado',
  'garlic',
]);

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

// Array desturcturing
const arr = [2, 3, 4];
const a = arr[0]; // 2
const b = arr[1]; // 3
const c = arr[2]; // 4
const [x, y, z] = arr; // [2, 3, 4]
console.log(a, b, c, x, y, z);

// switching variables using destructuring
// const [main, secondary] = restaurant.categories;
let [main, , secondary] = restaurant.categories; // 공백 값을 통해 중간 값 건너뛰기 가능
console.log(main, secondary); // Italian Vegiterian
const tmp = main;
main = secondary;
secondary = tmp;
console.log(main, secondary); // Vegiterian Italian
[main, secondary] = [secondary, main];
console.log(main, secondary); // Italian Vegiterian

// function return destructuring
const [starterCourse, mainCourse] = restaurant.order(2, 2);
console.log(starterCourse, mainCourse); // Garlic Bread Rijotto

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
console.log(guests3); // 0

// && - 첫 연산 대상이 거짓이면 && 뒤는 보지 않음
console.log('--- AND ---');
console.log(0 && 'mingi'); // 0
console.log(2 && 'mingi'); // 'mingi
console.log(23 && 'Hello' && null && 0); // null

// if 조검누 대신 && 사용 가능
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

// OR assignment operator (??=)
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

// AND assignment operator (??=)
// rest1.owner = rest1.owner && '<ANOYMOUS>';
rest1.owner &&= '<ANOYMOUS>';
// rest2.owner = rest2.owner && '<ANOYMOUS>';
rest2.owner &&= '<ANOYMOUS>';
console.log(rest1.owner, rest2.owner); // undefined <ANOYMOUS>
