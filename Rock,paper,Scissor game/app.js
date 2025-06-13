// The concept to be used here is:
// The gamefield will be displayed and the choose will be hidden initially 
// Play button on click will make choose field displayed and gamefield display=none
// on choosing any symbols store the button[i] then make the choose field none and show gamefield.
// save the i of button chosen by user.
// List of img src. random value between 1 to 3.
// choose the index of the list acc to random value .
// so user image index is i .
// load game field ->ratate the stone image twice then change the img.src to new src.
// if i=random value by computer draw.
//and as the rule is applied apply winner rules.

const stone = "https://raw.githubusercontent.com/cgcb-01/JAVASCRIPT_Project/refs/heads/main/Rock%2Cpaper%2CScissor%20game/images/Screenshot%202025-06-06%20001432.png";
const scissor = "https://raw.githubusercontent.com/cgcb-01/JAVASCRIPT_Project/refs/heads/main/Rock%2Cpaper%2CScissor%20game/images/Screenshot%202025-06-06%20001900.png";
const paper = "https://raw.githubusercontent.com/cgcb-01/JAVASCRIPT_Project/refs/heads/main/Rock%2Cpaper%2CScissor%20game/images/Screenshot%202025-06-06%20001814.png";

const img = [stone, paper, scissor];

const play = document.querySelector(".play");
const gamefield = document.querySelector(".gamefield");
const choose = document.querySelector(".choose");
const userchoice = document.querySelectorAll('.imgChoice button');
const resultDiv = document.querySelector('.result');
const resultH1 = resultDiv.querySelector('h1');
const resultP = resultDiv.querySelector('p');
const backBtn = document.querySelector('.back');

let totalMatches = 0;
let userWins = 0;

// PLAY NOW button shows choices
play.addEventListener("click", chooseOp);

// BACK button brings back main screen
backBtn.addEventListener("click", () => {
  gamefield.style.display = "none";
  choose.style.display = "none";
  play.style.display = "inline-block";
  resultDiv.style.display = "none";
});

function chooseOp() {
  gamefield.style.display = "none";
  choose.style.display = "flex";
  resultDiv.style.display = "none";

  // Remove old listeners
  userchoice.forEach((button, index) => {
    button.replaceWith(button.cloneNode(true));
  });

  const newButtons = document.querySelectorAll('.imgChoice button');

  newButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      gameop(index); 
    });
  });

  const exitBtn = document.querySelector('.exit');

exitBtn.addEventListener("click", () => {
  choose.style.display = "none";
  gamefield.style.display = "flex";
  resultDiv.style.display = "none";

  // Show home screen
  play.style.display = "inline-block";
});
}

function gameop(i) {
  const userImg = document.querySelector(".user .gameimg");
  const pcImg = document.querySelector(".pc .gameimg");

  // Reset image classes and animations
  userImg.classList.remove("shrink");
  pcImg.classList.remove("shrink");

  //  Force reflow to restart animation
  userImg.style.animation = "none";
  pcImg.style.animation = "none";
  void userImg.offsetWidth; // Trigger reflow
  void pcImg.offsetWidth;

  //  Re-apply animation
  userImg.style.animation = "plmove 1s infinite";
  pcImg.style.animation = "pcmove 1s infinite";

  // Showing both as stone temporarily
  userImg.src = stone;
  pcImg.src = stone;

  gamefield.style.display = "flex";
  choose.style.display = "none";
  play.style.display = "none";
  resultDiv.style.display = "none";

  setTimeout(() => {
    let j = Math.floor(Math.random() * 3);

    userImg.src = img[i];
    pcImg.src = img[j];

    // Stop animation and shrink
    userImg.classList.add("shrink");
    pcImg.classList.add("shrink");
    userImg.style.animation = "none";
    pcImg.style.animation = "none";

    // Update match count and result
    totalMatches++;
    let result = getResult(i, j);
    if (result === "You Win!") userWins++;

    // Show result
    resultH1.textContent = result;
    resultP.textContent = `Score: ${userWins} / ${totalMatches}`;
    resultDiv.style.display = "flex";
  }, 1000);

  const continueBtn = document.querySelector(".result button");
  continueBtn.addEventListener("click", () => {
    resultDiv.style.display = "none";
    choose.style.display = "flex";
    gamefield.style.display = "none";
  })
}



function getResult(user, pc) {
  if (user === pc) return "Draw!";
  if (
    (user === 0 && pc === 2) || 
    (user === 1 && pc === 0) || 
    (user === 2 && pc === 1)
  ) {
    return "You Lose!";
  }
  return "You Win!";
}
