"use strict";

//Global Variable - Everyone starts at 0 points
let playerScore = 0;
let computerScore = 0;
let roundWinner = "";

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    roundWinner = "tie";
  }
  if (
    (playerSelection === "ROCK" && computerSelection === "SCISSORS") ||
    (playerSelection === "SCISSORS" && computerSelection === "PAPER") ||
    (playerSelection === "PAPER" && computerSelection === "ROCK")
  ) {
    playerScore++; //the player score increases based on the if statement
    roundWinner = "player"; //the round winner is named 'player
  }
  if (
    (computerSelection === "ROCK" && playerSelection === "SCISSORS") ||
    (computerSelection === "SCISSORS" && playerSelection === "PAPER") ||
    (computerSelection === "PAPER" && playerSelection === "ROCK")
  ) {
    computerScore++;
    roundWinner = "computer";
  }
  updateScoreMessage(roundWinner, playerSelection, computerSelection);
}

//Computer function that takes in a random input from the computer
function computerPlay() {
  const arrOfChoices = ["ROCK", "PAPER", "SCISSORS"];
  const randomNum = Math.floor(Math.random() * arrOfChoices.length);
  const compChoice = arrOfChoices[randomNum];
  return compChoice;
}

function isGameOver() {
  return playerScore === 5 || computerScore === 5;
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//Starting elements
const playerScoreEl = document.querySelector("#player--0");
const computerScoreEl = document.querySelector("#computer--0");
const playerSelectionEl = document.querySelector("#player--sign");
const computerSelectionEl = document.querySelector("#computer--sign");
const btnRock = document.querySelector(".btn--rock");
const btnPaper = document.querySelector(".btn--paper");
const btnScissors = document.querySelector(".btn--scissors");
const scoreMessage = document.querySelector("#score--info");
const scoreInfo = document.querySelector("#info");

//Starting conditions
// const playerScore1 = (playerScoreEl.textContent = 0);
// const computerScore1 = (computerScoreEl.textContent = 0);

btnRock.addEventListener("click", () => handleClick("ROCK")); //Made a rock button event listener, when you click, the function gets called
btnPaper.addEventListener("click", () => handleClick("PAPER"));
btnScissors.addEventListener("click", () => handleClick("SCISSORS"));

function handleClick(playerSelection) {
  if (isGameOver()) {
    openEndGameModal();
    return; //check this out later
  }

  const computerSelection = computerPlay(); //Computer selects a random number to be displayed using the computerPlay function;
  playRound(playerSelection, computerSelection); //Calls the playRound function above and inputs the playerSelection and computerSelection
  updateChoices(playerSelection, computerSelection); //Changes the choices of the players and computers to emojis
  updateScore();

  if (isGameOver()) {
    openEndGameModal();
    setFinalMessage();
  }
}
function updateChoices(playerSelection, computerSelection) {
  switch (playerSelection) {
    case "ROCK":
      playerSelectionEl.textContent = "✊";
      break;
    case "PAPER":
      playerSelectionEl.textContent = "✋";
      break;
    case "SCISSORS":
      playerSelectionEl.textContent = "✌️";
      break;
  }
  switch (computerSelection) {
    case "ROCK":
      computerSelectionEl.textContent = "✊";
      break;
    case "PAPER":
      computerSelectionEl.textContent = "✋";
      break;
    case "SCISSORS":
      computerSelectionEl.textContent = "✌️";
      break;
  }
}

function updateScore() {
  if (roundWinner === "tie") {
    scoreInfo.textContent = "It's a tie!";
  } else if (roundWinner === "player") {
    scoreInfo.textContent = "You won!";
  } else if (roundWinner === "computer") {
    scoreInfo.textContent === "You lost!";
  }

  playerScoreEl.textContent = `Player: ${playerScore}`;
  computerScoreEl.textContent = `Computer: ${computerScore}`;
}

function updateScoreMessage(winner, playerSelection, computerSelection) {
  if (winner === "player") {
    scoreMessage.textContent = `${capitalizeFirstLetter(
      playerSelection
    )} beats ${computerSelection.toLowerCase()}`;
    return;
  }
  if (winner === "computer") {
    scoreMessage.textContent = `${capitalizeFirstLetter(
      playerSelection
    )} is beaten by ${computerSelection.toLowerCase()}`;
    return;
  }

  scoreMessage.textContent = `${capitalizeFirstLetter(
    playerSelection
  )} ties with ${computerSelection.toLowerCase()}`;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
