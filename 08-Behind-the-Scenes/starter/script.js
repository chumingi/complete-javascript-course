'use strict';

// variable loopup in scope chain
// global scope (top)
const myName = 'Mingi'; // global scope에 myName 변수 선언

// first() function scope
function first() {
  const age = 30; // first() function scope에 age 변수 선언

  // if block scope
  if (age >= 30) {
    const decade = 3; // let과 const는 block scope, if block scope 내에서만 사용 가능
    var millenial = true; // var는 function scope, first() function scope 전체에서 사용 가능
  }

  // second() function scope
  function second() {
    const job = 'Senior in university'; // second() function scope에 job 변수 선언
    console.log(`${myName} is a ${age} old ${job}`); // 현재 scope 외부의 변수 참조 필요
    // second() function scope는 first() scope의 age 변수 참조
    // first() function scope는 global scope의 myName 변수 참조
  }
  second();
}
first();

// scoping in practice
function calcAge(birthYear) {
  const age = 2026 - birthYear;
  console.log(firstName); // variable lookup, global scope에서 참조

  function printAge() {
    let output = `You are ${age}, born in ${birthYear}.`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;
      const firstName = 'Steven';
      const str = `Oh! and you are millenial, ${firstName}`;
      console.log(str); // 현재 scope에 존재하는 firstName 참조, firstName = "SSteven"
      output = 'NEW OUTPUT'; // 현재 scope 외부의 변수에 접근하여 값 재할당
    }
    // console.log(str);  // 'str' is not defined
    console.log(millenial); // var는 function scope, printAge() 내에서 접근 가능
    console.log(output); // if block scope 내에서의 값 재할당 반영됨 ("NEW OUTPUT" 출력)
  }
  printAge();
  return age;
}

const firstName = 'Mark';
calcAge(1991);

// HOisting
function hoisting() {
  console.log(me); // undefined
  // console.log(job);  // ReferenceError: Cannot access 'job' before initialization
  // console.log(birthYear);  // ReferenceError: Cannot access 'birthYear' before initialization

  var me = 'Mingi'; // undefined로 초기화
  let job = 'Senior in university'; // hoisting 불가
  const birthYear = 2004; // hoisting 불가

  console.log(addDecl(2, 3)); // 5
  // console.log(addExpr(2, 3));  // ReferenceError: Cannot access 'addExpr' before initialization
  // console.log(addArrow(2, 3));  // TypeError: addArrow is not a function

  function addDecl(a, b) {
    return a + b;
  } // hoisting 가능
  const addExpr = function (a, b) {
    return a + b;
  }; // const로 선언된 일반 변수와 같은 취급 (hoisting 불가)
  var addArrow = (a, b) => a + b;
  // undefined로 초기화
}
hoisting();

// var 사용을 주의해야 하는 예제
// 의도: numProducts가 0이면 deleteShoppingCart() 실행
// 결과: hoisting에 의해 numProducts가 undefined가 되어 deleteShoppingCart() 실행
if (!numProducts) deleteShoppingCart();
var numProducts = 10;
function deleteShoppingCart() {
  console.log('All products deleted');
}

// this 키워드
// global scope
console.log(this); // live-server 실행 시 window 객체 확인
// normal function
const calcAgeDecl = function (birthYear) {
  console.log(2026 - birthYear);
  console.log(this); // undefined
};
calcAgeDecl(2004);
// arrow function
const calcAgeArrow = birthYear => {
  console.log(2026 - birthYear);
  console.log(this); // window 객체, =parent(global) 객체
};
calcAgeArrow(2004);
// method
const mingi = {
  birthYear: 2004,
  calcAge: function () {
    console.log(2026 - this.birthYear);
    console.log(this); // 'mingi' 객체
  },
};
mingi.calcAge();
// method 내의 this 값은
// 해당 메소드를 호출한 객체에 따라 다르게 할당됨을 확인하는 예제
const matilda = {
  birthYear: 2011,
};
matilda.calcAge = mingi.calcAge; // method borrowing
matilda.calcAge(); // 15, matilda 객체 출력

