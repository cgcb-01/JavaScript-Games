const gameBoard = document.getElementById('game-board');
const startButton = document.getElementById('start-btn');

// Step 1: Generate 14 unique letters, then duplicate for 28 cards
const uniqueLetters = 'ABCDEFGHIJKLMN'.split('');
const letters = [...uniqueLetters, ...uniqueLetters];

// Step 2: Shuffle the letters randomly
letters.sort(() => Math.random() - 0.5);

// Step 3: Create 4 rows manually with 7 cards each
let index = 0;
for (let row = 0; row < 7; row++) {
  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');

  for (let col = 0; col < 4; col++) {
    const card = document.createElement('div');
    card.classList.add('card', 'flipped');
    card.setAttribute('data-letter', letters[index]);

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front"></div>
        <div class="card-back">${letters[index]}</div>
      </div>
    `;

    rowDiv.appendChild(card);
    index++;
  }

  gameBoard.appendChild(rowDiv);
}

// Game logic
let flipped = [];
let lockBoard = true;

function enableCardFlipping() {
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      if (lockBoard || card.classList.contains('flipped') || card.classList.contains('matched')) return;

      card.classList.add('flipped');
      flipped.push(card);

      if (flipped.length === 2) {
        const [a, b] = flipped;
        if (a.dataset.letter === b.dataset.letter) {
          a.classList.add('matched');
          b.classList.add('matched');
          flipped = [];
        } else {
          lockBoard = true;
          setTimeout(() => {
            a.classList.remove('flipped');
            b.classList.remove('flipped');
            flipped = [];
            lockBoard = false;
          }, 800);
        }
      }
    });
  });
}

startButton.addEventListener('click', () => {
  lockBoard = false;
  document.querySelectorAll('.card').forEach(card => {
    setTimeout(() => {
      card.classList.remove('flipped');
    }, 300);
  });
  startButton.style.display = 'none';
  enableCardFlipping();
});
