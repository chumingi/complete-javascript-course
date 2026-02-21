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