window.onload = () => {
  window.addEventListener('keydown', keydownDetected);
  window.addEventListener('mousedown', mouseDownHandler);
  window.addEventListener('mouseup', mouseUpHandler);

  selectPen();
  
  addGridCards(16);

  toggleGrid(document.getElementById('ctrl-grid'));
  toggleHover(document.getElementById('ctrl-hover'));
  toggleLock(document.getElementById('ctrl-lock'));
}

function keydownDetected(e) {
  switch (e.keyCode) {
    case (49):
    case (80):
      selectPen();
      break;
    case (50):
    case (69):
      selectEraser();
      break;
    case (51):
    case (82):
      selectRGB();
      break;
    case (52):
    case (71):
      toggleGrid(document.getElementById('ctrl-grid'));
      break;
    case (53):
    case (72):
      toggleHover(document.getElementById('ctrl-hover'));
      break;
    case (54):
    case (76):
      toggleLock(document.getElementById('ctrl-lock'));
  }
}

let mouseDown = 0;

function mouseDownHandler(e) {
  e.preventDefault();
  ++mouseDown;

  gridCardHovered(e);
}

function mouseUpHandler(e) {
  --mouseDown;
}

function gridCardHovered(e) {
  if (mouseDown === 1) {
    if (document.querySelector('#select-pen').classList.contains('active')) {
      e.target.style.backgroundColor = 'black';
    } else if (document.querySelector('#select-eraser').classList.contains('active')) {
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

function toggleGrid(gridBtn) {
  const gridCards = document.querySelectorAll('.grid-card');
  if (!gridBtn.classList.contains('active')) {
    gridBtn.classList.add('active');

    for (let card in gridCards) {
      if (gridCards[card].classList !== undefined) gridCards[card].classList.add('bordered-grid-card');
    }
  }
  else {
    gridBtn.classList.remove('active');

    for (let card in gridCards) {
      if (gridCards[card].classList !== undefined) gridCards[card].classList.remove('bordered-grid-card');
    }
  }
}

function toggleHover(hoverBtn) {
  if (!hoverBtn.classList.contains('active')) {
    hoverBtn.classList.add('active');
  } else {
    hoverBtn.classList.remove('active');
  }
}

function toggleLock(lockBtn) {
  const slider = document.querySelector('.slider');
  slider.disabled = !slider.disabled;
  if (slider.disabled) lockBtn.classList = 'ctrl-card active';
  else lockBtn.classList = 'ctrl-card';
}

function selectPen() {
  document.querySelector('#select-pen').classList.add('active');
  document.querySelector('#select-eraser').classList.remove('active');
  document.querySelector('#select-rgb').classList.remove('active');
}

function selectEraser() {
  document.querySelector('#select-pen').classList.remove('active');
  document.querySelector('#select-eraser').classList.add('active');
  document.querySelector('#select-rgb').classList.remove('active');
}

function selectRGB() {
  document.querySelector('#select-pen').classList.remove('active');
  document.querySelector('#select-eraser').classList.remove('active');
  document.querySelector('#select-rgb').classList.add('active');
}

function selectClear() {
  const gridCards = document.querySelectorAll('.grid-card');
  for (let card in gridCards) {
    gridCards[card].style.backgroundColor = 'white';
  }
}
