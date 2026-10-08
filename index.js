let gameOptions = {"rock": "🪨", "paper": "📄", "scissors": "✂️"};
let humanScore = 0;
let computerScore = 0;

let intervalID;

const humanChoice = document.getElementById("human-choice");
const botChoice = document.getElementById("bot-choice");

const buttons = document.querySelectorAll("#human .choices button");
const botLoad = document.getElementsByClassName("bot-loading")[0];
const resultBanner = document.getElementById("result");
const restartBtn = document.getElementById("restart");

const humanResult = document.getElementById("human-score");
const botResult = document.getElementById("bot-score");

function getComputerChoice() {
    const keys = Object.keys(gameOptions);
    return keys[Math.floor(Math.random() * keys.length)];
}

function startInterval() {
    intervalID = setInterval(() => {
        botLoad.textContent = gameOptions[getComputerChoice()];
    }, 100);    
}

function stopInterval() {
    clearInterval(intervalID);
    intervalID = null;
    botLoad.textContent = "";
}

function playRound(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) {
        return "It's a tie!";
    }

    if (
        (humanChoice === "rock" && computerChoice === "scissors") ||
        (humanChoice === "paper" && computerChoice === "rock") ||
        (humanChoice === "scissors" && computerChoice === "paper")
    ) {
        humanScore++;
        return `You win! ${humanChoice} beats ${computerChoice}`;

    } else {
        computerScore++;
        return `You lose! ${computerChoice} beats ${humanChoice}`;
    } 
}

function endGame() {
    buttons.forEach((btn) => (btn.disabled = true));
    resultBanner.textContent =
        humanScore > computerScore ? "You won the game! 🎉" : "You lost the game!";
    restartBtn.hidden = false;
}

function handleClick(event) {
    if (intervalID == null) return;
    stopInterval();

    const human = event.currentTarget.value;
    const bot = getComputerChoice();

    humanChoice.textContent = gameOptions[human];
    botChoice.textContent = gameOptions[bot];

    resultBanner.textContent = playRound(human, bot);
    
    humanResult.textContent = humanScore;
    botResult.textContent = computerScore;

    if (humanScore === 5 || computerScore === 5) {
        endGame();
    } else {
        setTimeout(startInterval, 1000);
    }
}

function restartGame() {
  humanScore = 0;
  computerScore = 0;

  humanResult.textContent = humanScore;
  botResult.textContent = computerScore;
  humanChoice.textContent = "";
  botChoice.textContent = "";
  resultBanner.textContent = "";

  buttons.forEach((btn) => (btn.disabled = false));
  restartBtn.hidden = true;

  startInterval();
}

buttons.forEach((btn) => btn.addEventListener("click", handleClick));
startInterval();
restartBtn.addEventListener("click", restartGame);