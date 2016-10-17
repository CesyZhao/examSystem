$(function(){
	$(".item>a").on("click",function(event){
 		//先移除点击动画效果用的span
 		$(".effect").remove();
        if ($(this).children(".effect").length === 0) {
            $(this).prepend("<span class='effect'></span>")
        }
        //移除span上的效果css
        effect = $(this).find(".effect");
       	effect.removeClass("animate-effect");
       	//给span设置宽高
        if (!effect.height() && !effect.width()) {
            d = Math.max($(this).outerWidth(), $(this).outerHeight());
            effect.css({
                height: d,
                width: d
            })
        }
        //设置span的位置，用于表现鼠标点击的位置
        x = event.pageX - $(this).offset().left - effect.width() / 2;
        y = event.pageY - $(this).offset().top - effect.height() / 2;
        effect.css({
            top: y + 'px',
            left: x + 'px'
        }).addClass("animate-effect");
        //下拉菜单动画效果
		if($(".sec_ul").eq($(this).parent().index()).css("display") === "none"){
			$(".sec_ul").slideUp(600);
			$(".sec_ul").eq($(this).parent().index()).slideDown(600);
		}else{
			$(".sec_ul").eq($(this).parent().index()).slideUp(600);
		}
		$(".sec_item>a").removeClass("current");
	});
		$(".sec_item>a").off("click");
		$(".sec_item>a").on("click",function(){
			$(this).parent().siblings().children().removeClass("current");
			$(this).addClass("current");
			$(".right").load($(this).parent().attr("url"));
			});
			
	//默认为点击全部题目
	$(".item>a:contains('题库')").trigger("click");
	$(".sec_item>a:contains('全部题目')").trigger("click");
});

function chose(){
		$(".filter_ops a").off("click");
		$(".filter_ops").on("click","a",function(){
			$(this).parent().children().removeClass("current");
			$(this).addClass("current");
			var filter={};
			filter.题型 =$(".filter_ops a[class=current]").eq(0).text();
			filter.方向 =$(".filter_ops a[class=current]").eq(1).text();
			filter.知识点 =$(".filter_ops a[class=current]").eq(2).text();
			filter.难度 =$(".filter_ops a[class=current]").eq(3).text();
			/*var filter = [];
			filter.push($(".filter_ops a[class=current]").eq(0).text());
			filter.push($(".filter_ops a[class=current]").eq(1).text());
			filter.push($(".filter_ops a[class=current]").eq(2).text());
			filter.push($(".filter_ops a[class=current]").eq(3).text());*/
			filterHandler(filter);
			})
			//显示添加用的模块框
			$(".btns:contains('单个添加题目')").off("click");
			$(".btns:contains('单个添加题目')").on("click",function(){
				$(".bg").remove();
				$("body").append("<div class='bg'></div>");
				$(".addBox").show(400);
				$(".addBox").addClass("show");
				$(".addBox").load($(this).attr("url"));
			})
			//隐藏添加用的模块框
			$(".icon_close").on("click",function(event){
				$(this).parent().parent().parent().removeClass("show");
				$(".bg").remove();	
			})
		
	}
function kind(){
	$(".lists").load("pages/radio.html")
	$(".add_sel").eq(0).on("change",function(){
		if($(this).val() == "单选题"){
			$(".lists").load("pages/radio.html")
		}
		if($(this).val() == "多选题"){
			$(".lists").load("pages/check.html")
		}
		if($(this).val() == "简答题"){
			$(".lists").load("pages/easey.html")
		}
	})
} 
function showAnswer(){
	$("span.show").on("click",function(){
		console.log($("span.show :checkbox").prop("checked"));
		if($("span.show :checkbox").prop("checked") == true){
			$("span.show :checkbox").prop("checked",false);
			$(".answer_asis").hide();
		}else{
			$("span.show :checkbox").prop("checked",true);
			$(".answer_asis").show();
		}
	})
}