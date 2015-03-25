//show mine
var showMine = function(block){
	for (var i in block){
		for (var j in block[i]){
			if (block[i][j].classList.contains("block")){
				for (var k=0;k<8;k++){
					var row = i-(-rowDiff[k]), col = j-(-colDiff[k]);
					if (row<0 || row>=fieldRow || col<0 || col>=fieldCol || block[row][col].innerText == "") continue;
					var mark = block[row][col].innerText - 0;
					var blocked = 0;
					for (var l=0;l<8;l++){
						var rowNear = row-(-rowDiff[l]), colNear = col-(-colDiff[l]);
						if (rowNear<0 || rowNear>=fieldRow || colNear<0 || colNear>=fieldCol) continue;
						if (block[rowNear][colNear].classList.contains("block")) blocked++;
					}
					if (blocked == mark && !block[i][j].classList.contains("mark")){
						block[i][j].classList.add("mark");
						ifWin--;
						if (ifWin == 0) gameWin();
					}
				}
			}
		}
	}
}
//z
document.addEventListener("keydown", function(e) {
	if (String.fromCharCode(e.which) == "Z") showMine(block);
});
