var playerName;
var roundsToPlay;

// Intro page to select player name and rounds to play
function chooseRound() {
  const roundMenu = document.getElementById("roundMenu");
  roundMenu.innerHTML = `<input id="inputName" type="text" placeholder="Player Name" title="Enter Player name 4-12 characters.">`;
  const inputName = document.getElementById("inputName");
  const selection = document.createElement("select");
  roundMenu.append(selection);
  for (let i = 0; i < 3; i++) {
    var num = i * 2 + 3;
    const roundOption = document.createElement("option");
    roundOption.value = num;
    roundOption.innerHTML = `${num} Rounds`;
    if (i === 1) {
      roundOption.selected = true;
    }
    selection.append(roundOption);
  }
  const startBtn = document.createElement("button");
  startBtn.innerHTML = "Play Game";
  startBtn.id = "startBtn";
  roundMenu.append(startBtn);

  startBtn.addEventListener("click", function (event) {
    if (inputName.value !== "") {
      playerName = inputName.value;
      localStorage.setItem("playerName", playerName);
      roundsToPlay = selection.value;
      roundMenu.removeChild(inputName);
      roundMenu.removeChild(selection);
      roundMenu.removeChild(startBtn);
      window.onload = createBoard();
    } else {
      alert("Please fill in your player name.");
      return;
    }
  });
}

// Global variables and elements
var pScore = 0;
var cScore = 0;
let roundEnded = false;
const boardEl = document.getElementById("board");
const span = document.querySelector("span");
const result = document.createElement("div");
const hr = document.createElement("hr");
const menu = document.createElement("div");
const playerScore = document.createElement("h2");
const computerScore = document.createElement("h2");
const round = document.createElement("h2");

function createBoard() {
  // Creating the menu score board
  result.id = "result";
  playerScore.innerHTML = `${playerName}: ${score.X}`;
  playerScore.id = "pScore";
  computerScore.innerHTML = `Computer: ${score.O}`;
  computerScore.id = "cScore";
  round.innerHTML = `Best out of ${roundsToPlay} Rounds!`;
  span.append(result, hr);
  hr.appendChild(menu);
  menu.append(playerScore, computerScore, round);

  // Creating 3x3 tic tac toe board
  for (let i = 0; i < 3; i++) {
    const row = document.createElement("div");
    row.className = "row";
    row.id = `row${i}`;
    boardEl.appendChild(row);
    for (let j = 0; j < 3; j++) {
      const box = document.createElement("div");
      box.className = "box";
      box.id = `cell${i}${j}`;
      box.setAttribute("onclick", `makeMove(${i},${j})`);
      row.appendChild(box);
    }
  }
}
const board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let score = {
  X: 0,
  O: 0,
};

const player = document.createElement("p");
player.value = "X";
const comp = document.createElement("p");
comp.value = "O";
let currentPlayer = "";
currentPlayer = player.value;
let gameOver = false;

function makeMove(row, col) {
  if (!gameOver && board[row][col] === "") {
    board[row][col] = currentPlayer;
    document.getElementById(`cell${row}${col}`).textContent = currentPlayer;
    if (checkWinner(row, col)) {
      document.getElementById(
        "result"
      ).textContent = `Player ${currentPlayer} wins!`;
      score[currentPlayer]++;
      gameOver = true;
      updateScore();
      resetBtn();
      checkRoundEnded(score[currentPlayer]);
    } else if (isBoardFull()) {
      document.getElementById("result").textContent = "It's a draw!";
      gameOver = true;
      resetBtn();
    } else {
      currentPlayer =
        currentPlayer === `${player.value}`
          ? `${comp.value}`
          : `${player.value}`;
      if (currentPlayer === `${comp.value}` && !gameOver) {
        setTimeout(computerMove, 100);
      }
    }
  }
}
const reset = document.createElement("button");
function resetBtn() {
  reset.setAttribute("onclick", "resetGame()");
  reset.id = "resetBtn";
  reset.textContent = "Play Again";
  span.append(reset);
}

function resetBoard(currentBoard) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      currentBoard[i][j] = "";
    }
  }
}

function checkWinner(row, col) {
  return (
    checkLine(0, col, 1, 0) ||
    checkLine(row, 0, 0, 1) ||
    (row === col && checkLine(0, 0, 1, 1)) ||
    (row + col === 2 && checkLine(0, 2, 1, -1))
  );
}

