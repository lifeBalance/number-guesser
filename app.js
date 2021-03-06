/*
** Game outline:
**  - Player guesses a number between min and max
**  - Player gets a certain amount of chances
**  - Notify player of remaining chances
**  - Notify of the correct number in case of lost game
**  - Congratulate player if she wins
**  - Let player choose to play again
*/

// Variables
let min         = 1;
let max         = 10;
let winningNum  = generateRandomNumber(min, max);
let guessesLeft = 3;

// UI elements
const gameElem        = document.getElementById('game');
const minNumElem      = document.querySelector('.min-num');
const maxNumElem      = document.querySelector('.max-num');
const guessInputElem  = document.querySelector('#guess-input');
const guessBtnElem    = document.querySelector('#guess-btn');
const messageElem     = document.querySelector('.message');

// Assign UI min and max
minNumElem.textContent = min;
maxNumElem.textContent = max;

// Register event listener for the button
guessBtnElem.addEventListener('click', (event) => {
  let guess = parseInt(guessInputElem.value);

  // Validate input
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    return;
  }
  // Check if the guess is correct
  if (guess == winningNum) {
    // GAME OVER: PLAYER WINS!
    updateUI(true, `${guess} is correct. You won!!`);
  } else {
    guessesLeft--;
    // GAME OVER: PLAYER LOSES!
    if (!guessesLeft) {
      updateUI(false, `Incorrect, you lose! The correct number was ${winningNum}`);
    } else {
      // GAME CONTINUES...
      guessInputElem.value = '';
      guessInputElem.style.borderColor = 'red';
      setMessage(`That wasn't right. Chances left: ${guessesLeft}`, 'red');
    } 
  }
});

// Register event listener for playing again
gameElem.addEventListener('mousedown', function (event){
  if (event.target.className === 'play-again') {
    guessInputElem.value = '';
    location.reload();
  }
});

// Update UI
function updateUI(won, msg) {
  let color;
  color = won? 'green' : 'red';
  guessInputElem.disabled = true;
  guessInputElem.style.borderColor = color;
  setMessage(msg, color);

  // PLAY AGAIN
  guessBtnElem.value = 'Play Again';
  guessBtnElem.className += 'play-again';
}

function setMessage(msg, color) {
  messageElem.style.color = color;
  messageElem.textContent = msg;
}

function generateRandomNumber(min, max) {
  return parseInt(Math.random() * (max - min + 1) + min);
}
