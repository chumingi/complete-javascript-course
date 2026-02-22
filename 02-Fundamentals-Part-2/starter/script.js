// strict 모드
'use strict';
let hasDriversLicense = false;
const passTest = true;
// if (passTest) hasDriverLicense = true;  // Uncaught ReferenceError
if (hasDriversLicense) console.log('I can drive :D');
// const interface = 'Audio';  // Uncaught SyntaxtError: Unexpected strict mode reserved word

// function
function logger() {
    console.log("My name is Mingi");
}
logger();
logger();
logger();

function fruitProcessor(apples, oranges) {
    console.log(apples, oranges);
    const juice = `Juice with ${apples} apples and ${oranges} oranges`;
    return juice;
}
const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);
console.log(fruitProcessor(1, 3));

// Function declaration vs expressions
function calcAge(birthYear) {
    return 2026 - birthYear;
}
const calcAge2 = function (birthYear) {
    return 2026 - birthYear;
}
const age1 = calcAge(2004);
const age2 = calcAge2(2004);
console.log(age1, age2);

// arrow function (화살표 함수)
const calcAge3 = birthYear => 2026 - birthYear;
const age3 = calcAge3(2004);
console.log(age3);

const yearsUntilRetirement = (birthYear, firstName) => {
    const age = 2026 - birthYear;
    const retirement = 65 - age;
    if (retirement <= 0) {
        return `${firstName} has already retired.`;
    } else {
        return `${firstName} retires in ${retirement} years`;
    }
}
console.log(yearsUntilRetirement(2004, "Mingi"));
console.log(yearsUntilRetirement(1950, "Mark"));