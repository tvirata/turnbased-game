const hr = document.querySelector("hr");
const menu = document.createElement("div");
const playerScore = document.createElement("h2");
const computerScore = document.createElement("h2");
const round = document.createElement("h2");
playerScore.innerHTML = "Player:";
computerScore.innerHTML = "Computer: ";
round.innerHTML = "Round: ";
hr.appendChild(menu);
menu.append(playerScore, computerScore, round);


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