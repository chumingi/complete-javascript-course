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

// Array 생성
const friends = ['Michle', 'Steven', 'Peter'];
console.log(friends);
const years = new Array(1991, 2002, 2026);
console.log(years);

// Array 항목에 접근 - 인덱스는 0부터 시작
console.log(friends[0]);  // MIchle
console.log(friends.length);  // 3
console.log(friends[friends.length - 1]);  // Peter

// Array의 항목(element) 변경
friends[2] = "jay";  // 요소 변경
console.log(friends);

// 다양한 타입 저장 가능
const firstName = "Mingi";
const mingi = [firstName, 2004, "Senior in university", friends];
console.log(mingi);
// const calcAge = (birthYear) => 2026 - birthYear;
const birthYears = [1991, 2004, 2020];
const ages = [
    calcAge(birthYears[0]),
    calcAge(birthYears[1]),
    calcAge(birthYears[2])
];
console.log(ages);

// Array 메소드 (method)
friends.push("Peter");  // Array의 맨 끝에 요소 추가
console.log(friends);  // ["Michle", "Steven", "Jay", "Peter"]
friends.unshift("John");  // Array의 맨 앞에 요소 추가
console.log(friends);  // ["John", "Michle", "Steven", "Jay", "Peter"]
const popped = friends.pop();  // Array의 마지막 요소 제거
console.log(popped, friends);  // Peter ["Jogn", "Michle", "Steven", "Jay"]
friends.shift();  // Array의 맨 앞 요소 제거
console.log(friends);  // ["Michle", "Steven", "Jay"]
console.log(friends.indexOf("Steven"));  // 1, Array에서 해당 요소의 위치 찾기
console.log(friends.indexOf("Bob"));  // 존재하지 않는 요소는 -1 반환
console.log(friends.includes("Steven"));  // true, Array 내에서 해당 요소의 존재 여부 반환
console.log(friends.includes("Bob"));  // false
console.log(birthYears.includes("2004"));  // false, 타입까지도 일치해야 true (strict)


// Object
const chumingi = {
    firstName: "Mingi",
    lastName: "Chu",
    age: 2026 - 2004,
    job: 'Senior in university',
    friends: friends,
};
console.log(chumingi);

// Object의 프로퍼티에 접근하는 방법 (Dot vs Bracket Notation)
    // Dot
console.log(chumingi.firstName);  // Mingi
// console.log(chumingi."first"+"Name";  // Uncaught SyntaxError: Unexpected string
    // Bracket
const nameKey = "Name";
console.log(chumingi["first" + nameKey]);  // Mingi
console.log(chumingi["last" + nameKey]);  // Chu
    // Dot + Bracket 예시
console.log(`${chumingi.firstName} has ${chumingi.friends.length} friends, and his best friends is called ${chumingi.friends[0]}`);
    // 사용자 입력 예시
const interestedIn = prompt("What do you want know about Mingi? Choose between firstName, lastName, age, job and friends.");
console.log(chumingi.interestedIn);  // undefined
console.log(chumingi[interestedIn]);  // prompt()로 입력받은 키에 해당하는 값 반환
    // Object에 새 속성(property) 추가
chumingi.country = "Korea";
chumingi["university"] = "Gachon";
console.log(chumingi);

// Object Method
const methodChumingi = {
    firstName: "Mingi",
    lastName: "Chu",
    birthYear: 2004,
    job: 'Senior in university',
    friends: friends,
    hasDriversLicence: false,

    calcAge: function () {
        return 2026 - this.birthYear;
    },
    calcAgeStore: function () {
        this.age = 2026 - this.birthYear;
        return this.age;
    },
    getSummary: function() {
        return `${this.firstName} is a ${this.calcAge()}-year old ${this.job}, and he has ${this.hasDriversLicence ? 'a' : 'no'} driver's licence.`;
    },
};
console.log(methodChumingi.calcAge());
console.log(methodChumingi.calcAge());
console.log(methodChumingi['calcAge']());
console.log(methodChumingi.getSummary());

// calcAGe() 호출 후에는 age를 바로 호출 가능
console.log(methodChumingi.calcAgeStore());
console.log(methodChumingi.age);
console.log(methodChumingi.age);
console.log(methodChumingi.age);
console.log(methodChumingi.age);
