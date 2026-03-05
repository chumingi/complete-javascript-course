'use strict';

// selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
const current0El = document.querySelector('#current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let currentScore = 0;
let activePlayer = 0; // 0: Player0, 1: Player1

btnRoll.addEventListener('click', () => {
  /*
  - 랜덤 주사위 숫자 생성
  - 주사위 숫자 보여주기
  - 주사위 수자가 1인지 확인하기
  - 참이면 다음 플레이어로 넘어가기
  */
  const dice = Math.trunc(Math.random() * 6);
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;
  console.log(`Rolled the dice (${dice})`);

  // 주사위 숫자가 1인지 확인
  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player-active');
    player1El.classList.toggle('player-active');
  }
});
