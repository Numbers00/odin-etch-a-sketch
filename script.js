window.onload = () => {
  gridDiv = document.querySelector('.grid-div');
  gridDiv.style.gridTemplateColumns = 'repeat(16, 1fr)';
  gridDiv.style.gridTemplateRows = 'repeat(16, 1fr)';

  for (let i = 0; i < 256; i++) {
    const gridCard = document.createElement('div');
    gridCard.classList.add('grid-card');

    gridDiv.appendChild(gridCard);
  }
}