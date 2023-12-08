function addTangramPieces() {
    // Create box
    const box = document.createElement('div')
    box.classList.add('box')

    // Add tangram pieces
    for (let i = 0; i < 7; i++) {
        const container = document.createElement('div')
        container.setAttribute('id', `gesture-area-${i+1}`)
        container.classList.add('container')

        const piece = document.createElement('img')
        piece.classList.add('shape', 'prevent-select', 'tangram-piece')
        piece.setAttribute('id', `piece${i+1}`)
        piece.src = `../tangram_pieces/p${i+1}.svg`

        // Set random position within the visible screen area
        const randomPosition = getRandomPosition();
        container.style.left = randomPosition.x + 'px';
        container.style.top = randomPosition.y + 'px';

        container.appendChild(piece)
        box.appendChild(container)
    }

    document.body.appendChild(box)
}

function getRandomPosition() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const randomX = Math.floor(Math.random() * (screenWidth - 50)); // Adjust as needed
    const randomY = Math.floor(Math.random() * (screenHeight - 50)); // Adjust as needed

    return { x: randomX, y: randomY };
}

function main() {
    addTangramPieces()
}

main()
