var playerName;
var roundsToPlay;

// Intro page to select player name and rounds to play
function chooseRound() {
    const roundMenu = document.getElementById("roundMenu");
    roundMenu.innerHTML = `<input id="inputName" type="text" placeholder="Player Name">`
    const inputName = document.getElementById("inputName");
    const selection = document.createElement("select");
    roundMenu.append(selection);
    for (let i = 0; i < 3; i++) {
        var num = (i * 2) + 3;
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
        playerName = inputName.value;
        roundsToPlay = selection.value;
        roundMenu.remove();
        inputName.remove();
        selection.remove();
        startBtn.remove();
        window.onpageshow = createBoard();
    })
}

function createBoard() {
    // Creating 3x3 tic tac toe board
    const board = document.getElementById("board");
    for (let i = 0; i < 3; i++) {
        const row = document.createElement("div");
        row.className = "row";
        board.appendChild(row);
        for (let j = 0; j < 3; j++) {
            const box = document.createElement("div");
            box.className = "box";
            row.appendChild(box);
        }
    }

    // Creating the menu score board
    const span = document.querySelector("span");
    const hr = document.createElement("hr");
    const menu = document.createElement("div");
    const playerScore = document.createElement("h2");
    const computerScore = document.createElement("h2");
    const round = document.createElement("h2");
    playerScore.innerHTML = `${playerName}: `;
    computerScore.innerHTML = "Computer: ";
    round.innerHTML = `Best out of ${roundsToPlay} Rounds!`;
    span.append(hr);
    hr.appendChild(menu);
    menu.append(playerScore, computerScore, round);
}

window.onpageshow = chooseRound();