'use strict';
import { poll } from '../data.js';

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

// call & apply method
// call과 apply는 this를 명시적으로 지정할 수 있게 해주는 메서드
console.log('--- CALL AND APPLY METHOD ---');

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],

  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`,
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};
lufthansa.book(239, 'Mingi Chu');
// 'Mingi Chu booked a seat on Lufthansa flight LH239'
lufthansa.book(635, 'John Smith');
// 'John Smith booked a seat on Lufthansa flight LH635'
console.log(lufthansa.bookings);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;
// book(23, 'Sarah Williams'); // undefined booked a seat on undefined flight undefined23
// TypeError: Cannot read properties of undefined (reading 'airline')
// 함수는 일반적으로 호출되는 방식에 따라 this가 결정되는데, book() 함수는 lufthansa 객체의 메서드로 호출되지 않고, 단순히 함수로 호출되었기 때문에 this가 undefined가 됨

// Func.call(obj, args) - this를 명시적으로 지정할 수 있음
book.call(eurowings, 23, 'Sarah Williams');
// Sarah Williams booked a seat on Eurowings flight EW23
console.log(eurowings);
book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

// Func.apply(obj, [args]) - call과 동일하지만, 인자를 배열로 전달해야 함
const flightData = [583, 'George Cooper'];
book.apply(eurowings, flightData);
// 최근에는 call()을 주로 사용한다.
book.call(eurowings, flightData);

// bind method
// call과 유사하지만, 즉시 호출되지 않고 새로운 함수를 반환함
console.log('--- BIND METHOD ---');

// this 키워드가 항상 eurowings 객체를 가리키도록 bookEw 함수를 생성
const bookEw = book.bind(eurowings);
bookEw(23, 'Steven Williams');
// 'Steven Williams booked a seat on Eurowings flight EW23'

// partial application - 일부 인자를 미리 설정하여 새로운 함수를 만드는 것
const bookEw23 = book.bind(eurowings, 23); // flightNum이 23으로 고정된 새로운 함수 생성
bookEw23('John Doe'); //name 인자만 전달
// 'John Doe booked a seat on Eurowings flight EW23'

// with event listener
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));
// bind()를 사용하지 않으면 this는 버튼 요소를 가리키게 되는데,
// bind()를 사용하여 this가 항상 lufthansa 객체를 가리키도록 함

// Partial application 추가 예제
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200)); // 220
const addVAT = addTax.bind(null, 0.23); // addTax에서 rate가 value보다 먼저 오기 때문에, rate 인자를 0.23으로 고정한 새로운 함수 생성
// addVAT = value => value + value * 0.23;와 동일
console.log(addVAT(100)); // 123

// 함수를 반환하는 함수 형태로 예제 수정
const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100)); // 123

// coding challenge #1
console.log('--- CODING CHALLENGE #1 WITH LEARNER ---');

poll.registerNewAnswer = function () {
  const answer = Number(
    prompt(
      `${this.question}\n${this.options.join('\n')}\n(Write option number)`,
    ),
  );
  console.log(answer);

  typeof answer === 'number' &&
    answer < this.answers.length &&
    this.answers[answer]++;
  console.log(this.answers);

  this.displayResults();
  this.displayResults('string');
};

poll.displayResults = function (type = 'array') {
  if (type === 'array') {
    console.log(this.answers);
  } else if (type === 'string') {
    console.log(`Poll results are ${this.answers.join(', ')}`);
  }
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');
