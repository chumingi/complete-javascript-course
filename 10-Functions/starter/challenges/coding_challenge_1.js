// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
    What is your favourite programming language?
    0: JavaScript
    1: Python
    2: Rust
    3: C++
    (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉
*/

import { poll } from '../data.js';
console.log(' --- CODING CHALLENGE #1 BY MYSELF FIRST --- ');

/* 아이디어
  - data.js에서 import한 poll 객체에 registerNewAnswer() 메서드와 displayResults() 메서드를 추가한다.
  - registerNewAnswer()는 사용자에게 옵션 번호를 입력받아 answers에서 해당 옵션의 값을 1 증가시킨다.
    - 사용자에게 메세지를 보여주고 입력을 받는다. (prompt)
      - poll 객체의 question과 options 배열을 이용하여 메세지를 구성한다.
    - 입력받은 input을 숫자로 변환한다. (Number(input))
    - 입력받은 숫자가 존재한느 옵션인지 확인한다. (input >= 0 && input < this.answers.length)
    - 유효한 입력이면 answers 배열에서 해당 인덱스의 값을 1 증가시킨다. (result[input]++)
    - 유효하지 않은 입력이면 경고 메세지를 표시한다. (alert)
    - displayResults() 메서드를 호출하여 결과를 출력한다.
  - displayResults()는 type을 입력받아 콘솔에 출력한다.
    - type은 기본값으로 'array'로 설정한다. (type = 'array')
    - type이 'array'이면 result 배열을 그대로 출력한다.
    - type이 'string'이면 정해진 형식의 문자열을 출력한다. ("Poll results are 13, 2, 4, 1")
      - result 배열의 요소들을 ', '을 이용하여 하나로 연결한다. (result.join(', '))
  - DOM에서 버튼 요소를 선택하여 변수 btnAnswer에 저장한다.
  - btnAnswer 요소에 클릭 이벤트 리스너를 추가하여 registerNewAnswer() 메서드를 호출한다.
    - bind() 메서드를 사용하여 registerNewAnswer()의 this가 poll 객체를 가리키도록 한다. (poll.registerNewAnswer.bind(poll))
*/

poll.registerNewAnswer = function () {
  const question = [
    this.question,
    ...this.options,
    '(Write option number)',
  ].join('\n');
  const input = Number(prompt(question));
  if (input >= 0 && input < this.answers.length) {
    this.answers[input]++;
  } else {
    alert('Invalid input. Please enter a valid option number.');
  }
  this.displayResults();
};

poll.displayResults = function (type = 'array') {
  if (type === 'array') {
    console.log(this.answers);
  } else if (type === 'string') {
    console.log(`Poll results are ${this.answers.join(', ')}`);
  }
};

const btnAnswer = document.querySelector('.poll');
btnAnswer.addEventListener('click', poll.registerNewAnswer.bind(poll));

/*
BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]
*/

/* 아이디어
  - poll.displayResults() 메서드를 호출할 때 this가 가리키는 객체를 명시적으로 지정해야 한다. (bind() 메서드 사용)
  - testData1Display와 testData2Display 함수를 각각 poll.displayResults() 메서드에 bind() 메서드를 사용하여 this가 테스트 데이터 배열을 가리키도록 한다.
  - 'array'와 'string' 두가지 옵션에 대하여 testData2Display()와 testData2Display()을 호출하여 두 테스트 데이터의 결과를 출력한다.
*/

// let answers = [5, 2, 3];
// poll.displayResults.call(window);

const testData1Display = poll.displayResults.bind({ answers: [5, 2, 3] });
const testData2Display = poll.displayResults.bind({
  answers: [1, 5, 3, 9, 6, 1],
});

testData1Display('array');
testData1Display('string');
testData2Display('array');
testData2Display('string');
