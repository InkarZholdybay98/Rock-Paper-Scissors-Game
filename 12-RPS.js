let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();
let isAutoPlaying = false;
let intervalId;

document.querySelector(".js-auto-play").addEventListener("click", () => {
  autoPlay();
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "a") {
    autoPlay();
  }
});
function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector(".js-auto-play").innerHTML = "Stop playing";
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector(".js-auto-play").innerHTML = "Auto Play";
  }
}

document.querySelector(".js-rock-button").addEventListener("click", () => {
  playGame("rock");
});

document.querySelector(".js-paper-button").addEventListener("click", () => {
  playGame("paper");
});

document.querySelector(".js-scissors-button").addEventListener("click", () => {
  playGame("scissors");
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("rock");
  } else if (event.key === "p") {
    playGame("paper");
  } else if (event.key === "s") {
    playGame("scissors");
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = "";

  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lost.";
    } else if (computerMove === "paper") {
      result = "You won.";
    } else if (computerMove === "scissors") {
      result = "Tie.";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You won.";
    } else if (computerMove === "paper") {
      result = "Tie.";
    } else if (computerMove === "scissors") {
      result = "You lost.";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "You lost.";
    } else if (computerMove === "scissors") {
      result = "You won.";
    }
  }

  if (result === "You won.") {
    score.wins += 1;
  } else if (result === "You lost.") {
    score.losses += 1;
  } else if (result === "Tie.") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(
    ".js-moves"
  ).innerHTML = `You <img src="images/${playerMove}-emoji.png" class="move-icon" />
<img src="images/${computerMove}-emoji.png" class="move-icon" /> Computer`;
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins} , Losses :${score.losses} , Ties ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = "";
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }

  return computerMove;
}

function resetScore() {
  document.querySelector(
    ".reset-question"
  ).innerHTML = `Are you sure to reset the score? <button class = 'yesBtn'>Yes</button> <button class = 'noBtn'>No</button>`;

  const yesElement = document.querySelector(".yesBtn");
  const noElement = document.querySelector(".noBtn");

  yesElement.addEventListener("click", () => {
    score.losses = 0;
    score.ties = 0;
    score.wins = 0;
    localStorage.removeItem("score");
    updateScoreElement();
    document.querySelector(".reset-question").innerHTML = ``;
  });

  noElement.addEventListener("click", () => {
    document.querySelector(".reset-question").innerHTML = ``;
  });
}

document.querySelector(".js-reset-button").addEventListener("click", () => {
  resetScore();
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    resetScore();
  }
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
  }
});

noElement.addEventListener("click", () => {
  document.querySelector(".reset-question").innerHTML = ``;
});
