// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
    Odd of victory Bayern Munich: 1.33
    Odd of draw: 3.25
    Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
    {
      Gnarby: 1,
      Hummels: 1,
      Lewandowski: 2
    }
*/

'use strict';
import { game } from './coding_challenge_1.js';

/* 1
- game.scored 배열을 인덱스-값 형태의 배열로 가져와 반복
- `Goal ${인덱스+1}: 값` 형태로 출력
*/
for (const [goalIdx, goalPlayer] of game.scored.entries()) {
  console.log(`Goal ${goalIdx + 1}: ${goalPlayer}`);
}

/* 2
- odd 값들의 평균을 구하기에 필요한 sum 변수를 0으로 초기화
- game.odds 객체의 속성값 배열을 가져와 values 변수에 저장
- values 배열의 요소들을 순서대로 탐색하면서 (for of)
  - sum 변수에 odd값 추가
- sum 값을 values 배열의 길이로 나눈 평균을 계산하여 출력
*/
let sum = 0;
const values = Object.values(game.odds);
for (const odd of values) {
  sum += odd;
}
console.log(`Average of odds: ${sum / values.length}`);

/* 3
- game.odds 객체의 속성명-속성값 배열을 가져와 entries 변수에 저장
- entries 배열의 각 요소를 순서대로 탐색하면서 victoryStr 문자열 생성
  - entries 내의 속성명이 game 객체 내에 존재하면 `victory ${해당 속성명이 갖는 속성값}
  - entries 내의 속성명이 game 객체 내에 존재하지 않으면 'draw'
  - `Odd of ${victoryStr}: ${odd 값}` 형태로 출력
*/
const entries = Object.entries(game.odds);
for (const [team, odd] of entries) {
  const victoryStr = game[team] ? `victory ${game[team]}` : 'draw';
  console.log(`Odd of ${victoryStr}: ${odd}`);
}

/* bonus
- game.scored배열을 가져와 scored 변수에 저장한다.
- scores라는 이름의 빈 객체를 생성한다.
- scored 배열의 각 요소를 순서대로 탐색하면서 (for of),
  - 해당 선수명이 scores 객체에 있으면 기존값 1 증가
  - 해당 선수명이 scores 객체에 없으면 1로 새로 설정,
- scores 객체 출력
*/
const scored = game.scored;
const scores = {};
for (const player of scored) {
  scores[player] = (scores[player] || 0) + 1;
}
console.log(scores);
