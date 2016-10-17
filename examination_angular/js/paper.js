/**
 * Created by CesyZhao on 2016/9/28.
 */
angular.module("app.paper",["ng","app.subject"])
    .config(["$routeProvider",function($routeProvider){
        $routeProvider.when("/addPaperSbj/a/:a/b/:b/c/:c/d/:d",{
            templateUrl:"tpl/paper/subjectList.html",
            controller:"subjectController"
        })
    }])
    //试卷列表控制器
    .controller("paperManagerCtrl",["$scope","paperService",function($scope,paperService){
            paperService.getAllPapers(function(data){
                $scope.papers = data;
            })
    }])
    .controller("paperAddCtrl",["$scope","paperService","subjectService","model","$routeParams",
        function($scope,paperService,subjectService,model,$routeParams){
            $scope.pmodel = model.model;
            subjectService.getAllDpts(function(data){
               $scope.dps = data;
            })
            if($routeParams.id!=0){
                model.saveSbjId($routeParams.id);
                model.saveSbj(angular.copy($routeParams));
            }
            $scope.savePaper = function(){
                paperService.savePaper($scope.pmodel,function(data){
                    alert(data);
                })
            }

    }])
    .service("model",[function(){
        this.model = {
            title:"",
            desc:"",
            dps:1,
            at:0,
            total:0,
            scores:[],
            subjectIds:[],
            subjects:[]
        };
        this.saveSbjId = function(id){
           this.model.subjectIds.push(id);
        }
        this.saveSbj = function(sbj){
            this.model.subjects.push(sbj);
        }
    }])
    .service("paperService",["$http","$httpParamSerializer",function($http,$httpParamSerializer){
       this.getAllPapers = function(method) {
           $http.get("http://172.16.0.5:7777/test/exam/manager/getAllExamPapers.action")
               .success(function (data) {
                    method(data);
               })
       };
       this.savePaper = function(paper,method){
           var data = {};
           for (var key in paper){
               var val = paper[key];
               switch (key){
                   case 'title':
                       data['paper.title'] = val;
                       break;
                   case 'desc':
                       data['paper.description'] = val;
                       break;
                   case 'dps':
                       data['paper.department.id'] = val;
                       break;
                   case 'at':
                       data['paper.answerQuestionTime'] = val;
                       break;
                   case 'total':
                       data['paper.totalPoints'] = val;
                       break;
                   case 'scores':
                       data['scores'] = val;
                       break;
                   case 'subjectIds':
                       data['subjectIds'] = val;
                       break;
               }
           }
           //对data进行表单格式的序列化
           data = $httpParamSerializer(data);
           $http.post("http://172.16.0.5:7777/test/exam/manager/saveExamPaper.action",data,{
               headers:{
                   "Content-Type":"application/x-www-form-urlencoded"
               }
           }).success(function(data){
               method(data)
           })
       }
    }])
    .directive("onCount",function($filter){
        return {
            link:function(scope,element){
                element.on("focusout",function(){
                    scope.pmodel.total=0;
                    for(var i=0;i<$(".tc>:input").length;i++){
                        if($(".tc>:input").eq(i).val()){
                        var score = parseInt($(".tc>:input").eq(i).val());
                        //console.log(score);

                        scope.pmodel.total += score;
                            $(".pl5>:input").val(scope.pmodel.total);
                        scope.$digest();
                       // console.log(scope.pmodel.total);
                        }
                    }

                })
            }
        }
    })
;