//option
function getQueryStringByName(name) {
    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) return "";
    return result[1];
}
var fieldRow = getQueryStringByName("row"),
    fieldCol = getQueryStringByName("col"),
    blockSize = getQueryStringByName("size"),
    mineNumber = getQueryStringByName("mine");
if (fieldRow == "" || fieldRow < 0) fieldRow = 10;
if (fieldCol == "" || fieldCol < 0) fieldCol = 10;
if (blockSize == "" || blockSize < 0) blockSize = 20;
if (mineNumber == "" || mineNumber < 0 || mineNumber > fieldRow * fieldCol) mineNumber = Math.floor(fieldRow * fieldCol / 10);
//variable
var block = [], mine = [];
var rowDiff = [-1, -1, -1, 0, 1, 1, 1, 0], colDiff = [-1, 0, 1, 1, 1, 0, -1, -1], ifWin = fieldRow * fieldCol;
//count mine
var markNumber = function (mine, row, col) {
    var returnValue = 0;
    for (var i = 0; i < 8; i++) {
        for (var j in mine) {
            if (mine[j].row == row + rowDiff[i] && mine[j].col == col + colDiff[i]) returnValue++;
        }
    }
    return returnValue;
}
//flip block
var flipBlock = function (mine, row, col) {
    if (row < 0 || row >= fieldRow || col < 0 || col >= fieldCol || !block[row][col].classList.contains("block") || block[row][col].classList.contains("mark")) return;
    block[row][col].classList.remove("block");
    for (var i in mine) {
        if (mine[i].row == row && mine[i].col == col) return gameOver(row, col, "GAME OVER");
    }
    ifWin--;
    if (ifWin == 0) gameWin();
    var mark = markNumber(mine, row, col);
    if (mark == 0) {
        for (var i_ = 0; i_ < 8; i_++) {
            flipBlock(mine, row + rowDiff[i_], col + colDiff[i_]);
        }
    }
    block[row][col].innerHTML = mark == 0 ? "" : mark;
    return;
}
//game over
var gameOver = function () {
    var div = document.createElement("div");
    div.style.height = fieldRow * blockSize - 1 + "px";
    div.style.width = fieldCol * blockSize - 1 + "px";
    div.style.border = "1px black solid";
    div.style.background = "rgba(255,200,200,0.5)";
    document.body.appendChild(div);
    for (var i in block) {
        for (var j in block[i]) {
            block[i][j].classList.remove("block");
        }
    }
    document.body.onclick = function () {
        location.reload();
        return false;
    };
    document.body.oncontextmenu = function () {
        location.reload();
        return false;
    };
}
//win
var gameWin = function () {
    var div = document.createElement("div");
    div.style.height = fieldRow * blockSize - 1 + "px";
    div.style.width = fieldCol * blockSize - 1 + "px";
    div.style.border = "1px black solid";
    div.style.background = "rgba(255,255,255,0.5)";
    document.body.appendChild(div);
    document.body.onclick = function () {
        location.reload();
        return false;
    };
    document.body.oncontextmenu = function () {
        location.reload();
        return false;
    };
}
//left click
document.body.onclick = function (e) {
    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;
    var col = Math.floor(mouseX / blockSize);
    var row = Math.floor(mouseY / blockSize);
    if (col < fieldCol && row < fieldRow) flipBlock(mine, row, col);
    return false;
};
//right click
document.body.oncontextmenu = function (e) {
    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;
    var col = Math.floor(mouseX / blockSize);
    var row = Math.floor(mouseY / blockSize);
    if (!block[row][col].classList.contains("block")) return false;
    if (col < fieldCol && row < fieldRow) {
        block[row][col].classList.toggle("mark");
        if (block[row][col].classList.contains("mark")) {
            for (var i in mine) {
                if (mine[i].row == row && mine[i].col == col) ifWin--;
            }
        } else {
            for (var i in mine) {
                if (mine[i].row == row && mine[i].col == col) ifWin++;
            }
        }
    }
    if (ifWin == 0) gameWin();
    return false;
};
//draw field
for (var i = 0; i < fieldRow; i++) {
    for (var j = 0; j < fieldCol; j++) {
        var div = document.createElement("div");
        div.style.top = i * blockSize + "px";
        div.style.left = j * blockSize + "px";
        div.style.width = div.style.height = div.style.lineHeight = div.style.fontSize = blockSize - 1 + "px";
        document.body.appendChild(div);
        div.classList.add("field");
    }
}
//random function
var getRandomSequence = function (need, total) {
    var sequence = [], result = [];
    for (var i = 0; i < total; i++) {
        sequence[i] = i;
    }
    for (var j = 0; j < need; j++) {
        var rand = Math.floor(Math.random() * (total - j));
        result[j] = sequence[rand];
        sequence[rand] = sequence[total - j - 1];
    }
    return result;
}
//generate mine
var mineSequence = getRandomSequence(mineNumber, fieldRow * fieldCol);
for (var i in mineSequence) {
    var randomMine = {};
    randomMine.row = Math.floor(mineSequence[i] / fieldCol);
    randomMine.col = mineSequence[i] - randomMine.row * fieldCol;
    mine.push(randomMine);
}
//place mine
for (var i in mine) {
    var div = document.createElement("div");
    div.style.top = mine[i].row * blockSize + "px";
    div.style.left = mine[i].col * blockSize + "px";
    div.style.width = div.style.height = blockSize - 1 + "px";
    document.body.appendChild(div);
    div.classList.add("mine");
}
//draw block
for (var i = 0; i < fieldRow; i++) {
    var blockCol = [];
    for (var j = 0; j < fieldCol; j++) {
        var div = document.createElement("div");
        div.style.top = i * blockSize + "px";
        div.style.left = j * blockSize + "px";
        div.style.width = div.style.height = div.style.lineHeight = div.style.fontSize = blockSize - 1 + "px";
        document.body.appendChild(div);
        div.classList.add("block");
        blockCol.push(div);
    }
    block.push(blockCol);
}
