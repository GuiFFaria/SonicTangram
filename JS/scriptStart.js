function addTangramPieces() {
    //create box
    const box = document.createElement('div')
    box.classList.add('box')
    //add tangram pieces
    for (let i = 0; i < 7; i++) {
        const piece = document.createElement('img')
        piece.classList.add('shape', 'tangram-piece')
        piece.setAttribute('id', `piece${i+1}`)
        piece.src = `../tangram_pieces/p${i+1}.svg`
        box.appendChild(piece)
        
    }

    document.body.appendChild(box)
}

function main() {
    addTangramPieces()
}

main()

const pieces = document.querySelectorAll(".tangram-piece");


pieces.forEach((shape) => {
    startMovement(shape);
});

function startMovement(shape) {
    let posX = Math.random() * (window.innerWidth - shape.clientWidth);
    let posY = Math.random() * (window.innerHeight - shape.clientHeight);
    let velX = Math.random() * 5 - 2;
    let velY = Math.random() * 5 - 2;

    function movePiece() {
        const maxWidth = window.innerWidth - shape.clientWidth;
        const maxHeight = window.innerHeight - shape.clientHeight;

        posX += velX;
        posY += velY;

        if (posX > maxWidth || posX < 0) {
            velX = -velX;
        }
        if (posY > maxHeight || posY < 0) {
            velY = -velY;
        }

        shape.style.left = posX + "px";
        shape.style.top = posY + "px";

        requestAnimationFrame(movePiece);
    }

    movePiece(); // Inicia o movimento contínuo das peças
    console.log("movePiece");
}


