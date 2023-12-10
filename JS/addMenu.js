let quotes = [  "I AM A CAGE IN SEARCH OF A BIRD",  "THE COSMOS IS WITHIN US. WE ARE MADE OF STAR-STUFF. WE ARE A WAY FOR THE UNIVERSE TO KNOW ITSELF",  "CATS ARE LIKE MUSIC. IT'S FOOLISH TO TRY TO EXPLAIN THEIR WORTH TO THOSE WHO DON'T APPRECIATE THEM",  "THE SEA, ONCE IT CASTS ITS SPELL, HOLDS ONE IN ITS NET OF WONDER FOREVER",  "THE MORE ABSTRACT IS FORM, THE MORE CLEAR AND DIRECT ITS APPEAL.",  "NUMBERS HAVE LIFE; THEY'RE NOT JUST SYMBOLS ON PAPER",  "WITHOUT MUSIC, LIFE WOULD BE A MISTAKE",  "MUSICAL INSTRUMENTS ARE EXTENSIONS OF WHO WE ARE",  "I CALL ARCHITECTURE FROZEN MUSIC",  "UNTIL ONE HAS LOVED AN ANIMAL, A PART OF ONE'S SOUL REMAINS UNAWAKENED",  "THE ALPHABET IS THE SCIENCE AND ART OF CONSTRUCTING AND USING LETTERS",  "KEEP YOUR EYES ON THE STARS, AND YOUR FEET ON THE GROUND",  "A ROOM WITHOUT BOOKS IS LIKE A BODY WITHOUT A SOUL",  "THE COMPUTER WAS AN INVENTION WAITING TO BE MADE",  "TO LOVE AND BE LOVED IS TO FEEL THE SUN FROM BOTH SIDES",]
let piecesSize = [[20, 20],[10, 10],[10, 10],[18, 13],[20, 20],[10, 10], [10, 10]]
var i = 0
let mediaRecorder
let menuNo = 1
let isRecording = false
let firstIteration = true 

function downloadImage() {
    var print = document.getElementById('box')

    html2canvas(print, {
        scale: window.devicePixelRatio,
        ignoreElements: function (element) {
            return (element.classList.contains("container"))
        }
    }).then(function(canvas) {
        const base64image = canvas.toDataURL("image/png");
        var anchor = document.createElement('a');
        anchor.setAttribute("href", base64image)
        anchor.setAttribute("download", "my-tangram-composition.png")
        anchor.click();
        anchor.remove();
    })

    /* downloadButton.addEventListener("click", () => { */
    /* }) */
}


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

/* async function recordScreen() {
    return await navigator.mediaDevices.getDisplayMedia({
        audio: true,
        video: {mediaSource: "screen"},
    })
} */

async function recordScreen() {
    try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
            audio: {
                mediaSource: 'audio',
            },
            video: {
                mediaSource: 'screen',
            },
        });

        return stream;
    } catch (error) {
        console.error('Error accessing screen and audio:', error);
    }
}

function saveFile(recordedChunks) {

    const blob = new Blob(recordedChunks, {
        type: 'video/webm'
    })

    let filename = 'myComposition'
    let downloadLink = document.createElement('a')
    downloadLink.href = URL.createObjectURL(blob)
    downloadLink.download = `${filename}.mp4`

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
    let ids = ["mode", "shuffle", "record", "info", "reset", 'finish']
    

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
            //dark
            
            document.body.style.background = 'linear-gradient(27deg, #151515 5px, transparent 5px) 0 5px, linear-gradient(207deg, #151515 5px, transparent 5px) 10px 0px, linear-gradient(27deg, #222 5px, transparent 5px) 0px 10px, linear-gradient(207deg, #222 5px, transparent 5px) 10px 5px, linear-gradient(90deg, #1b1b1b 10px, transparent 10px), linear-gradient(#1d1d1d 25%, #1a1a1a 25%, #1a1a1a 50%, transparent 50%, transparent 75%, #242424 75%, #242424)'
            document.body.style.backgroundColor = '#131313'
            document.body.style.backgroundSize = '20px 20px'
            icon.classList.remove(modes[1])
            icon.classList.add(modes[0])


            for (let i = 0; i < 7; i++) {
                const piece = document.getElementById(`piece${i+1}`)
                piece.src = `../tangram_pieces/p${i+1}_2.svg`
                if (firstIteration) {
                    console.log("firstIteration")
                    piece.style.width = `${piecesSize[i][0]}vw`
                    piece.style.height = `${piecesSize[i][1]}vw`
                }
            }

            menuNo--
            firstIteration = false
        } else {
            //light

            console.log("dark:" + menuNo)
            console.log("light:" + menuNo)
            document.body.style.backgroundColor = '#fff'
            document.body.style.backgroundImage = 'linear-gradient(90deg, transparent 79px, #abced4 79px, #abced4 81px, transparent 81px),linear-gradient(#eee .1em, transparent .1em)'
            document.body.style.backgroundSize = '100% 1.2em'
            icon.classList.remove(modes[0])
            icon.classList.add(modes[1])

            for (let i = 0; i < 7; i++) {
                const piece = document.getElementById(`piece${i+1}`)
                piece.src = `../tangram_pieces/p${i+1}.svg`
            }
            menuNo++
        }
    })

    shuffle.addEventListener("click", function(e) {
        const textPath = document.getElementById('text-path')
        let randIndex = parseInt(Math.random() * quotes.length)
        textPath.textContent = quotes[randIndex]
        var animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
        animate.setAttribute("attributeName", "startOffset");
        animate.setAttribute("from", "0%");
        animate.setAttribute("to", "100%");
        animate.setAttribute("begin", "0s");
        animate.setAttribute("dur", "35s");
        animate.setAttribute("repeatCount", "indefinite");
        textPath.appendChild(animate)
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
            document.getElementById('recording-container').style.border = '7px solid red'
        } else {
            stop()
            document.getElementById('recording-container').style.border = 'none'
        }
    })

    // reset option
    reset.addEventListener("click", function(e) {
        window.location.reload()
    })

    // finish option
    finish.addEventListener("click", function(e) {
        downloadImage()
        
    })


}




createMenu()
expandMenu()
handleMenuOptions()