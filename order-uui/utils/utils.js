
// 搜索区域展开与收叠
$("body").on("click", "#collapse", function () {
  if ($("#collapse-body").css("display") == "none") {
    $("#collapse-body").show();
  }
  else {
    $("#collapse-body").hide();
  }
});


	/**
	 * 去除前后空格
	 */
	removeSpace = function(newStr){
		newStr = newStr.replace(/(^\s*)|(\s*$)/g, "");
		return newStr;
	}
	
	/**
	 * 去除所有空格（前后及中间）
	 */
	removeAllSpace = function(newStr){
		newStr = newStr.replace(/\s+/g, "");
		return newStr;
	}