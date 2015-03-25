//auto flip blocks
var autoFlip = function(mine,block){
	for (var i in block){
		i = i-0;
		for (var j in block[i]){
			j=j-0;
			if (block[i][j].classList.contains("block")){
				for (var k=0;k<8;k++){
					var row_ = i+rowDiff[k], col_ = j+colDiff[k];
					if (row_<0 || row_>=fieldRow || col_<0 || col_>=fieldCol || block[row_][col_].innerText == "") continue;
					var mark_ = block[row_][col_].innerText - 0;
					var marked = 0;
					for (var l=0;l<8;l++){
						var rowNear = row_+rowDiff[l], colNear = col_+colDiff[l];
						if (rowNear<0 || rowNear>=fieldRow || colNear<0 || colNear>=fieldCol) continue;
						if (block[rowNear][colNear].classList.contains("mark")) marked++;
					}
					if (marked == mark_) flipBlock(mine,i,j);
				}
			}
		}
	}
}
//x
document.addEventListener("keydown", function(e) {
	if (String.fromCharCode(e.which) == "X") autoFlip(mine,block);
});
