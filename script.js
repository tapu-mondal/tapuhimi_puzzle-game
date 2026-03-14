let moveSound = new Audio("sound1.mp3")
let winSound = new Audio("sound2.mp3")

let board = document.getElementById("board")

let currentImage = ""
let gridSize = 4

let dragItem = null



function showImages() {

    document.getElementById("menu").style.display = "none"
    document.getElementById("images").style.display = "block"

}









function backMenu() {

    document.getElementById("menu").style.display = "block"
    document.getElementById("images").style.display = "none"
    document.getElementById("sizeSelect").style.display = "none"
    document.getElementById("game").style.display = "none"

}



function startGame(img) {

    currentImage = img

    document.getElementById("images").style.display = "none"
    document.getElementById("sizeSelect").style.display = "block"

}



function startPuzzle(size) {

    gridSize = size

    document.getElementById("sizeSelect").style.display = "none"
    document.getElementById("game").style.display = "block"

    createPuzzle()

}



function createPuzzle() {

    board.innerHTML = ""

    board.style.gridTemplateColumns = `repeat(${gridSize},1fr)`
    board.style.gridTemplateRows = `repeat(${gridSize},1fr)`

    let size = 420 / gridSize

    let pieces = []

    let id = 0

    for (let y = 0; y < gridSize; y++) {

        for (let x = 0; x < gridSize; x++) {

            let piece = document.createElement("div")

            piece.className = "piece"

            piece.style.backgroundImage = `url(${currentImage})`

            piece.style.backgroundPosition = `-${x * size}px -${y * size}px`

            piece.dataset.id = id

            piece.draggable = true

            piece.addEventListener("dragstart", dragStart)
            piece.addEventListener("dragover", dragOver)
            piece.addEventListener("drop", drop)

            pieces.push(piece)

            id++

        }

    }

    shuffle(pieces)

    pieces.forEach(p => board.appendChild(p))

}



function shuffle(arr) {

    for (let i = arr.length - 1; i > 0; i--) {

        let j = Math.floor(Math.random() * (i + 1))

        let temp = arr[i]

        arr[i] = arr[j]

        arr[j] = temp

    }

}



function dragStart() {

    dragItem = this

}



function dragOver(e) {

    e.preventDefault()

}



function drop() {

    // move sound
    moveSound.currentTime = 0
    moveSound.play()

    let tempImg = this.style.backgroundPosition

    let tempId = this.dataset.id

    this.style.backgroundPosition = dragItem.style.backgroundPosition

    this.dataset.id = dragItem.dataset.id

    dragItem.style.backgroundPosition = tempImg

    dragItem.dataset.id = tempId

    checkWin()

}



function checkWin() {

    let pieces = document.querySelectorAll(".piece")

    let solved = true

    pieces.forEach((p, index) => {

        if (parseInt(p.dataset.id) !== index) {

            solved = false

        }

    })

    if (solved) {

        setTimeout(() => {

            // win sound
            winSound.currentTime = 0
            winSound.play()

            Swal.fire({

                html: `
                <img src="like.gif" style="width:130px;margin-bottom:15px;">
                <h2>SABBAS</h2>
                <p>TURU LABB &lt;3! TOR SOB MONE ACHE!!</p>
                `,

                confirmButtonText: "Huh! I know!",
                allowOutsideClick: false

            }).then(() => {

                winSound.pause()
                winSound.currentTime = 0

            })

        }, 200)

    }

}



function exitGame() {

    location.reload()

}
