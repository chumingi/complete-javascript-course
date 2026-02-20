// Linking a JavaScript File
let js = "amazing";
if (js === 'amazing') alert("JavaScript is fun");
console.log(40 + 8 + 23 - 10);

let javaScriptIsFun = true;
console.log(javaScriptIsFun);
console.log(typeof javaScriptIsFun);
console.log(typeof "javaScriptIsFun");

let year;
console.log(typeof year);
year = 2026;
console.log(typeof year);
console.log(null);

// let
let age = 80;
age = 23;  // mutate

// const
const birthYear = 2004;
// birthYear = 2026;  // Uncaught TypeError: assignment to constant variable

// 연산자
const now = 2026;
const ageOfJonas = now - 1991;
const ageOfSarah = now - 2001;
console.log(ageOfJonas, ageOfSarah);
console.log(ageOfJonas * 2, ageOfJonas / 2 ** 3);
console.log("Chu" + " " + "Mingi");

let x = 10 + 5; // 15
x += 10;  // 25
x *= 4;  // 4
x++;  // x = x + 1, 101
x--;  // 100
console.log(x);

// string and backtick
const myName = 'Mingi';
const myJob = 'student';
const myBirthYear = 2004;
const mingi = "I'm " + myName + ", a " + (now - myBirthYear) + "years old " + myJob;
console.log(mingi);
const mingiNew = `I'm ${myName}, a ${now-myBirthYear}years old ${myJob}!`;
console.log(mingiNew);
console.log(`String
  multiple
  lines!`);

const sarahAge = 19;
const isOldEnough = sarahAge >= 18;
if (isOldEnough) {
  console.log("sarah can start driving license");
} else {
  const yearsLeft = 18 - sarahAge;
  console.log(`Sarah is too young. Wait another ${yearsLeft} years :)`);
}

// 타입 변환
const inputYear = '1991';
console.log(Number(inputYear) + 18);  // 2009
console.log(inputYear + 18);  // 199118
console.log(Number("jonas"));  // NaN
console.log(String(2003));  // 2003 (string)

// ㅠㅐㅐㅣㄷ무 xkdlq qusghks
console.log(Boolean(0));  // false
console.log(Boolean(undefined));  // false
console.log(Boolean(""));  // false
console.log(Boolean("jonas"));  // true

// 타입 강제
console.log(2026 + "year");  // 2026year (number -> string)
console.log("23" - "10" - 3);  // 10 (string -> number)
console.log(23 * "2");  // 46
console.log(23 / "2");  // 11.5

// 논리 연산자
const hasDriversLicense = true;
const hasGoodVision = false;
console.log(hasDriversLicense && hasGoodVision);  // false;
console.log(hasDriversLicense || hasGoodVision);  // true;
console.log(!hasDriversLicense);  // false

const tired = true;
const shouldDrive = hasDriversLicense && hasGoodVision && !tired;
if (shouldDrive) {
  console.log("Sarah is able to drive!!");
} else {
  console.log("Someone else should drive...");
}

// switch
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
console.log(drink);