const restartBtn = document.createElement("button");
function checkRoundEnded(checkScore) {
  restartBtn.id = "restartBtn";
  restartBtn.innerHTML = "Restart";
  if (roundsToPlay == checkScore) {
    if (score.X > score.O) {
      alert("Player Wins! Game Over");
    } else {
      alert("Computer Wins! Game Over");
    }
    span.append(restartBtn);
    document.getElementById("resetBtn").disabled = true;
  }
  restartBtn.addEventListener("click", function (event) {
    // set values to initial
    document.getElementById("resetBtn").disabled = false;
    gameOver = false;
    score.X = 0; // parseInt(localStorage.getItem("userScore")) || 0; // get user's score from local storage, if empty set to 0 // = 0;
    score.O = 0; // parseInt(localStorage.getItem("compScore")) || 0; // get computers's score from local storage, if empty set to 0 // = 0;
    currentPlayer = player.value;
    document.getElementById("result").textContent = "";
    resetBoard(board);
    setBackToSelection();
    chooseRound();
  });
}

function setBackToSelection() {
  for (let i = 2; i >= 0; i--) {
    const row = document.getElementById(`row${i}`);
    for (let j = 2; j >= 0; j--) {
      const box = document.getElementById(`cell${i}${j}`);
      row.removeChild(box);
    }
    boardEl.removeChild(row);
  }
  span.removeChild(reset);
  span.removeChild(restartBtn);
  menu.removeChild(playerScore);
  menu.removeChild(computerScore);
  menu.removeChild(round);
  hr.removeChild(menu);
  span.removeChild(result);
  span.removeChild(hr);
}

function checkLine(startRow, startCol, rowStep, colStep) {
  for (let i = 0; i < 3; i++) {
    if (board[startRow][startCol] !== currentPlayer) {
      return false;
    }
    startRow += rowStep;
    startCol += colStep;
  }
  return true;
}

function isBoardFull() {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === "") {
        return false;
      }
    }
  }
  return true;
}

function updateScore() {
  document.getElementById("pScore").textContent = `${playerName}: ${score.X}`;
  localStorage.setItem("userScore", pScore); // update player score in local storage
  document.getElementById("cScore").textContent = `Computer: ${score.O}`;
  localStorage.setItem("compScore", cScore); // update computer score in local storage
}

function resetGame() {
  board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      board[rowIndex][colIndex] = "";
      document.getElementById(`cell${rowIndex}${colIndex}`).textContent = "";
    });
  });
  const reset = document.getElementById("resetBtn");
  reset.remove();
  document.getElementById("result").textContent = "";
  currentPlayer = "X";
  gameOver = false;
  if (currentPlayer === "O") {
    setTimeout(computerMove, 500);
  }
}

function computerMove() {
  if (!gameOver) {
    let emptyCells = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === "") {
          emptyCells.push({ row, col });
        }
      }
    }

    if (emptyCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      const { row, col } = emptyCells[randomIndex];
      makeMove(row, col);
    }
  }
}

/* Save game state */
function saveGame() {
  // save current game state into JSON elements
  var state = {
    userBoard: boardEl,
    roundState: roundEnded,
    userCurrRound: round,
    userRounds: roundsToPlay,
    userName: playerName,
    saveScore: score,
  };
  if (localStorage) {
    // if browser supports local storage
    localStorage.setItem("saveState", JSON.stringify(state)); // save game as JSON in local storage
  }
}
/* Load game state */
function loadGame() {
  if (localStorage) {
    // if browser supports local storage
    var state = JSON.parse(localStorage.getItem("saveState")); // parse JSON elements from local storage
    // update elements to saved items from local storage
    boardEl = state.userBoard;
    roundEnded = state.roundState;
    round = state.userCurrRound;
    roundsToPlay = state.userRounds;
    playerName = state.userName;
    score = state.saveScore;

    createBoard(); // create new board using local storage data
  } else {
    // else if local storage is not populated
    chooseRound(); // go to round menu
  }
}

/* 
  changed to loadGame() so it can apply localStorage logic
*/
window.onload = loadGame(); // chooseRound();
