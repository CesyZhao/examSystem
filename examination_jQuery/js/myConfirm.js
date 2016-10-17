
	function myConfirm(str){
		$(".confirmBox").remove();
		$("body").append("<div class='confirmBox'></div>");
		$(".confirmBox").append("<button val='yes'>确认</button>");
		$(".confirmBox").append("<button val='no'>取消</button>");
		var result;
		$(".confirmBox button").on("click",function(){
			var val = $(this).attr("val");
			result = val;
		})
		console.log(result);
		return result;
	}
