"use strict";

// Game Variables
let secretNumber = Math.trunc(Math.random() * 20) + 1; // Generate a random number between 1 and 20
let score = 20; // Initial score
let highscore = 0; // Track the highest score
let timer; // Variable to store timer
let timeLeft = 30; // Countdown time in seconds

// DOM Elements
const body = document.querySelector("body");
const numberEl = document.querySelector(".number");
const messageEl = document.querySelector(".message");
const scoreEl = document.querySelector(".score");
const guessEl = document.querySelector(".guess");
const timeEl = document.querySelector(".time");

// Function to start the countdown timer
function startTimer() {
  if (timer) clearInterval(timer); // Clear any existing timer
  timeLeft = 30; // Reset timer to 30 seconds
  timeEl.textContent = timeLeft; // Update UI with time left

  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--; // Decrease time
      timeEl.textContent = timeLeft; // Update UI
    } else {
      clearInterval(timer); // Stop the timer when time is up
      messageEl.textContent = "⏳ Time's up! You lost!"; // Display timeout message
      scoreEl.textContent = 0; // Set score to zero
      timer = null; // Reset timer variable
    }
  }, 1000);
}

// Event listener for "Check" button
document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(guessEl.value); // Convert input value to a number

  if (!timer) startTimer(); // Start the timer when the player makes the first guess

  // When there's no input
  if (!guess) {
    messageEl.textContent = "⛔ No number!";
  }
  // When player wins
  else if (guess === secretNumber) {
    messageEl.textContent = "🎉 Correct Number!";
    numberEl.textContent = secretNumber;

    // Change background color and number size
    body.style.backgroundColor = "#60b347";
    numberEl.style.width = "30rem";

    // Update highscore if the current score is higher
    if (score > highscore) {
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    }

    clearInterval(timer); // Stop the timer
    timer = null;
  }
  // When guess is wrong
  else {
    if (score > 1) {
      messageEl.textContent =
        guess > secretNumber ? "📈 Too high!" : "📉 Too low!";
      score--; // Decrease score
      scoreEl.textContent = score; // Update UI
    } else {
      messageEl.textContent = "💥 You lost the game!";
      scoreEl.textContent = 0; // Set score to zero
      clearInterval(timer); // Stop the timer
      timer = null;
    }
  }
});

// Event listener for "Again" button to reset the game
document.querySelector(".again").addEventListener("click", function () {
  score = 20; // Reset score
  secretNumber = Math.trunc(Math.random() * 20) + 1; // Generate a new random number
  messageEl.textContent = "Start guessing..."; // Reset message
  scoreEl.textContent = score; // Reset score UI
  numberEl.textContent = "?"; // Hide the number
  guessEl.value = ""; // Clear input field

  // Reset styles
  body.style.backgroundColor = "#222";
  numberEl.style.width = "15rem";

  // Reset and clear timer
  if (timer) clearInterval(timer);
  timer = null;
  timeEl.textContent = 30; // Reset timer display
});

// Event listener for difficulty selection
document.querySelector(".difficulty").addEventListener("change", function (e) {
  const difficulty = e.target.value;

  // Set range based on difficulty
  const range = difficulty === "easy" ? 20 : difficulty === "medium" ? 30 : 50;
  secretNumber = Math.trunc(Math.random() * range) + 1; // Generate a new secret number

  // Update UI with new number range
  document.querySelector(".between").textContent = `(Between 1 and ${range})`;
});
