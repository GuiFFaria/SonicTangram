var initialTouch = null;

document.addEventListener('touchstart', function (e) {
    // Armazena a posição inicial do primeiro toque
    initialTouch = e.touches[0].clientX;
}, { passive: false });

document.addEventListener('touchmove', function (e) {
    // Impede o movimento do toque e ajusta a posição para evitar o redimensionamento
    e.preventDefault();

    // Calcula a diferença entre a posição atual do toque e a posição inicial
    var touchDifference = e.touches[0].clientX - initialTouch;

    // Se houver uma diferença significativa, ajusta a largura da janela de volta à largura inicial
    if (Math.abs(touchDifference) > 10) {
        window.innerWidth = window.innerWidth;
    }
}, { passive: false });

document.addEventListener('touchend', function () {
    // Reinicializa a posição inicial quando o toque é encerrado
    initialTouch = null;
}, { passive: false });