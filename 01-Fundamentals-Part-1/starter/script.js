// Linking a JavaScript File
console.log('--- VALUES AND VARIABLES ---');

let js = "amazing";
if (js === 'amazing') alert("JavaScript is fun");
console.log(40 + 8 + 23 - 10); // 61

let javaScriptIsFun = true;
console.log(javaScriptIsFun); // true
console.log(typeof javaScriptIsFun); // 'boolean'
console.log(typeof "javaScriptIsFun"); // 'string'

let year;
console.log(typeof year); // 'undefined'
year = 2026;
console.log(typeof year); // 'number'
console.log(null); // null
// let
let age = 80;
age = 23;  // mutate

// const
const birthYear = 2004;
// birthYear = 2026;  // Uncaught TypeError: assignment to constant variable

// 연산자
console.log('--- OPERATORS ---');

const now = 2026;
const ageOfJonas = now - 1991;
const ageOfSarah = now - 2001;
console.log(ageOfJonas, ageOfSarah); // 35 25
console.log(ageOfJonas * 2, ageOfJonas / 2 ** 3); // 70 4.375
console.log("Chu" + " " + "Mingi"); // 'Chu Mingi'

let x = 10 + 5; // 15
x += 10;  // 25
x *= 4;  // 100
x++;  // x = x + 1, 101
x--;  // 100
console.log(x); // 100

// string and backtick
console.log('--- STRINGS AND TEMPLATE LITERALS ---');

const myName = 'Mingi';
const myJob = 'student';
const myBirthYear = 2004;
const mingi = "I'm " + myName + ", a " + (now - myBirthYear) + "years old " + myJob;
console.log(mingi); // "I'm Mingi, a 22years old student"
const mingiNew = `I'm ${myName}, a ${now-myBirthYear}years old ${myJob}!`;
console.log(mingiNew); // "I'm Mingi, a 22years old student!"
console.log(`String
  multiple
  lines!`);

// if / else
console.log('--- IF / ELSE ---');

const sarahAge = 19;
const isOldEnough = sarahAge >= 18;
if (isOldEnough) {
  console.log("sarah can start driving license");
} else {
  const yearsLeft = 18 - sarahAge;
  console.log(`Sarah is too young. Wait another ${yearsLeft} years :)`);
}

// 타입 변환
console.log('--- TYPE CONVERSION ---');

const inputYear = '1991';
console.log(Number(inputYear) + 18);  // 2009
console.log(inputYear + 18);  // '199118'
console.log(Number("jonas"));  // NaN
console.log(String(2003));  // '2003'

// 불리언 (Boolean Truthy/Falsy)
console.log('--- BOOLEAN (TRUTHY / FALSY) ---');

console.log(Boolean(0));  // false
console.log(Boolean(undefined));  // false
console.log(Boolean(""));  // false
console.log(Boolean("jonas"));  // true

// 타입 강제
console.log('--- TYPE COERCION ---');

console.log(2026 + "year");  // '2026year'
console.log("23" - "10" - 3);  // 10
console.log(23 * "2");  // 46
console.log(23 / "2");  // 11.5

// 논리 연산자
console.log('--- LOGICAL OPERATORS ---');

const hasDriversLicense = true;
const hasGoodVision = false;
console.log(hasDriversLicense && hasGoodVision);  // false
console.log(hasDriversLicense || hasGoodVision);  // true
console.log(!hasDriversLicense);  // false

const tired = true;
const shouldDrive = hasDriversLicense && hasGoodVision && !tired;
if (shouldDrive) {
  console.log("Sarah is able to drive!!");
} else {
  console.log("Someone else should drive...");
}

// switch
console.log('--- SWITCH STATEMENT ---');

const day = "Monday";
switch (day) {
  case "Monday":
    console.log("Plan course structure");
    console.log("Go to coding meetup");
    break;
  case "Tuesday":
    console.log("Prepare theory videos");
    break;
  case "Wednesday":
  case "Thursday":
    console.log("Write code examples");
  default:
    console.log("Not a valid day!");
}

// conditional operator
const drink = age >= 18 ? "wine" : "water";
console.log(drink); // 'wine'