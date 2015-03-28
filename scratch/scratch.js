var Scratch = function () {
    var paintings = {
        list: [
            {type: "text", content: "谢谢惠顾", fontFamily: "Microsoft YaHei", fontWeight: "bold", fillStyle: "black"},
            {type: "text", content: "你真蛋疼", fontFamily: "Microsoft YaHei", fontWeight: "bold", fillStyle: "yellow"},
            {type: "text", content: "为何放弃治疗", fontFamily: "Microsoft YaHei", fontWeight: "bold", fillStyle: "blue"},
            {type: "text", content: "智商捉急", fontFamily: "Microsoft YaHei", fontWeight: "bold", fillStyle: "grey"},
            {type: "text", content: "累觉不爱", fontFamily: "Microsoft YaHei", fontWeight: "bold", fillStyle: "red"},
            {type: "text", content: "我勒个去", fontFamily: "Microsoft YaHei", fontWeight: "bold", fillStyle: "green"}
        ],
        divideTo: 20
    };
    var paintLayer = function () {
        var layerCanvas = document.getElementById("layerCanvas"), layerCtx = layerCanvas.getContext("2d");
        var width = document.getElementById("canvas").width;
        var height = document.getElementById("canvas").height;
        layerCanvas.width = width;
        layerCanvas.height = height;
        layerCtx.fillStyle = "rgb(255,255,255)";
        layerCtx.fillRect(0, 0, width, height);
    };
    var bindEvent = function () {
        var layerCanvas = document.getElementById("layerCanvas"), layerCtx = layerCanvas.getContext("2d");

        var isMobile = function () {
            var check = false;
            (function (a) {
                if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))check = true
            })(navigator.userAgent || navigator.vendor || window.opera);
            return check;
        }();

        var savedTouches = [],
            getTouch = function (touch) {
                return {
                    id: isMobile ? touch.identifier : 0,
                    x: touch.pageX,
                    y: touch.pageY
                };
            },
            getTouchIndex = function (id) {
                for (var i in savedTouches) {
                    if (id == savedTouches[i].id) {
                        return i;
                    }
                }
                return -1;
            };

        var START_EV = isMobile ? 'touchstart' : 'mousedown',
            MOVE_EV = isMobile ? 'touchmove' : 'mousemove',
            END_EV = isMobile ? 'touchend' : 'mouseup',

            START_FUNC = function (e) {
                e.preventDefault();
                var touches = isMobile ? e.changedTouches : [e];
                for (var i in touches) {
                    var touch = getTouch(touches[i]);
                    savedTouches.push(touch);
                    layerCtx.clearRect(touch.x - paintings.clearSize, touch.y - paintings.clearSize, paintings.clearSize * 2, paintings.clearSize * 2);
                }
                return false;
            },
            MOVE_FUNC = function (e) {
                e.preventDefault();
                var touches = isMobile ? e.changedTouches : [e];
                for (var i in touches) {
                    var touch = getTouch(touches[i]);
                    var id = getTouchIndex(touch.id);
                    if (id >= 0) {
                        layerCtx.clearRect(touch.x - paintings.clearSize, touch.y - paintings.clearSize, paintings.clearSize * 2, paintings.clearSize * 2);
                        savedTouches.splice(id, 1, touch);
                    }
                }
                return false;
            },
            END_FUNC = function (e) {
                e.preventDefault();
                var touches = isMobile ? e.changedTouches : [e];
                for (var i in touches) {
                    var touch = getTouch(touches[i]);
                    var id = getTouchIndex(touch.id);
                    if (id >= 0) {
                        layerCtx.clearRect(touch.x - paintings.clearSize, touch.y - paintings.clearSize, paintings.clearSize * 2, paintings.clearSize * 2);
                        savedTouches.splice(id, 1);
                    }
                }
                return false;
            };
        layerCanvas.addEventListener(START_EV, START_FUNC, false);
        layerCanvas.addEventListener(MOVE_EV, MOVE_FUNC, false);
        layerCanvas.addEventListener(END_EV, END_FUNC, false);
        layerCanvas.addEventListener("touchcancel", END_FUNC, false);
        layerCanvas.addEventListener("touchleave", END_FUNC, false);
        layerCanvas.addEventListener("mouseout", END_FUNC, false);
    };
    var random = Math.floor(Math.random() * paintings.list.length);
    var canvas = document.getElementById("canvas"), ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (paintings.list[random].type == "image") {
        var img = new Image();
        img.src = paintings.list[random].content;
        img.onload = function () {
            if (img.width / img.height > canvas.width / canvas.height) {
                paintings.width = canvas.width;
                paintings.height = img.height / img.width * paintings.width;
            } else {
                paintings.height = canvas.height;
                paintings.width = img.width / img.height * paintings.height;
            }
            paintings.clearSize = Math.sqrt(paintings.width * paintings.height) / paintings.divideTo;
            ctx.drawImage(img, canvas.width / 2 - paintings.width / 2, canvas.height / 2 - paintings.height / 2, paintings.width, paintings.height);
            paintLayer();
            bindEvent();
        }
    }
    if (paintings.list[random].type == "text") {
        var text = {
            content: paintings.list[random].content,
            height: 1000,
            fillStyle: paintings.list[random].fillStyle,
            align: "center",
            baseline: "middle",
            fontFamily: paintings.list[random].fontFamily,
            fontWeight: paintings.list[random].fontWeight
        };
        ctx.font = text.fontWeight + " " + text.height + "px " + text.fontFamily;
        ctx.textAlign = text.align;
        ctx.textBaseline = text.baseline;
        text.width = ctx.measureText(text.content).width;
        if (text.width / text.height > canvas.width / canvas.height) {
            text.height = canvas.width / text.width * text.height;
        } else {
            text.height = canvas.height;
        }
        ctx.font = text.fontWeight + " " + text.height + "px " + text.fontFamily;
        text.width = ctx.measureText(text.content).width;
        paintings.clearSize = Math.sqrt(text.width * text.height) / paintings.divideTo;
        ctx.fillStyle = text.fillStyle;
        ctx.fillText(text.content, canvas.width / 2, canvas.height / 2);
        paintLayer();
        bindEvent();
    }

};

new Scratch();