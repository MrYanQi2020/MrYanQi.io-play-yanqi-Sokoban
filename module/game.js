import { setGame, showUI } from './ui.js';
import { playerMove,isWin } from './play.js'

// 显示div宽高
setGame();
// 渲染页面
showUI();



let over = false;

// 游戏事件
window.onkeydown = function (e) {
    let result = false;

    if(over){
        return;
    }
    const key = e.key;
    if (key === 'ArrowUp') {
        result = playerMove('up');
    } else if (key === 'ArrowDown') {
        result = playerMove('down');
    } else if (key === 'ArrowLeft') {
        result = playerMove('left');

    } else if (key === 'ArrowRight') {
        result = playerMove('right');
    }
    if(result){
        showUI();
        if(isWin()){
            over = true;
            console.log('游戏胜利');
            return false;
            
        }
    }
}


