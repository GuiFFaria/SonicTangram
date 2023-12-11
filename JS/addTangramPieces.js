let pieceSize = [[20, 20],[10, 10],[10, 10],[18, 13],[20, 20],[10, 10], [10, 10]]
let positionArray = new Array(7);
//add a X and Y position to each position of the array
positionArray[0] = {x: 30, y: 70};
positionArray[1] = {x: 30, y: 350};
positionArray[2] = {x: 400, y: 200};
positionArray[3] = {x: 300, y: 0};
positionArray[4] = {x: 1200, y: 70};
positionArray[5] = {x: 1200, y: 350};
positionArray[6] = {x: 900, y: 300};


console.log(pieceSize)
console.log(pieceSize[0])
console.log(pieceSize[0][0])
console.log(pieceSize[0][1])


function addTangramPieces() {
    // Create box
    const box = document.createElement('div')
    box.classList.add('box')
    box.setAttribute('id', 'box')

    // Add tangram pieces
    for (let i = 0; i < 7; i++) {
        const container = document.createElement('div')
        container.setAttribute('id', `gesture-area-${i+1}`)
        container.classList.add('container')

        const piece = document.createElement('img')
        piece.classList.add('shape', 'prevent-select', 'tangram-piece')
        piece.setAttribute('id', `piece${i+1}`)
        piece.src = `../tangram_pieces/p${i+1}.svg`
        piece.style.width = `${pieceSize[i][0]}vw`
        piece.style.height = `${pieceSize[i][1]}vw`
        // Set random position within the visible screen area
        //const randomPosition = getRandomPosition();
        container.style.left = positionArray[i].x + 'px';
        container.style.top = positionArray[i].y + 'px';

        container.appendChild(piece)
        box.appendChild(container)
    }

    document.body.appendChild(box)
}

function getRandomPosition() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const randomX = Math.floor(Math.random() * (screenWidth - 60)); // Adjust as needed
    const randomY = Math.floor(Math.random() * (screenHeight - 60)); // Adjust as needed

    return { x: randomX, y: randomY };
}

function addQuote() {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "svgwave");
    svg.setAttribute("data-name", "Camada 1");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("viewBox", "0 0 1350 750");

    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("id", "wavepath");
    path.setAttribute("d", "M147.56,69.4H1218.44c43.08,0,78,29.13,78,65.06V633.54c0,35.93-34.92,65.06-78,65.06H147.56c-43.08,0-78-29.13-78-65.06V134.46C69.56,98.53,104.48,69.4,147.56,69.4Z");
    
    var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("text-anchor", "middle");

    var textPath = document.createElementNS("http://www.w3.org/2000/svg", "textPath");
    textPath.setAttribute("id", "text-path");
    textPath.setAttribute("class", "my-text prevent-select text-path");
    textPath.setAttribute("href", "#wavepath");
    textPath.setAttribute("startOffset", "0%");
    textPath.textContent = "KEEP YOUR EYES ON THE STARS, AND YOUR FEET ON THE GROUND";

    var animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
    animate.setAttribute("attributeName", "startOffset");
    animate.setAttribute("from", "0%");
    animate.setAttribute("to", "100%");
    animate.setAttribute("begin", "0s");
    animate.setAttribute("dur", "35s");
    animate.setAttribute("repeatCount", "indefinite");

    textPath.appendChild(animate);
    text.appendChild(textPath);
    svg.appendChild(path);
    svg.appendChild(text);

    document.getElementById("svg-container").appendChild(svg);
}

function main() {
    addTangramPieces()
    addQuote()
}

main()
