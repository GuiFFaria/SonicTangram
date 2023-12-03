function addTangramPieces() {
    //create box
    const box = document.createElement('div')
    box.classList.add('box')
    //add tangram pieces
    for (let i = 0; i < 7; i++) {
        const piece = document.createElement('img')
        piece.classList.add('shape')
        piece.setAttribute('id', `piece${i+1}`)
        piece.src = `../tangram_pieces/p${i+1}.svg`
        box.appendChild(piece)
    }

    //add menu
    const menu = document.createElement('img')
    menu.src = '../images/menu1.svg'
    menu.setAttribute('id', 'menu')
    menu.classList.add('shape')

    box.appendChild(menu)

    document.body.appendChild(box)
}


function main() {
    addTangramPieces()
}


main()