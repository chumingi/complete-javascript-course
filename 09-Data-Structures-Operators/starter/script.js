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
