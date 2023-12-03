var i = 0

function createMenu() {
    const plusDiv = document.createElement('div')
    plusDiv.classList.add('toggle')
    plusDiv.setAttribute('id', 'toggle')

    const plusIcon = document.createElement('i')
    plusIcon.classList.add('bi', 'bi-plus-lg')
    plusIcon.setAttribute('id', 'plus')
    
    plusDiv.appendChild(plusIcon)
    
    const menuDiv = document.createElement('div')
    menuDiv.classList.add('menu')
    menuDiv.setAttribute('id', 'menu')
    
    let icons = [["bi", "bi-moon-stars-fill"], ["bi", "bi-shuffle"],["bi","bi-record-fill"], ["bi","bi-info-lg"]]
    
    for (let i = 0; i < 4; i++) {
        const a = document.createElement('a')
        const icon = document.createElement('i')
        icon.classList.add(icons[i][0], icons[i][1])
        a.href = '#'
        a.appendChild(icon)
        menuDiv.appendChild(a)
    }
    
    document.body.appendChild(plusDiv)
    document.body.appendChild(menuDiv)
    plusDiv.addEventListener("click", function(e) {
        if(i == 0) {
            console.log("click0")
            document.getElementById('menu').style.transform='scale(1.5)'
            document.getElementById('plus').style.transform='rotate(45deg)'
            i++
        }
        else {
            console.log("click1")
            document.getElementById('menu').style.transform='scale(0)'
            document.getElementById('plus').style.transform='rotate(0deg)'
            i = 0
        }
    })
}


createMenu()