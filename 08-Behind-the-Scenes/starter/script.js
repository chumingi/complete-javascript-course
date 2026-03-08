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
