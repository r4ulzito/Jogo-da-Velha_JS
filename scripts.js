const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board-container]");
const winMsgTextElement = document.querySelector("[data-win-msg-text]");
const winMsgContainer = document.querySelector("[data-win-msg]");
const rstButton = document.querySelector("[data-rst-button]");

let isCircleTurn;

const winningCombinations = [
  //Combinações Horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //Combinações na Vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //Combinações na Diagonal
  [0, 4, 8],
  [2, 4, 6],
];

function startGame() {
  isCircleTurn = false;

  for (const cell of cellElements) {
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  }
  setBoardHoverClass();

  winMsgContainer.classList.remove("show-win-msg");
}

function endGame(isDraw) {
  if (isDraw) {
    winMsgTextElement.innerText = "Empate!";
  } else {
    winMsgTextElement.innerText = isCircleTurn ? "O Venceu!" : "X Venceu!";
  }

  winMsgContainer.classList.add("show-win-msg");
}

function checkWin(currentPlayer) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
}

function checkDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
}

function marker(cell, classToAdd) {
  cell.classList.add(classToAdd);
}

function setBoardHoverClass() {
  board.classList.remove("circle");
  board.classList.remove("x");

  if (isCircleTurn) {
    board.classList.add("circle");
  } else {
    board.classList.add("x");
  }
}

function swapTurns() {
  isCircleTurn = !isCircleTurn;
  setBoardHoverClass();
}

function handleClick(e) {
  // Coloca X ou Circulo
  const cell = e.target;
  const classToAdd = isCircleTurn ? "circle" : "x";
  marker(cell, classToAdd);
  //Verifica se um deles Ganhou
  const isWin = checkWin(classToAdd);

  //Verifica se Empatou
  const isDraw = checkDraw();
  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  } else {
    //Muda o Simbolo
    swapTurns();
  }
}

for (const cell of cellElements) {
  cell.addEventListener("click", handleClick, { once: true });
}

startGame();

rstButton.addEventListener("click", startGame);
