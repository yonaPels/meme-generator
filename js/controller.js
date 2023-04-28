'use strict'

let gCanvas
let gCtx
let gLine = 0


function onInit() {
    renderGallery()
}

function renderGallery() {
    const images = getImages()
    let strHTML = images.map(img => `
            <img src="img/${img.id}.jpg" onclick="onImgSelect('${img.id}')">
    `).join('')
    const elContainer = document.querySelector(".images-container")
    elContainer.innerHTML = strHTML
}

onInit()


function onImgSelect(id) {
    setImg(id)
    document.querySelector('.images-gallery').classList.add('hide')
    document.querySelector('.editing-bord').classList.remove('hide')
    document.querySelector('.create-meme').classList.remove('hide')
    document.querySelector('.canvas-container').classList.remove('hide')
    renderMeme()
}

function renderMeme() {
    gCanvas = document.querySelector('#my-canvas')
    gCtx = gCanvas.getContext('2d')
    const meme = getMeme()
    const { posX, posY } = meme.lines[gLine]
    const elImg = new Image()
    elImg.src = `img/${meme.selectedImgId}.jpg`
    const url = meme.url
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
        drawText()
        drawRect(posX, posY)
    }
}

renderKeywords()
function renderKeywords() {
    const keywords = getKeywordSearchCountMap()
    // console.log(Object.keys(keywords[0]));
    const keys = Object.keys(keywords)

    const strHTML = keys.map(key => `
        <li style="font-size:${keywords[key] * 3}px" onclick="onSearchWord()">${key}</li>
    `).join('')
    // console.log(strHTML);
    const elKeywordsBox = document.querySelector(".keywords-box")
    elKeywordsBox.innerHTML = strHTML

}

function onInputText() {
    setLineTxt(gLine)
    renderMeme()
}

function onChangeLine() {
    event.preventDefault()
    const meme = getMeme()
    if (meme.lines.length === 1) return
    gLine = (gLine) ? 0 : 1
    renderMeme()
}

function onAddLine() {
    event.preventDefault()
    addLine()
    gLine = 1
    // onChangeLine()
    renderMeme()
}

function onDeletLine() {
    event.preventDefault()
    deletLine(gLine)
    renderMeme()
}

function onSetFontSize(val) {
    event.preventDefault()
    setFontSize(gLine, val)
    renderMeme()
}

function onSetAlignment(alignment) {
    event.preventDefault()
    setAlignment(gLine, alignment)
    renderMeme()
}

function onSetFont(font) {
    // event.preventDefault()
    setFont(gLine, font)
    renderMeme()
}

function onSetStrokeColor(color) {
    // event.preventDefault()
    setStrokeColor(gLine, color)
    renderMeme()
}

function onSetColor(color) {
    setColor(gLine, color)
    renderMeme()
    const elPicker = document.querySelector(".color-picker")
    elPicker.innerHTML = `<button class="btn color-picker" onclick="onPickColor()"><img src="ICONS/paint-board-and-brush.png"
    alt=""></button>`
}

function downloadCanvas(elLink) {
    // Protect the image soo attacker could not download imgs from diff domain
    const data = gCanvas.toDataURL() // For security reason you cannot do toDataUrl on tainted canvas
    // This protects users from having private data exposed by using images
    // to pull information from remote web sites without permission.
    elLink.href = data
    elLink.download = 'my-img.jpg'
}

function canvasClicked(ev) {
    const { offsetX, offsetY } = ev
    console.log(ev);
}

function drawText(x, y) {
    const { posX, posY, txt, size, align, color, strokeColor, font } =
        getMeme().lines[gLine]
    gCtx.lineWidth = 2
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${font}`
    // gCtx.textBaseline = 'middle'
    gCtx.textAlign = align
    gCtx.fillText(txt, posX + 250, posY) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(txt, posX + 250, posY) // Draws (strokes) a given text at the given (x, y) position.
}

function drawRect(x, y) {
    // First way - drawing a rect by specifying a patch using the .rect() method,
    // and then filling it with the .fill() method and stroking it with the .stroke() method
    // gCtx.beginPath()
    // gCtx.rect(x, y, 120, 120)
    // gCtx.strokeStyle = 'black'
    // gCtx.stroke()
    // gCtx.fillStyle = 'orange'
    // gCtx.fill()

    // Second way - using the built in .fillRect() and .strokeRect() methods to directly
    // paint on the canvas, without using a path
    gCtx.strokeStyle = 'black'
    gCtx.strokeRect(x, y - 30, 500, 60)
    // gCtx.setFillColor('orange')
    gCtx.fillStyle = "rgba(20,100, 250, 0.2)"
    gCtx.fillRect(x, y - 30, 500, 60)
}

function onPickColor() {
    const elPicker = document.querySelector(".color-picker")
    elPicker.innerHTML = `<input id="color-input" type="color" class="btn set-color" oninput="onSetColor(this.value)" />`
}


function onSearchWord() { console.log(this); }