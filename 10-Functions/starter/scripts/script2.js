// immediately invoked function expression
console.log('--- IMMEDIATELY INVOKED FUNCTION EXPRESSION ---');

// 함수 표현식을 괄호로 감싸고 바로 호출
(function () {
  console.log('This is an immediately invoked function expression!');
})();

// 화살표 함수
(() =>
  console.log('This is an immediately invoked arrow function expression!'))();

/* IIFE 패턴이 도입된 배경
  외부 스코프는 내부 스코프에서 선언된 변수에 접근할 수 없다. (데이터 캡슐화)
  변수가 프로그램의 다른 부분, 외부 스크립트, 라이브러리에 의해 덮어씌워지지 않도록 보호해야 한다. (OOP)
*/
// 최신 JavaScript에서는 let/const로 블록 스코프를 사용할 수 있기 때문에 IIFE의 필요성이 줄어들었지만, 여전히 특정 상황에서는 유용할 수 있다.

// Closure
console.log('--- CLOSURE ---');

const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};
const booker = secureBooking(); // secureBooking function EC 제거, booker function EC 생성
// 클로저를 통해 booker function이 secureBooking function의 variable environment에 접근할 수 있다.
booker();
booker();
booker();
console.dir(booker);

// 함수의 실행이 끝나서 call stack에서 함수의 execution context가 제거된 후에도 함수의 variable environment는 엔진의 메모리 힙에 남아있는다.
// execution context가 call stack에서 제거되면 garbage collection에 의해 변수들을 메모리 힙에서 제거하지만, 클로저에 의해 접근될 수 있는 변수들은 예외이다.
// 모든 함수는 자신이 선언된 execution context의 variable environment에 접근할 수 있다.

// 클로저 예제 1 - 함수의 birth place 변경
let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};
g();
f(); // 46
// 함수의 birth place 변경
const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
    // console.log(a * b * 2);
    // ReferenceError: a is not defined
  };
};
g();
f(); // 46
h();
f();

// 클로저 예제 2 - Timer
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;
  setTimeout(function () {
    console.log(`Boarding ${perGroup} passengers`);
  }, wait * 1000);
};
const perGroup = 1000; // 전역 변수
boardPassengers(180, 3); // 3초 후에 'Boarding 60 passengers' 출력
// 클로저를 통해 setTimeout callback function이 boardPassengers function의 variable environment에 접근할 수 있다.
// 클로저가 우선순위가 높기 때문에, 전역변수 perGroup을 선언했지만 boardPassengers 내에 동일한 이름의 perGroup이 있다면 이를 참조한다.
