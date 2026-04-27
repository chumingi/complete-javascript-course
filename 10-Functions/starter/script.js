'use strict';

// Default Paramters
// 함수 파라미터의 기본값을 변경하고 싶지 않은 경우, 파라미터를 적지 않아도 됨
console.log('--- DEFAULT PARAMETER ---');

const bookings = [];
const createBooking = function (
  flightNum,
  // ES5: numPassenger = numPassenger || 1,
  numPassenger = 1,
  price = 199 * numPassenger, // ES6, 이전에 numPassenger가 정의되어 있지 않다면, 1로 설정
) {
  const booking = {
    flightNum,
    numPassenger,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};
createBooking('LH123'); // numPassenger와 price는 기본값이 사용됨
// { flightNum: 'LH123', numPassenger: 1, price: 199 }
createBooking('LH123', 2, 800);
// { flightNum: 'LH123', numPassenger: 2, price: 800 }
createBooking('LH123', 2); // 동적으로 계산된 price=398
// { flightNum: 'LH123', numPassenger: 2, price: 398 }
createBooking('LH123', undefined, 1000); // numPassenger는 기본값이 사용되고, price는 1000으로 설정됨
// { flightNum: 'LH123', numPassenger: 1, price: 1000 }

/* argument들을 전달하는 방법
  - value: 단순히 값을 복사하기 때문에 함수 내에서의 변경이 원본 값에 영향을 미치지 않는다.
  - reference: 메모리 힙에 저장된 참조값을 전달하기 때문에 함수 내에서의 변경이 원본 값에 영향을 미친다.
*/
const flight = 'LH234';
const mingi = {
  name: 'Mingi Chu',
  passPort: 123456789,
};
const checkIn = function (flightNum, passenger) {
  flightNum = 'LG999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passPort === 123456789) {
    // alert('Checkd');
    console.log('Checkd');
  } else {
    // alert('Wrong passport');
    console.log('Wrong passport');
  }
};
checkIn(flight, mingi);
console.log(flight); // 'LH234'
console.log(mingi.name); // 'Mr. Mingi Chu

// First Class Function
// 함수를 변수처럼 대하는 것
// 함수는 객체 타입 중 하나이고,,객체도 값이므로 -> 함수도 값이다.
// 함수를 변수에 저장, 객체의 속성에 저장, 다른 함수에 인자로 전달 가능
// higher order function - 인자로 함수를 받거나 (콜백 함수) / 반환값으로 함수를 리턴하는 함수
console.log('--- FIRST CLASS FUNCTION ---');

// callback function (콜백 함수) - higher order function보다 이후에 호출되는 함수
const oneWord = function (str) {
  return str.replaceAll(' ', '').toLowerCase();
};
const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`);
};
transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);
// Original string: JavaScript is the best!
// Transformed string: javascriptisthebest!
// Transformed by: oneWord

/* 콜백 함수가 많이 사용되는 이유?
  - 재사용 가능하고 상호 연결된 부분으로 쉽게 분할되기 때문
  - 추상화가 가능하게 해주기 때문 (콜백 함수가 실제로 어떻게 구현되는지 싱경쓰지 ㅇ낳아도 됨)
*/

// 함수를 반환하는 함수
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};
const greeterHey = greet('Hey');
greeterHey('Mingi'); // 'Hey Mingi'
greet('Hello')('Mingi'); // greet 함수가 반환하는 함수가 바로 호출됨

// greet() 함수를 화살표 함수로 변경
const greetArrow = greeting => name => console.log(`${greeting} ${name}`);
greetArrow('Hi')('Mingi'); // 'Hi Mingi'
