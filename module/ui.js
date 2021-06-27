import * as map from "./map.js";

const gameDiv = document.getElementById("game");
const rowHeight = 45;
const colHeight = 45;


//game宽高
export function setGame(){
    gameDiv.style.width = map.colNumber * rowHeight + 'px';
    gameDiv.style.height = map.rowNumber * colHeight + 'px';
}

//渲染页面
export function showUI() {
    gameDiv.innerHTML = '';
    map.content.forEach((v, ri) => {
        map.content[0].forEach((v, ci) => {
            addDiv(ri, ci);
        })
    });
}

function Correct(rowN, colN) {
    return map.trueContent.find(item => item.row === rowN && item.col === colN);
}

function addDiv(rowi, coli) {
    const isCorrect = Correct(rowi, coli);
    const box = map.content[rowi][coli]
    
        let div = document.createElement("div");
        div.classList.add("item");
        div.style.top = colHeight * rowi + 'px';
        div.style.left = rowHeight * coli + 'px';
        if (box === map.PLAYER) {
            div.classList.add('player');
        } else if (box === map.WALL) {
            div.classList.add('wall');
        } else if (box === map.BOX) {
            if (isCorrect) {
                div.classList.add('correct-box');
            } else {
                div.classList.add('box');
            }
        } else {
            if (isCorrect) {
                div.classList.add('correct');
            } else {
                return;
            }
        }
        gameDiv.appendChild(div);
}
