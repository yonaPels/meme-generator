'use strict'

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
let gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'img/2.jpg', keywords: [] },
    { id: 3, url: 'img/3.jpg', keywords: [] },
    { id: 4, url: 'img/4.jpg', keywords: [] },
    { id: 5, url: 'img/5.jpg', keywords: [] },
    { id: 6, url: 'img/6.jpg', keywords: [] },
    { id: 7, url: 'img/7.jpg', keywords: [] },
    { id: 8, url: 'img/8.jpg', keywords: [] },
    { id: 9, url: 'img/9.jpg', keywords: [] },
    { id: 10, url: 'img/10.jpg', keywords: [] },
    { id: 11, url: 'img/11.jpg', keywords: [] },
    { id: 12, url: 'img/12.jpg', keywords: [] },
    { id: 13, url: 'img/13.jpg', keywords: [] },
    { id: 14, url: 'img/14.jpg', keywords: [] },
    { id: 15, url: 'img/15.jpg', keywords: [] },
    { id: 16, url: 'img/16.jpg', keywords: [] },
    { id: 17, url: 'img/17.jpg', keywords: [] },
    { id: 18, url: 'img/18.jpg', keywords: [] },
];

let gMeme = {
    selectedImgId: 5, selectedLineIdx: 0, lines: [
        { posX: 0, posY: 80, txt: 'I sometimes eat Falafel', size: 20, align: 'left', color: 'red', strokeColor: 'brown', font: 'impact' },
    ]
}

function getImages() {
    return gImgs
}

function getMeme() {
    return gMeme
}

function getKeywordSearchCountMap() {
    return gKeywordSearchCountMap
}

function setImg(id) {
    gMeme.selectedImgId = id
}

function setLineTxt(line) {
    gMeme.lines[line].txt = document.getElementById("text-input").value
}

function addLine() {
    const line = { posX: 0, posY: 420, txt: 'Somthing else', size: 20, align: 'left', color: 'red', strokeColor: 'brown', font: 'impact' }
    gMeme.lines.push(line)
}

function deletLine(line) {
    gMeme.lines[line].remove()
}

function setFontSize(line, val) {
    gMeme.lines[line].size += val
}

function setAlignment(line, alignment) {
    gMeme.lines[line].align = alignment
}

function setFont(line, font) {
    gMeme.lines[line].font = font
}

function setStrokeColor(line, clr) {
    gMeme.lines[line].strokeColor = clr
}

function setColor(line, clr) {
    gMeme.lines[line].color = clr
}


function getKeyWords() {
    return gKeywordSearchCountMap
}


