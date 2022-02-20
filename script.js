window.onload = () => {
  addGridCards(16);
}

function gridCardHovered(e) {
  if (document.querySelector('#ctrl-pen').classList.contains('active')) {
    e.target.style.backgroundColor = 'black';
  } else if (document.querySelector('#ctrl-eraser').classList.contains('active')) {
    e.target.style.backgroundColor = 'white';
  } else {
    if (e.target.style.backgroundColor !== '' && e.target.style.backgroundColor !== 'white') {
      let lightness = e.target.style.backgroundColor.split(',')[2].slice(0, -2);
      if (lightness !== 0) lightness -= 10;
      e.target.style.backgroundColor = `hsl(${[0,60,240][Math.floor(Math.random() * 3)]},100%,${lightness}%)`;
    } else {
      e.target.style.backgroundColor = `hsl(${[0,60,240][Math.floor(Math.random() * 3)]},100%,50%)`;
    }
  }
}

function addGridCards(num) {
  const gridDiv = document.querySelector('.grid-div');
  gridDiv.style.gridTemplateColumns = `repeat(${num}, 1fr)`;
  gridDiv.style.gridTemplateRows = `repeat(${num}, 1fr)`;

  for (let i = 0; i < num ** 2; i++) {
    const gridDiv = document.querySelector('.grid-div');

    const gridCard = document.createElement('div');
    gridCard.classList.add('grid-card');
    gridCard.addEventListener('mouseenter', gridCardHovered);

    gridDiv.appendChild(gridCard);
  }

  document.getElementById('grid-num-display').textContent = `${num}x${num}`;
}

function changeGridNum(num) {
  const gridDiv = document.querySelector('.grid-div');

  while (gridDiv.firstChild) {
    gridDiv.removeChild(gridDiv.firstChild);
  }

  addGridCards(num);
}

function toggleLock() {
  document.querySelector('.slider').disabled = !document.querySelector('.slider').disabled;
}

function selectPen() {
  document.querySelector('#ctrl-pen').classList.add('active');
  document.querySelector('#ctrl-eraser').classList.remove('active');
  document.querySelector('#ctrl-rgb').classList.remove('active');
}

function selectEraser() {
  document.querySelector('#ctrl-pen').classList.remove('active');
  document.querySelector('#ctrl-eraser').classList.add('active');
  document.querySelector('#ctrl-rgb').classList.remove('active');
}

function selectRGB() {
  document.querySelector('#ctrl-pen').classList.remove('active');
  document.querySelector('#ctrl-eraser').classList.remove('active');
  document.querySelector('#ctrl-rgb').classList.add('active');
}

function selectClear() {
  const gridCards = document.querySelectorAll('.grid-card');
  for (card in gridCards) {
    gridCards[card].style.backgroundColor = 'white';
  }
}
