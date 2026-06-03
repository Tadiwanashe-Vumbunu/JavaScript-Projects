'use strict';

//***********************NOW ADD COMMENTS FOR READABILITY************************
//********************************REFACTOR THE CODE******************************
const diceEl = document.querySelector('.dice');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
let currentScore = 0;

diceEl.classList.add('hidden');

// Start game
score0El.textContent = 0;
score1El.textContent = 0;
//const totalScore = 0;
let scores = [0, 0];
//check whether we ever used score 0 and 1
let score0,
  score1,
  activePlayer = 0;
let gameOn = true;

//Player Rolls the dice
btnRoll.addEventListener('click', function () {
  if (gameOn) {
    const dice = Math.trunc(Math.random() * 6 + 1);
    currentScore += dice;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      activePlayer = activePlayer === 1 ? 0 : 1;
      player0.classList.toggle('player--active');
      player1.classList.toggle('player--active');
      current0El.textContent = 0;
      current1El.textContent = 0;
      currentScore = 0;
    }
  }
});

// WHEN PLAYER HOLDS MARK
btnHold.addEventListener('click', function () {
  if (gameOn) {
    scores[activePlayer] += currentScore;

    //Update curent and display new player's score
    if (activePlayer === 0) {
      score0 = scores[0];
      score0El.textContent = score0;
    } else {
      score1 = scores[1];
      score1El.textContent = score1;
    }
    console.log(score0, score1);

    //Player wins the game
    for (let i = 0; i < scores.length; i++) {
      if (scores[i] >= 100) {
        gameOn = false;
        diceEl.classList.add('hidden');
        document.querySelector(`.player--${i}`).classList.add('player--winner');
        document.getElementById(`current--${i}`).textContent = 0;
        document.getElementById(`name--${i}`).textContent =
          activePlayer === 0 ? 'Player 1 Wins!!!' : 'Player 2 Wins!!!';
        document
          .querySelector(!`.player--${i}`)
          .classList.remove('player--active');
      }
    }

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //if the anyone of the scores[x] is more than 10 then add player wins class
    activePlayer = activePlayer === 1 ? 0 : 1;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
    current0El.textContent = 0;
    current1El.textContent = 0;
    currentScore = 0;
    console.log(scores);
  }
});

// Reset the game
btnNewGame.addEventListener('click', function () {
  document.getElementById(`name--${activePlayer}`).textContent =
    activePlayer === 0 ? 'Player 1' : 'Player 2';
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  activePlayer = 0;
  currentScore = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  gameOn = true;
  scores = [0, 0];
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
});

/*     console.log(dice);
console.log(currentScore); */
