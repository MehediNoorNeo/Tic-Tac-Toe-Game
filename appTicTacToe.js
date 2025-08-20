let board = document.querySelector('.board');
let cells = document.querySelectorAll('.cell');
let statusDisplay = document.querySelector('.status');
let restartBtn = document.getElementById('restartBtn');

// Winning patterns
let winningPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let currentPlayer = 'X';
let gameActive = true;

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Initialize game state
function initGame() {
    currentPlayer = 'X';
    gameActive = true;
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('taken');
        cell.classList.remove('winner');
    });
}

// Handle cell click
function handleCellClick(event) {
    const cell = event.target;
    if (!cell.classList.contains('taken') && gameActive) {
        cell.textContent = currentPlayer;
        if(cell.textContent === "X") {
            cell.style.color = "black";
        } else {
            cell.style.color = "white";
        }
        cell.classList.add('taken');
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
        checkWinner();
    }
}
// Check for a winner
function checkWinner() {
    for (let pattern of winningPattern) {
        let [a, b, c] = pattern;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            statusDisplay.textContent = `🎉 Player ${cells[a].textContent} wins!`;
            gameActive = false;
            // Highlight winning cells
            cells[a].classList.add('winner');
            cells[b].classList.add('winner');
            cells[c].classList.add('winner');
            cells.forEach(cell => {
                if (!cell.classList.contains('taken')) {
                    cell.classList.add('taken');
                }
            });
            return;
        }
    }
    // Check for a draw
    let cellsArray = Array.from(cells);
    if (cellsArray.every(cell => cell.classList.contains('taken'))) {
        statusDisplay.textContent = "It's a draw! 😲";
        gameActive = false;
        return;
    }
}

// Restart the game
restartBtn.addEventListener('click', initGame);

initGame(); // Initialize the game on page load