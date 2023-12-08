function addTangramPieces() {
    //create box
    const box = document.createElement('div')
    box.classList.add('box')
    //add tangram pieces
    for (let i = 0; i < 7; i++) {
        const piece = document.createElement('img')
        piece.classList.add('shape', 'prevent-select', 'tangram-piece')
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