gridDiv = document.querySelector('.grid-div');

window.onload = () => {
  addGridCards(16);
}

function addGridCards(num) {
  gridDiv.style.gridTemplateColumns = `repeat(${num}, 1fr)`;
  gridDiv.style.gridTemplateRows = `repeat(${num}, 1fr)`;

  for (let i = 0; i < num ** 2; i++) {
    const gridCard = document.createElement('div');
    gridCard.classList.add('grid-card');

    gridDiv.appendChild(gridCard);
  }
}

function changeGridNum(num) {
  while (gridDiv.firstChild) {
    gridDiv.removeChild(gridDiv.firstChild);
  }

  addGridCards(num);
}
