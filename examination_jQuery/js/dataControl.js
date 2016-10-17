function getData(url){
	$.ajax({
		url:url,
		dataType:"json",
		success: dataHandler	
	})
}	
function dataHandler(data){
	//动态生成挑选条件
	for(var key in data[1]){
		if(key=="题型"||key=="方向"||key=="知识点"||key=="难度"){
		var newTr = $("<tr></tr>");
		var newTd = $("<td>"+key+"</td>");
		var rightTd = $("<td class='td_right'></td>");
		var div = $("<div class='chose'></div>");
		var a_all = $("<a href='#' class='current'>全部</a>");
		div.append(a_all);
		rightTd.append(div);
		newTr.append(newTd);
		newTr.append(rightTd);
		$("tbody").append(newTr);
		}
	}
	data.forEach(function(sbj,index){
		//动态生成种类
		for(var key in sbj){
			if(key=="题型"){
				var choices = $(".chose:eq(0) a:contains("+sbj[key]+")");
				if(choices.length == 0){
					var newA = $("<a href='#'>"+sbj[key]+"</a>");
					$("td>div").eq(0).append(newA);
				}
			}
			if(key=="方向"){
				var choices = $(".chose:eq(1) a:contains("+sbj[key]+")");
				if(choices.length == 0){
					var newA = $("<a href='#'>"+sbj[key]+"</a>");
					$("td>div").eq(1).append(newA);
				}
			}
			if(key=="知识点"){
				var choices = $(".chose:eq(2) a:contains("+sbj[key]+")");
				if(choices.length == 0){
					var newA = $("<a href='#'>"+sbj[key]+"</a>");
					$("td>div").eq(2).append(newA);
				}
			}
			if(key=="难度"){
				var choices = $(".chose:eq(3) a:contains("+sbj[key]+")");
				if(choices.length == 0){
					var newA = $("<a href='#'>"+sbj[key]+"</a>");
					$("td>div").eq(3).append(newA);
				}
			}
		}
	})
}
//加载select中的选项
function loadOpts(url){
	$.ajax(url,{
		dataType:"json",
		success:optsHandler
	})
}
function optsHandler(data){
	data.forEach(function(opt){
		for(var key in opt){
			if(key=="题型"){
				var opts = $(".add_sel:eq(0) option:contains("+opt[key]+")");
				if(opts.length == 0){
					var newOp = $("<option value="+opt[key]+">"+opt[key]+"</option>")
					$(".add_sel:eq(0)").append(newOp);
				}
			}
			if(key=="方向"){
				var opts = $(".add_sel:eq(1) option:contains("+opt[key]+")");
				if(opts.length == 0){
					var newOp = $("<option value="+opt[key]+">"+opt[key]+"</option>")
					$(".add_sel:eq(1)").append(newOp);
				}
			}
			if(key=="知识点"){
				var opts = $(".add_sel:eq(2) option:contains("+opt[key]+")");
				if(opts.length == 0){
					var newOp = $("<option value="+opt[key]+">"+opt[key]+"</option>")
					$(".add_sel:eq(2)").append(newOp);
				}
			}
			if(key=="难度"){
				var opts = $(".add_sel:eq(3) option:contains("+opt[key]+")");
				if(opts.length == 0){
					var newOp = $("<option value="+opt[key]+">"+opt[key]+"</option>")
					$(".add_sel:eq(3)").append(newOp);
				}
			}
		}
	})
}
//传值的函数
function postData(url){
	var sbj;
	$(".save_btn a").on("click",function(){
		var kind = $(".add_sel").eq(0).val();
		var deraction = $(".add_sel").eq(1).val();
		var point = $(".add_sel").eq(2).val();
		var level = $(".add_sel").eq(3).val();
		var question = $("#txt1").val();
		//不同题型下的获取值
		switch(kind){
			case "单选题":
				var radio = $(":radio:checked").val();
				var anwser = $(":radio:checked").parent().parent().next().children().val();
				anwserTotal = [radio,anwser];
				var analysis = $("#txt6").val();
					break;
			case "多选题":
				var checked = $(":checkbox:checked").parent().prev().text();
				var anwser = $(":checkbox:checked").parent().parent().next().children().val();
				anwserTotal = [checked,anwser];
				var analysis = $("#txt6").val();
					break;
			case "简答题":
				var anwserTotal = $("#txt2").val();
				var analysis = $("#txt3").val();
				break;
		}
		//将值放入对象
		sbj={
			题型:kind,
			方向:deraction,
			知识点:point,
			难度:level,
			题目题干:question,
			答案:anwserTotal,
			答案解析:analysis
			};
		console.log(sbj);
		if($(this).text() == "保存并继续"){
			$(".addBox").load("pages/Add.html");
		}else{
			$(".icon_close").trigger("click");
		}
	})
}
/*
function loadQuestion(arr){
	$(".content").remove();
	$.getJSON("data/allSbj.json",function(data,arr){
		data.forEach(function(question){
			var div = $("<div class='content'></div>");
			var div_title =$("<div class='content_title'>题号："+question.题号+"  题型："+question.题型+"  方向："+question.方向+"  知识点:"+question.知识点+"  难度："+question.难度+"  上传人："+question.上传人+"  来源："+question.来源+"  上传时间:"+question.上传时间+"  组卷次数："+question.组卷次数+"</div>");	
			var div_content =$("<div class='content_content'>"+question.题目题干+"</div>");
			var div_options = $(" <div class='content_options'><a href='#'>审核通过</a><a href='#'>审核不通过</a><a href='#'>删除题目</a></div>")
			div.append(div_title,div_content,div_options)
			$(".ct_box").append(div);
		})
	})
}*/
function filterHandler(obj){
	for(var key in obj){
		if(obj[key]=="全部"){
			delete obj[key];
		}
	}
	
	$.getJSON("data/allSbj.json",function(data){
		//data = data.filter(function(question){
			
		//})
		for(var key in obj){
			data = data.filter(function(question){
				
					if(question[key] == obj[key]){
						return true;
					}
			})
		}
		$(".content").remove();
		var counter = 0;
		data.forEach(function(question){
			var div = $("<div class='content'></div>");
			var div_title =$("<div class='content_title'>题号："+question.题号+"  题型："+question.题型+"  方向："+question.方向+"  知识点:"+question.知识点+"  难度："+question.难度+"  上传人："+question.上传人+"  来源："+question.来源+"  上传时间:"+question.上传时间+"  组卷次数："+question.组卷次数+"</div>");
			var div_hide = $("<div class='answer_asis'>答案："+question.答案+"<br>解析："+question.题目解析+"</div>");
			var div_content =$("<div class='content_content'>"+question.题目题干+"</div>");
			div_content.append(div_hide);
			var div_options = $(" <div class='content_options'><a href='#'>审核通过</a><a href='#'>审核不通过</a><a href='#'>删除题目</a></div>")
			div.append(div_title,div_content,div_options)
			$(".ct_box").append(div);
			if($(".content").length){
				counter++;
			}else{ counter = 0;}
		})
			$("em").text(counter);
	})
}