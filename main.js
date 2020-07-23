const launch = document.getElementById("game-start");
const gameDesk = document.getElementById("game");
let wins = 0;
let loses = 0;
let draws = 0;
const computerPlay = () => {
  const computerOptionGenerator = Math.floor(Math.random() * 120) + 1;
  return computerOptionGenerator <= 40
    ? [0, "rock"]
    : computerOptionGenerator <= 80
    ? [1, "scissors"]
    : [2, "paper"];
};
const playerChoice = (clickTarget) => {
  /* if (clickTarget.id === 'rock') return [0, 'rock'];
  if (clickTarget.id === 'scissors') return [1, 'scissors'];
  if (clickTarget.id === 'paper') return [2, 'paper'];
  return; */
  return clickTarget.id === 'rock' ? [0, 'rock'] : clickTarget.id === 'scissors' ? [1, 'scissors'] : clickTarget.id === 'paper' ? [2, 'paper'] : '';
}
const compare = (playerPick, botPick) => {
  if (playerPick[0] - botPick[0] === 1 || playerPick[0] - botPick[0] === -2) return [`Player picked ${playerPick[1]}.`, `Bot picked ${botPick[1]}.`, `Bot wins!`];
  if (playerPick[0] - botPick[0] === -1 || playerPick[0] - botPick[0] === 2) return [`Player picked ${playerPick[1]}.`, `Bot picked ${botPick[1]}.`, `Player wins!`];
  if (playerPick[0] - botPick[0] === 0) return [`Player picked ${playerPick[1]}.`, `Bot picked ${botPick[1]}.`, `That's a draw!`];
}
const messageBoard = (player, bot, result, score) => {
  const playerContainer = document.querySelector("#playerMove");
  const resultContainer = document.querySelector("#result");
  const botContainer = document.querySelector("#botMove");
  if (botContainer.contains(botContainer.querySelector('p'))) {
    playerContainer.removeChild(playerContainer.querySelector('p'));
    resultContainer.removeChild(resultContainer.querySelector('p'));
    botContainer.removeChild(botContainer.querySelector('p'));
  }
  const playerContent = document.createElement('p');
  playerContent.textContent = player;
  playerContainer.appendChild(playerContent);

  const botContent = document.createElement('p');
  botContent.textContent = bot;
  botContainer.appendChild(botContent);

  const resultContent = document.createElement('p');
  resultContent.textContent = result;
  resultContainer.appendChild(resultContent);
  const results = document.querySelector("#score");
  if (results.contains(results.querySelector("p"))) results.removeChild(results.querySelector("p"));
  const scores = document.createElement('p');
  if (score.includes('draw')) draws++;
  if (score.includes('Player')) wins++;
  if (score.includes('Bot')) loses++;

  scores.textContent = `Wins: ${wins}. Loses: ${loses}. Draws: ${draws}`;
  results.appendChild(scores);
}
const playRound = () => gameDesk.addEventListener('click', (click) => {
  const playerPick = playerChoice(click.target);
  const botPick = computerPlay();
  const play = compare(playerPick, botPick);
  /* scoreBoard(play[2]); */
  messageBoard(play[0], play[1], play[2], play[2]);
})


launch.addEventListener("click", () => {
  launch.classList.add("toggle");
  launch.addEventListener("transitionend", (e) => {
    if (e.propertyName !== "opacity") return;
    launch.style.display = "none";
    gameDesk.classList.add("started");
  });
  playRound();
});


