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
    
    
    let icons = [["bi", "bi-moon-stars-fill"], ["bi", "bi-shuffle"],["bi","bi-record-fill"], ["bi","bi-info-lg"]]
    let ids = ["mode", "shuffle", "record", "info"]

    for (let i = 0; i < 4; i++) {
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
            document.body.style.border = '4px solid red'
            start()
        } else {
            stop()
        }
    })
}

createMenu()
expandMenu()
handleMenuOptions()