// Regular function vs Arrow function
var personName = 'Matilda'; // 브라우저의 window 객체에 personName 속성 추가
const mingi2 = {
  personName: 'Mingi',
  birthYear: 2004,
  calcAge: function () {
    console.log(2026 - this.birthYear);
    console.log(this); // 'mingi' 객체

    const self = this;
    const isMillenial = function () {
      console.log(this); // undefined
      // console.log(this.birthYear >= 1981 && this.birthYear <= 1998);
      // TypeError: Cannot read properties of undefined (reading 'birthYear')
      console.log(self.birthYear >= 1981 && self.birthYear <= 1998);
      // ES6 이전 해결방법
    };
    isMillenial();

    // ES6 해결방법 - arrow function은 자신의 this 키워드를 가지지 ㅏㄶ음
    const isMillenialArrow = () => {
      console.log(this); // undefined
      console.log(this.birthYear >= 1981 && this.birthYear <= 1998);
    };
    isMillenialArrow();
  },
  greet: () => console.log(`Hey, ${this.personName}`),
  // arrow function은 this 키워드를 가지지 않음, window 객체의 personName 속성 참조
  // method에 arrow function 사용 피하는 것 추천
};
mingi2.greet(); // Hey, Matilda
mingi2.calcAge();

// arguments 키워드
const addArgExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};
addArgExpr(3, 5); // [Arguments] { '0': 3, '1': 5 }
// arrow function은 arguments 키워들르 가지지 않음
var addArgArrow = (a, b) => {
  console.log(arguments);
  return a + b;
};
// addArgArrow(2, 5, 8);  // ReferenceError: 'arguemtns' is not defined

// Memory allocation
function memAlloc() {
  // memAlloc() function context
  const name = 'Mingi'; // memAlloc() EC의 variable environments에 name = "Mingi"
  const age = calcAge(2004); // calcAge() 호출, calcAGe() EC 생성, 리턴 값 22가 age 변수에 할당
  let newAge = age; // memAlloc() EC의 variable environment에 newAge = 22 저장
  newAge++; // newAge 값을 23으로 변경

  // memory heap에 저장되는 location 객체
  const location = {
    // memAlloc() EC의 location 변수에는 객체에 대한 참조값 저장
    city: 'Guri',
    country: 'Korea',
  };

  const newLocation = location; // location 객체의 참조값이 그대로 newLocation에 저장
  newLocation.city = 'Seoul'; // 참조된 location 객체의 city 속성값 변경
  console.log(location); // 같은 객체를 참조하기 때문에 city 값 변경됨

  function calcAge(birthYear) {
    // calcAge() function execution context
    // memAlloc() EC의 calcAge 변수에 함수의 참조값 저장
    const now = 2026; // clacAge() EC의 variable environment에 now = 2026 저장
    const x = now - birthYear; // clacAge() EC의 variable environment에 x = 22 저장
    return x; // x값 리턴, call stack에서 clacAge() EC 제거
  }
}
memAlloc();

// memory allocation 예제 2
const memAlloc2 = function () {
  const jessica = {
    firstName: 'Jessica',
    lastName: 'Williams',
    age: 27,
    familiy: ['Alice', 'Bob'],
  };
  // const marriedJessica = jessica;
  // marriedJessica.lastName = 'Davis';

  function marriedPerson(originalPerson, lastName) {
    originalPerson.lastName = lastName;
    return originalPerson;
  }
  const marriedJessica = marriedPerson(jessica, 'Davis');

  console.log('Before:', jessica);
  console.log('After:', marriedJessica);

  // ...을 이용하여 jessica 객체의 모든 속성을 새 객체에 복사
  const jessicaCopy = { ...jessica };
  jessicaCopy.age = 28;
  console.log(jessica, jessicaCopy);
  jessicaCopy.familiy.push('Marry');
  console.log('Before copy:', jessica);
  console.log('After copy:', jessicaCopy);
  // ...을 이용하여 속성값을 복사한 새 객체를 만들어도
  // familiy 배열(객체)의 참조값은 동일하기 때문에
  // Before과 After의 familiy가 모두 변함

  // deep copy/clone
  const jessicaClone = structuredClone(jessica);
  jessicaClone.familiy.push('Peter');
  console.log('Before clone:', jessica);
  console.log('After clone:', jessicaClone);
};
memAlloc2();
