/* const pieces = document.querySelectorAll(".tangram-piece");

let speed = 0.7;

console.log(pieces);
pieces.forEach((shape) => {
    let isMoving = true; // Variável de controle para o movimento da peça
    shape.addEventListener("mousedown", () => {
        isMoving = !isMoving; // Inverte o estado da variável ao clicar na peça
        if (isMoving) {
            movePiece(); // Reinicia o movimento se isMoving for verdadeiro
        }
    });
    shape.addEventListener("touchstart", () => {
        isMoving = !isMoving; // Inverte o estado da variável ao clicar na peça
        if (isMoving) {
            movePiece(); // Reinicia o movimento se isMoving for verdadeiro
        }
    });

    movePiece(); // Inicia o movimento contínuo das peças
    console.log("movePiece");
    
    
    function movePiece() {
        if (!isMoving) return; // Se a variável isMoving for falsa, interrompe o movimento
        console.log(window.innerWidth, shape.clientWidth, window.innerHeight, shape.clientHeight);

        let posX = Math.random() * (window.innerWidth - shape.clientWidth);
        let posY = Math.random() * (window.innerHeight - shape.clientHeight);
        let velX = Math.random() * 1.1;
        let velY = Math.random() * 1.1;

        function move() {
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

            if (isMoving) {
                requestAnimationFrame(move);
            }
        }

        move(); // Inicia o movimento
    }
});



// Adicione um ouvinte de evento de toque (touch) para impedir o scroll durante o toque
document.addEventListener('touchmove', function (event) {
    if (isDragging) {
        event.preventDefault(); // Impede o scroll durante o toque
    }
});
 */