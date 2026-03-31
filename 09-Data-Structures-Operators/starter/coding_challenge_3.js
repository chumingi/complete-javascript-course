// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL
*/

'use strict';
import { gameEvents } from './script2.js';
gameEvents.set(64, '🔶 Yellow card'); // import하기 전 script2.js에서 제거된 키-갑ㄳ 추가
console.log('--- CODING CHALLENGE #3 BY MYSELF FIRST ---');

/* 1. Create an array 'events' of the different game events that happened (no duplicates)
- 새 집합 gameEventsSet을 생성한다.
- Map을 배열로 변환하고, 반복문을 이용하여 두번째 요소를 gameEventsSet에 추가한다.
- 만들어진 집합의 요소를 ...로 확장하여 새 배열 events를 만든다.
*/
const gameEventsSet = new Set();
const gameEventsArr = [...gameEvents];
for (const timeEvent of gameEventsArr) {
  gameEventsSet.add(timeEvent[1]);
}
const events = [...gameEventsSet];
console.log(events);

/* 2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
- delete() 메소드를 이용하여 gameEvents에서 key가 64인 요소 제거
*/
gameEvents.delete(64);
console.log(gameEvents);

/* 3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
- gameEvents의 크기 10을 구해 90 / 10으로 9를 계산한다.
*/
const avgEvents = 90 / gameEvents.size;
console.log(`An event happened, on average, every ${avgEvents} minutes`);

/* 4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
    [FIRST HALF] 17: ⚽️ GOAL

- gameEvents를 배열로 변환하고, 각 요소를 t와 e로 구조분해하여 순회한다.
- t가 45 이상인지 아닌지 비교하여 FIRST/SECOND를 결정하고, 형식에 맞추어 출력한다. (90분 이후는 제외)
*/
for (const [t, e] of gameEvents) {
  const firstOrSecond = t < 45 ? 'FIRST' : 'SECOND';
  t < 90 && console.log(`[${firstOrSecond} HALF] ${t}: ${e}`);
}
