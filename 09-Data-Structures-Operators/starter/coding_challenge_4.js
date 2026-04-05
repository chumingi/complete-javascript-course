// Coding Challenge #4

/*
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
  delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!
*/

/*
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));
*/
console.log('--- CODING CHALLENGE #4 BY MYSELF FIRST ---');
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

/*
- DOM에서 button 태그를 읽어와 click 이벤트 리스너를 작성한다. (.addEventListener('click', ...))
- DOM에서 textarea 태그를 읽어와 그 값을 '\n' 기준으로 쪼갠 배열을 생성한다.. (.split())
- 배열의 각 문자열을 순회하면서,
  - 문자열의 모든 글자를 소문자로 바꾼다. (.toLowerCase())
  - '_'를 기준으로 문자열을 쪼개고, (.split('_'))
    - 각 문자열의 첫 글자를 대문자로 바꾼다. (.replace())
  - 쪼개진 문자열들을 다시 하나로 합친다. (.join())
  - textarea의 각 라인이 저장된 배열에서, underscore_case인 문자열을 변환된 문자열로 바꾼다.
  - 변환된 문자열의 길이를 길이 배열에 추가한다. (.length)
- 출력 양식에 맞게 출력한다.
    - 최대 길이 문자열의 길이 + 4가 되도록 공백을 추가한다. (.padEnd(Math.max(...)+4, ' '))
    - (문자열의 인덱스)+1만큼 체크 기호를 반복하여 이어붙인다. (.repeat())
*/

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value.split('\n');
  const lengths = [];

  // text의 각 문자열 (각 줄)을 camelCase로 변환한다.
  for (const [idx, line] of text.entries()) {
    const lineLower = line.toLocaleLowerCase();
    const lineSplit = lineLower.split('_');

    // lineSplit의 두번째 문자열부터 첫 문자를 대문자로 바꾼다.
    for (let i = 1; i < lineSplit.length; i++) {
      const str = lineSplit[i];
      lineSplit[i] = str.replace(str[0], str[0].toUpperCase());
    }

    // underscore_case를 camelCase로 대체하고, 변환한 문자열의 길이를 lengths에 추가한다.
    const lineCamelCase = lineSplit.join('');
    text[idx] = lineCamelCase;
    lengths.push(lineCamelCase.length);
  }

  // 출력 양식에 맞게 콘솔에 출력한다.
  for (const [idx, line] of text.entries()) {
    const padString = line.padEnd(Math.max(...lengths) + 4, ' ');
    console.log(`${padString + '✅'.repeat(idx + 1)}`);
  }
});
