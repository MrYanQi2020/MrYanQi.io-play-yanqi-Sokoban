import * as map from './map.js';


function exchange(point1,point2){
    let value = map.content[point1.row][point1.col];
    map.content[point1.row][point1.col] = map.content[point2.row][point2.col];
    map.content[point2.row][point2.col] = value;
    

}

// 获取玩家坐标
function getPlayerPoint() {
    let res = {};
    map.content.forEach((v,ele1) => {
        map.content[0].forEach((v,ele2) => {
            if(map.content[ele1][ele2] === map.PLAYER){
                res = {
                    row:ele1,
                    col:ele2
                }
            }
        });
    });
    return res;
}

// 获取下一步坐标
function getnextInfo(row,col,direction){
    if(direction === 'up'){
        return {
            row: row-1,
            col,
            value:map.content[row-1][col]
        }
    }else if(direction === 'right'){
        return {
            row,
            col:col+1,
            value:map.content[row][col+1]
        }
    }else if(direction === 'down'){
        return {
            row: row+1,
            col,
            value:map.content[row+1][col]
        }
    }else if(direction === 'left'){
        return {
            row,
            col:col-1,
            value:map.content[row][col-1]
        }
    }
}

/**
 * 按照指定的方向，让玩家移动一步
 * @param {*} direction left、right、up、down
 */
 export function playerMove(direction) {
    // 获取玩家坐标
    let playerPoint = getPlayerPoint();
    // 获取下一步坐标
    let nextInfo = getnextInfo(playerPoint.row,playerPoint.col,direction);
  
    let nextInfoValue = nextInfo.value;

    //不能移动
    if(nextInfoValue === map.WALL){
        return false;
    }
    //能移动
    if(nextInfoValue === map.SPACE){
        //下一步是空白
        exchange(playerPoint,nextInfo);
        return true;
    }else if(nextInfoValue === map.BOX){
        // 下一步是箱子
        // 获取箱子的下一步
        const nextboxInfo = getnextInfo(nextInfo.row,nextInfo.col,direction);
        if(nextboxInfo.value === map.SPACE){
            exchange(nextInfo,nextboxInfo);
            exchange(playerPoint,nextInfo);
            return true;
        }
    }
}

export function isWin(){
    return map.trueContent.every(v=>map.content[v.row][v.col] === map.BOX)
}