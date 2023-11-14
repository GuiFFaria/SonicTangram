const retangulos = document.querySelectorAll(".retangulo");

retangulos.forEach((retangulo) => {
    iniciarMovimento(retangulo);
});

function iniciarMovimento(retangulo) {
    let posX = Math.random() * (window.innerWidth - retangulo.clientWidth);
    let posY = Math.random() * (window.innerHeight - retangulo.clientHeight);
    let velX = Math.random() * 5 - 2;
    let velY = Math.random() * 5 - 2;

    function moverRetangulo() {
        const maxWidth = window.innerWidth - retangulo.clientWidth;
        const maxHeight = window.innerHeight - retangulo.clientHeight;

        posX += velX;
        posY += velY;

        if (posX > maxWidth || posX < 0) {
            velX = -velX;
        }
        if (posY > maxHeight || posY < 0) {
            velY = -velY;
        }

        retangulo.style.left = posX + "px";
        retangulo.style.top = posY + "px";

        requestAnimationFrame(moverRetangulo);
    }

    moverRetangulo(); // Inicia o movimento contínuo do retângulo
}
