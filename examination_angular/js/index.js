/**
 * Created by CesyZhao on 2016/9/22.
 */
$(function(){
    //左侧菜单栏下拉动画效果
    $(".baseUI>li").off("click");
    $(".baseUI>li").on("click","a",function(event){
        if($(event.target).next().css("display") == "none"){
            $(".baseUI>li>ul").slideUp(400);
            $(event.target).next().slideDown(400);
        }else{
            $(event.target).next().slideUp(400);
        }
    });
    $(".baseUI>li>a").eq(0).trigger("click");
    $(".baseUI>li:eq(0)>ul a").off("click");
    $(".baseUI>li>ul a").on("click",function(){
        $(".baseUI>li>ul>li").removeClass("current");
        $(this).parent().addClass("current");
    });
    $(".baseUI>li:eq(0)>ul a").eq(0).trigger("click");
})

//核心模块
angular.module("app",["ng","ngRoute","app.subject","ngAnimate","app.paper"])
    .controller("mainCtrl",["$scope",function(){

    }])
    .config(["$routeProvider",function($routeProvider){
        /*
        * a:
        * */
        $routeProvider.when("/AllSubject/a/:a/b/:b/c/:c/d/:d",{
            templateUrl:"tpl/subject/subjectList.html",
            controller:"subjectController"
        }).when("/PaperList",{
            templateUrl:"tpl/paper/paperManager.html",
            controller:"paperManagerCtrl"
        }).when("/PackagePaper/id/:id/stem/:stem/type/:type/topic/:topic/level/:level",{
            templateUrl:"tpl/paper/paperAdd.html",
            controller:"paperAddCtrl"
        });
    }])
;
