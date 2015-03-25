/**
 * @since 2014/10/13 9:28
 * @author vivaxy
 */
var Game = function () {

    var canvas, ctx, scoreDiv, timerCanvas, timerCtx, restartBtn, scoreContainer, menuContainer,
        isMobile, clickEvent,
        gameRunning, score, mole;

    var cellList = [];

    /**
     * draw cell on game canvas
     * @param cell
     */
    var drawCell = function (cell) {
        ctx.fillStyle = cell.color;
        ctx.fillRect(cell.row * 100, cell.col * 100, 100, 100);
        ctx.strokeStyle = "rgb(41, 128, 185)";
        ctx.lineWidth = "1";
        ctx.strokeRect(cell.row * 100, cell.col * 100, 100, 100);
    };

    /**
     * add to score and update score on the score division
     * @param _score
     */
    var updateScore = function (_score) {
        score += _score;
        scoreDiv.innerHTML = score;
        if (_score != 0) {
            var scoreAddition = document.createElement("div");
            scoreAddition.className = "score-addition";
            scoreAddition.innerHTML = "+" + _score;
            scoreContainer.appendChild(scoreAddition);
        }
    };

    /**
     * paint initial timer canvas
     */
    var resetTimer = function () {
//        var grd = timerCtx.createLinearGradient(0, 0, 400, 0);
//        grd.addColorStop(0, "rgb(255,0,0)");
//        grd.addColorStop(0.5, "rgb(255,255,0)");
//        grd.addColorStop(1, "rgb(0,255,0)");
//        timerCtx.fillStyle = grd;
        timerCtx.fillStyle = "rgb(52, 152, 219)";
        timerCtx.fillRect(0, 0, 400, 50);
    };

    /**
     * paint all background cells on game canvas
     */
    var resetGrid = function () {
        cellList.forEach(function (cell) {
            drawCell(cell);
        });
    };

    /**
     * if the cell is clicked
     * @param cell
     * @param event
     * @returns {boolean}
     */
    var inBox = function (cell, event) {

        var touches = isMobile ? event.touches : [event];
        var touch = touches[0];
        var x = touch.offsetX || touch.pageX - touch.target.offsetLeft;
        var y = touch.offsetY || touch.pageY - touch.target.offsetTop;

        return x > cell.row * canvas.offsetHeight / 4 && x < (cell.row + 1) * canvas.offsetHeight / 4 && y > cell.col * canvas.offsetHeight / 4 && y < (cell.col + 1) * canvas.offsetHeight / 4;

    };

    /**
     * generate new mole and paint it on the game canvas
     */
    var Mole = function () {
        var index = Math.floor(Math.random() * cellList.length);
        var _mole = {
            row: cellList[index].row,
            col: cellList[index].col,
            color: "rgb(26, 188, 156)"
        };
        drawCell(_mole);
        return _mole;
    };

    /**
     * game canvas clicked
     * @param e
     */
    var clickFunc = function (e) {
//        e.preventDefault();
        e.stopPropagation();
        if (gameRunning && inBox(mole, e)) {
            var _cell = {
                row: mole.row,
                col: mole.col,
                color: "rgb(255,255,255)"
            };
            drawCell(_cell);
            mole = new Mole();
            updateScore(1);
        }
    };

    /**
     * bind or unbind button events
     * @param stat
     */
    var setButtonEvents = function (stat) {
        if (stat) {
            menuContainer.classList.remove("hide");
            restartBtn.addEventListener(clickEvent, start, false);
            restartBtn.classList.remove("disabled");
        } else {
            menuContainer.classList.add("hide");
            restartBtn.removeEventListener(clickEvent, start, false);
            restartBtn.classList.add("disabled");
        }
    };
    /**
     * initiate variables
     * determine mobile, set html elements to variables, setup canvas size, initiate cell list
     */
    var initVariables = function () {

        isMobile = (function () {
            var check = false;
            (function (a) {
                if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))check = true
            })(navigator.userAgent || navigator.vendor || window.opera);
            return check;
        })();
        clickEvent = isMobile ? 'touchstart' : 'click';

        scoreDiv = document.getElementsByClassName("score")[0];
        timerCanvas = document.getElementsByClassName("timer")[0];
        timerCanvas.width = 400;
        timerCanvas.height = 50;
        timerCtx = timerCanvas.getContext("2d");

        canvas = document.getElementsByClassName("game")[0];
        canvas.width = 400;
        canvas.height = 400;
        ctx = canvas.getContext("2d");

        restartBtn = document.getElementsByClassName("restart")[0];

        scoreContainer = document.getElementsByClassName("score-container")[0];
        menuContainer = document.getElementsByClassName("menu-container")[0];

        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                var cell = {
                    row: i,
                    col: j,
                    color: "rgb(255,255,255)"
                };
                cellList.push(cell);
            }
        }
    };

    /**
     * start a new game
     * setup variables, functions
     */
    var start = function () {

        var looper, timeStart, timeLast;

        /**
         * paint timer canvas according to the total game time and the timestamp now
         */
        var updateTimer = function () {
            var x = (timeLast + timeStart - new Date().getTime()) * 400 / timeLast;
            timerCtx.fillStyle = "rgb(255, 255, 255)";
            timerCtx.fillRect(x, 0, 400, 400);
        };

        /**
         * game over
         * repaint cells on game canvas, stop loop, set game running status to false, bind button event
         */
        var gameOver = function () {
            resetGrid();
            cancelAnimationFrame(looper);
            gameRunning = false;
            setButtonEvents(true);
        };

        /**
         * loop function
         */
        var loop = function () {

            if (new Date().getTime() < timeStart + timeLast) {
                looper = requestAnimationFrame(loop);
                updateTimer();
            } else {
                gameOver();
            }

        };

        gameRunning = true;
        score = 0;
        timeStart = new Date().getTime();
        timeLast = 10000;

        updateScore(0);
        setButtonEvents(false);
        resetTimer();
        mole = new Mole();
        loop();

    };

    /**
     * do initiation
     */
    initVariables();
    resetTimer();
    resetGrid();
    setButtonEvents(true);
    canvas.addEventListener(clickEvent, clickFunc, false);

};

new Game();