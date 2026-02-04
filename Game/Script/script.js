const moves = ["rock", "paper", "scissors", "lizard", "spock"];

const rules = {
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
  lizard: ["paper", "spock"],
  spock: ["rock", "scissors"]
};

let game = {
  mode: null,
  winsNeeded: 0,
  round: 1,
  p1Score: 0,
  p2Score: 0,
  currentPlayer: 1,
  p1Move: null,
  active: false
};

const buttons = document.querySelectorAll("[data-move]");
const turn = document.getElementById("turn");
const roundText = document.getElementById("round");
const scoreText = document.getElementById("score");
const resultText = document.getElementById("result");

disableButtons();

document.getElementById("startGame").onclick = startGame;
document.getElementById("resetGame").onclick = resetGame;

buttons.forEach(btn => {
  btn.onclick = () => handleMove(btn.dataset.move);
});

function startGame() {
  const totalRounds = parseInt(document.getElementById("rounds").value);
  game.mode = document.getElementById("gameMode").value;
  game.winsNeeded = Math.ceil(totalRounds / 2);

  resetState();
  game.active = true;
  enableButtons();
  updateUI();
}

function handleMove(move) {
  if (!game.active) return;

  if (game.mode === "cpu") {
    playCpuRound(move);
  } else {
    playMultiplayerRound(move);
  }
}

function playCpuRound(playerMove) {
  const cpuMove = randomMove();
  showMoves(playerMove, cpuMove);
  resolveRound(playerMove, cpuMove);
}

function playMultiplayerRound(move) {
  if (game.currentPlayer === 1) {
    game.p1Move = move;
    game.currentPlayer = 2;
    turn.textContent = "Player 2's turn";
  } else {
    showMoves(game.p1Move, move);
    resolveRound(game.p1Move, move);
    game.currentPlayer = 1;
    game.p1Move = null;
  }
}

function resolveRound(p1, p2) {
  let roundResult = "";

  if (p1 === p2) {
    roundResult = "Round tied";
  } 
  else if (rules[p1].includes(p2)) {
    game.p1Score++;
    roundResult = "Player 1 won this round";
  } 
  else {
    game.p2Score++;
    roundResult =
      game.mode === "cpu"
        ? "CPU won this round"
        : "Player 2 won this round";
  }

  resultText.textContent += ` → ${roundResult}`;

  game.round++;
  updateUI();
  checkMatchWinner();
}

function checkMatchWinner() {
  if (game.p1Score === game.winsNeeded) {
    resultText.textContent = "🏆 Player 1 wins the match!";
    endGame();
  } 
  else if (game.p2Score === game.winsNeeded) {
    resultText.textContent =
      game.mode === "cpu"
        ? "🏆 CPU wins the match!"
        : "🏆 Player 2 wins the match!";
    endGame();
  }
}

function updateUI() {
  roundText.textContent = `Round: ${game.round}`;
  scoreText.textContent = `Player 1: ${game.p1Score} | ${
    game.mode === "cpu" ? "CPU" : "Player 2"
  }: ${game.p2Score}`;

  turn.textContent =
    game.mode === "cpu"
      ? "Your turn"
      : `Player ${game.currentPlayer}'s turn`;
}

function showMoves(p1, p2) {
  resultText.textContent =
    `Player 1 chose ${p1.toUpperCase()} | ${
      game.mode === "cpu" ? "CPU" : "Player 2"
    } chose ${p2.toUpperCase()}`;
}

function endGame() {
  game.active = false;
  disableButtons();
}

function resetState() {
  game.round = 1;
  game.p1Score = 0;
  game.p2Score = 0;
  game.currentPlayer = 1;
  game.p1Move = null;
  resultText.textContent = "";
}

function resetGame() {
  resetState();
  game.active = false;
  disableButtons();
  turn.textContent = "";
  roundText.textContent = "";
  scoreText.textContent = "";
}

function randomMove() {
  return moves[Math.floor(Math.random() * moves.length)];
}

function disableButtons() {
  buttons.forEach(b => (b.disabled = true));
}

function enableButtons() {
  buttons.forEach(b => (b.disabled = false));
}

function toggleRules() {
  document.getElementById("rules").classList.toggle("hidden");
}

