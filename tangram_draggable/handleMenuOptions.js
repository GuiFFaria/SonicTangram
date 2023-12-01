let mediaRecorder


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


function handleMenu() {
    const menu = document.getElementById('menu')
    let menuNo = 1
    let isRecording = false
    let modeSwitch = false

    menu.addEventListener('click', function(e) {
        
        const d = menu.clientWidth
        const d2 = d * 0.3
        let r = d / 2

        console.log(menu.getBoundingClientRect())
        const posX = menu.getBoundingClientRect().left + r
        const posY = menu.getBoundingClientRect().top + r

        // is inside menu
        let offset = distance(e.clientX, e.clientY, posX, posY)
        
        //is inside menu ring
        if ( offset > d2 && offset < d) {
            if (e.clientX > posX && e.clientY < posY) {
                // Q1 SWITCH OPTION
                console.log("switch")
                
            }
            if (e.clientX > posX && e.clientY > posY) {
                //Q4 SCREEN RECORD OPTION
                console.log("record")

                //start/stop recording on click
                isRecording = !isRecording

                if (isRecording) {
                    start()
                } else {
                    stop()
                }

            }
            if (e.clientX < posX && e.clientY < posY) {
                // Q2 LIGHT/DARK MODE OPTION
                menu.src = `images/menu${menuNo%2 + 1}.svg`
                if (menuNo % 2 == 0) {
                    menuNo--
                    document.body.style.background = '#202125'
                } else {
                    menuNo++
                    document.body.style.background = 'white'
                }
            }
            if (e.clientX < posX && e.clientY > posY) {
                // Q3 INFO OPTION
                console.log("info")
                var popup = document.getElementById("popup");
                popup.classList.toggle("show");
            }
        }
    })

}

function main() {
    handleMenu()
}


main()