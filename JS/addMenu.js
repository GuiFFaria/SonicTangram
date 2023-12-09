var i = 0
let mediaRecorder
let menuNo = 1
let isRecording = false

function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

async function start() {
    let stream = await recordScreen()
    let mimeType = 'video/webm'
    mediaRecorder = createRecorder(stream, mimeType)
    let node = document.createElement("p")
    node.textContent = "Started recording"
    document.body.appendChild(node)
}

async function stop() {
    mediaRecorder.stop()
    let node = document.createElement("p")
    node.textContent = "Stopped recording"
    document.body.appendChild(node)
}

async function recordScreen() {
    return await navigator.mediaDevices.getDisplayMedia({
        audio: true,
        video: {mediaSource: "screen"}
    })
}

function saveFile(recordedChunks) {

    const blob = new Blob(recordedChunks, {
        type: 'video/webm'
    })

    let filename = 'myComposition'
    let downloadLink = document.createElement('a')
    downloadLink.href = URL.createObjectURL(blob)
    downloadLink.download = `${filename}.webm`

    document.body.appendChild(downloadLink)
    downloadLink.click()
    URL.revokeObjectURL(blob) //remove from memory
    document.body.removeChild(downloadLink)

}
function createRecorder (stream, mimeType) {
    let recordedChunks = []

    const mediaRecorder = new MediaRecorder(stream)

    mediaRecorder.ondataavailable = function (e) {
        if (e.data.size > 0) {
            recordedChunks.push(e.data)
        }
    }

    mediaRecorder.onstop = function () {
        saveFile(recordedChunks)
        recordedChunks = []
    }

    //for every 200ms the stream data will be stored in a different chunk
    mediaRecorder.start(200)

    return mediaRecorder
}

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
    menuDiv.setAttribute('id', 'menuDiv')
    
    
    let icons = [["bi", "bi-moon-stars-fill"], ["bi", "bi-shuffle"],["bi","bi-record-fill"], ["bi","bi-info-lg"], ["bi", "bi-arrow-clockwise"], ["bi", "bi-check-lg"]]
    let ids = ["mode", "shuffle", "record", "info", "reset"]
    let quotes = [ "I am a cage in search of a bird",
                   "The cosmos is within us. We are made of star-stuff. We are a way for the universe to know itself",
                   "Cats are like music. It's foolish to try to explain their worth to those who don't appreciate them",
                   "The sea, once it casts its spell, holds one in its net of wonder forever",
                   "The more abstract is form, the more clear and direct its appeal.",
                   "Numbers have life; they're not just symbols on paper",
                   "Without music, life would be a mistake",
                   "Musical instruments are extensions of who we are",
                   "I call architecture frozen music",
                   "Until one has loved an animal, a part of one's soul remains unawakened",
                   "The alphabet is the science and art of constructing and using letters",
                   "Keep your eyes on the stars, and your feet on the ground",
                   "A room without books is like a body without a soul",
                   "The computer was an invention waiting to be made",
                   "To love and be loved is to feel the sun from both sides",

    ]
    
    for (let i = 0; i < 6; i++) {
        const a = document.createElement('a')
        const icon = document.createElement('i')
        icon.classList.add(icons[i][0], icons[i][1])
        
        a.href = '#'
        icon.setAttribute('id', ids[i])
        a.appendChild(icon)
        menuDiv.appendChild(a)
    }
    
    
    const container = document.createElement('div')
    container.classList.add('container', 'draggable')
    container.setAttribute('id', 'menu')


    container.appendChild(plusDiv)
    container.appendChild(menuDiv)
    document.body.appendChild(container)


    
}

function expandMenu() {
    const plusDiv = document.getElementById('toggle')

    plusDiv.addEventListener("click", function(e) {
        if(i == 0) {
            console.log("click0")
            document.getElementById('menuDiv').style.transform='scale(1.5)'
            document.getElementById('plus').style.transform='rotate(45deg)'
            i++
        }
        else {
            console.log("click1")
            document.getElementById('menuDiv').style.transform='scale(0)'
            document.getElementById('plus').style.transform='rotate(0deg)'
            i = 0
        }
    })
}

function handleMenuOptions() {
    const mode = document.getElementById('mode')
    const shuffle = document.getElementById('shuffle')
    const info = document.getElementById('info')
    const record = document.getElementById('record')
    const reset = document.getElementById('reset')
    const finish = document.getElementById('finish')

    // change mode option
    mode.addEventListener("click", function(e) {
        let modes = ["bi-brightness-high-fill", "bi-moon-stars-fill"]
        let icon = document.getElementById('mode')
        if (menuNo % 2 != 0) {
            //light
            console.log("light:" + menuNo)
            menuNo--
            document.body.style.background = '#202125'
            icon.classList.remove(modes[1])
            icon.classList.add(modes[0])
        } else {
            //dark
            console.log("dark:" + menuNo)
            menuNo++
            document.body.style.background = 'rgb(240,240,240)'
            icon.classList.remove(modes[0])
            icon.classList.add(modes[1])
        }
    })

    shuffle.addEventListener("click", function(e) {
        // TODO: add shuffle 
    })

    // info option
    info.addEventListener("click", function(e) {
        var popup = document.getElementById("popup")
        popup.classList.toggle("hide")
    })

    // record option
    record.addEventListener("click", function(e) {
        isRecording = !isRecording

        if (isRecording) {
            start()
        } else {
            stop()
        }
    })

    // reset option
    reset.addEventListener("click", function(e) {
        window.location.reload()
    })

    // finish option
    finish.addEventListener("click", function(e) {
        //TODO: add finish option
    })


}

createMenu()
expandMenu()
handleMenuOptions()