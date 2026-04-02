'use strict';

// Strings
// 문자들의 모임, 배열과 유사

console.log('--- STRINGs ---');

const airline = 'TAB Air Portugal';
const plane = 'A230';
console.log(plane[0]); // 'A'
console.log('B37'[1]); // '3'

// String.length - 문자열의 길이를 정수로 반환
console.log(airline.length); // 16
console.log(typeof 'B73'.length); // number

// String method

// String.indexOf(s) - 특정 문자/문자열 s가 문자열에서 존재하는 첫 위치를 정수로 반환
console.log(airline.indexOf('r')); // 6

// String.lastIndexOf(s) - 특정 문자/문자열 s가 문자열에서 whswo하는 akwlakr 위치를 정수로 반환
console.log(airline.lastIndexOf('r')); // 10
console.log(airline.indexOf('Portugal')); // 8, 문자열도 탐색 가능
console.log(airline.indexOf('portugal')); // -1, 대소문자 구분

// String.slice(si) - 인덱스 si를 이용하여, 문자열의 si 위치부터 시작하는 부분 문자열을 새로 만들어 반환 (기존 문자열 미변경)
// 끝 인덱스 ei를 추가로 전달하여, 인덱스 si ~ (ei-1)에 해당하는 부분 문자열 반환 (e1번째 문자는 부분 문자열에 미포함, length = ei - si)
console.log(airline.slice(4)); // 'Air Portugal'
console.log(airline.slice(4, 7)); // 'Air'
console.log(airline); // 'TAB Air Portugal', 기존 문자열 미변경
// 음수를 이용하여 문자열 끝에서부터 슬라이싱 가능
console.log(airline.slice(-2)); // 'al'
console.log(airline.slice(1, -1)); // 'AB Air Portuga'
// 실제로 문자열에서 구한 인덱스를 이용하여 부분 문자열 추출
console.log(airline.slice(0, airline.indexOf(' '))); // 'TAB'
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); // 'Portugal'
const checkMiddleSeat = function (seat) {
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') console.log('You got middle seat.');
  else console.log('You got lucky!');
};
checkMiddleSeat('11B'); // 'You got middle seat.'
checkMiddleSeat('23C'); // 'You got lucky!'
checkMiddleSeat('3E'); // 'You got middle seat.'

/* primitive type(기본 자료형)인 String에서 method를 사용할 수 있는 이유:
- String에서 method를 호출하면, JavaScript는 String Primitive를 String Object로 변환 (boxing)
- 변환된 객체에서 method 실행
- 연산이 끝난 후, 다시 String Primitive 반환
*/
const myName = new String('Mingi');
console.log(typeof myName, myName); // object [String: 'Mingi']
console.log(typeof myName.slice(3)); // string

// 문자열 대소문자 변환
// String.toLowerCase() - 문자열 내의 모든 문자를 소문자로 변환
// String.toLowerCase() - 문자열 내의 모든 문자를 대문자로 변환
console.log(airline.toLowerCase()); // 'tab air portugal'
console.log(airline.toUpperCase()); // 'TAB AIR PORTUGAL'
// Fix capitalization in name
const passenger = 'mInGi';
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect); // 'Mingi'
// 함수로 변경
const capitalizeName = function (passenger) {
  const passengerLower = passenger.toLowerCase();
  const passengerCorrect =
    passengerLower[0].toUpperCase() + passengerLower.slice(1);
  console.log(passengerCorrect);
};
capitalizeName('jOnaS'); // 'Jonas'
capitalizeName('gARAm'); // 'Garam'

// String.trim(s) - 문자열 s에서 공백, \n 등을 제거한 새로운 문자열을 반환
// Comparing emails
// ES2019에서 trimStart()와 trimEnd() 추가
const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.Io \n';
const lowerEmail = loginEmail.toLowerCase();
const trimedEmail = lowerEmail.trim();
console.log(trimedEmail); // 'hello@jonas.io'
const nomalizedEmail = loginEmail.toLowerCase().trim();
// 두 이메일이 같은지 확인하는 함수 작성
const compareEmails = function (correct, login) {
  console.log(`Both are ${correct === login ? 'same' : 'different'}`);
};
compareEmails(email, nomalizedEmail); // Both are same

// String.replace(s1, s2) - 문자열에 존재하는 첫 s1을 s2로 변경
const priceGB = '288,97F';
const priceUS = priceGB.replace('F', '$').replace(',', '.'); // '288.97$'
console.log(priceUS);
const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';
console.log(announcement.replace('door', 'gate')); // 'All passengers come to boarding gate 23. Boarding door 23!

// String.replaceAll(s1, s2) - 문자열에 존재하는 모든 s1을 s2로 변경
console.log(announcement.replaceAll('door', 'gate')); // 'All passengers come to boarding gate 23. Boarding gate 23!
// regular expression (정규 표현식)
console.log(announcement.replace(/door/g, 'gate')); // String.replaceAll()과 결과 동일

// boolean 값을 반환하는 method들 (include, startsWith, endsWith)
const plane2 = 'Airbus A330neo';
// String.includes(s) - 문자열이 s를 포함하는지 여부를 true/false로 반환
console.log(plane2.includes('320')); // false
console.log(plane2.includes('a320')); // false
// String.startsWith(s) - 문자열이 s로 시작하는지 여부를 true/false로 반환
console.log(plane2.startsWith('Air')); // true
// String.endsWith() - 문자열이 s로 끝나는지 여부를 true/false로 반환
if (plane2.startsWith('Airbus') && plane2.endsWith('neo')) {
  console.log('part of NEW Airbus familiy'); // 'part of NEW Airbus familiy'
}
// 짐에 칼이나 총을 포함하고 있는지를 확인하는 예제
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife' || baggage.includes('gun'))) {
    console.log('You are NOT allowed on board');
  } else {
    console.log('Welcome aboard!');
  }
};
checkBaggage('I have a laptop, some Food and a pocket Knife'); // 'You are NOT allowed on board'
checkBaggage('Socks and camera'); // 'Welcome aboard!'
checkBaggage('Got some snacks and a gun for protection'); // 'Welcome aboard!'

// String.split() - 문자열을 여러 부분으로 나누
