'use strict';
// console.log(displayMessage); // Start guessing...
// console.log(document.querySelector('p').textContent); // (Between 1 and 20)
// displayMessage = 'Guess Number';

// document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textContent = 20;

// document.querySelector('.guess').value = 17;
// console.log(document.querySelector('.guess').value);

let score = 20;
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let questionMark = '?';
document.querySelector('.number').textContent = questionMark;
let highScore = 0;

const displayMessage = message => {
  document.querySelector('.message').textContent = message;
  console.log(message);
};

document.querySelector('.check').addEventListener('click', () => {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess);

  if (!guess) {
    displayMessage('No Number');
  } else if (guess === secretNumber) {
    displayMessage('Correct Number');
    document.querySelector('body').style.backdropFilter = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = secretNumber;

    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
  } else if (guess !== secretNumber) {
    if (score > 0) {
      displayMessage(guess > secretNumber ? 'Too High' : 'Too Low');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('You lost the game');
    }
  }
});

document.querySelector('.again').addEventListener('click', () => {
  console.log('Reset game');
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = questionMark;
  document.querySelector('.guess').value = '';
  displayMessage('Start guessing');

  document.querySelector('body').style.backdropFilter = '#222';
  document.querySelector('.number').style.width = '15rem';
});
