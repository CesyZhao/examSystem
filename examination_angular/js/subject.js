/**
 * Created by CesyZhao on 2016/9/22.
 * 题目管理的js
 */
angular.module("app.subject",[])
    .config(["$routeProvider",function($routeProvider){
        $routeProvider.when("/addSingleSbj",{
            templateUrl:"tpl/subject/subjectAdd.html",
            controller:"subjectController"
        }).when("/delSubject/id/:id",{
            templateUrl:"tpl/subject/subjectList.html",
            controller:"delSbjCtrl"
        }).when("/checkPass/id/:id/state/:state",{
            templateUrl:"tpl/subject/subjectList.html",
            controller:"checkSbjCtrl"
        })
    }])
    .controller("checkSbjCtrl",['$location',"sbjHandlerService","$routeParams",
        function($location,sbjHandlerService,$routeParams){
            sbjHandlerService.checkSbj($routeParams.id,$routeParams.state,function(data){
                alert(data);
                $location.path('/AllSubject/a/0/b/0/c/0/d/0');
            })
    }])
    .controller("delSbjCtrl",["$scope","$location","sbjHandlerService","$routeParams",
        function($scope,$location,sbjHandlerService,$routeParams){
        $location.path('/AllSubject/a/0/b/0/c/0/d/0');
        var flag = confirm("确认要删除吗?");
        if(flag){
            sbjHandlerService.delSbj($routeParams.id,function(){

            });
        }
        $location.path('/AllSubject/a/0/b/0/c/0/d/0');
    }])
    .controller("subjectController", ["$scope","$location","subjectService","sbjHandlerService",
        "$routeParams","$location",
        function($scope,$location,subjectService,sbjHandlerService,$routeParams,$location){

        //$scope.pageClass="page-allSubject";
        //获取题型，难度，方向，知识点
        $scope.params = $routeParams;
        $scope.subject = {
            typeId :1,
            levelId:1,
            departmentId:1,
            topicId:1,
            stem:"",
            answer:"",
            analysis:"",
            choiceContent:[],
            choiceCorrect:[false,false,false,false]
        };
        $scope.saveSbj = function (event,data) {
                sbjHandlerService.saveSbj($scope.subject,function(data){
                    alert(data);
                    if(angular.element(event.target).text() == '保存并继续'){
                        var subject = {
                            typeId :1,
                            levelId:1,
                            departmentId:1,
                            topicId:1,
                            stem:"",
                            answer:"",
                            analysis:"",
                            choiceContent:[],
                            choiceCorrect:[false,false,false,false]
                        };
                        angular.copy(subject,$scope.subject);
                    }else{
                        $location.path('/AllSubject/a/0/b/0/c/0/d/0');
                }

                })

        }
        subjectService.getAllSubjectType(function(data){
            $scope.types = data;
        });
        subjectService.getAllLevels(function(data){
            $scope.levels = data;
        });
        subjectService.getAllDpts(function(data){
            $scope.dpts = data;
        });
        subjectService.getAllTopics(function(data){
            $scope.topics = data;
        });
        //获取所有题目详细信息
        sbjHandlerService.getAllSbj($scope.params,function(data){

            data.forEach(function(subject){
               //为每个选项添加编号
                if(subject.subjectType){
                    subject.choices.forEach(function(choice,index){
                      index =  index == 0?'A':(index == 1?'B':(index == 2?'C':(index == 3?'D':'E')));
                        choice.no = index;
                    });
                    var answer =[];
                    if(subject.subjectType.id!=3){
                        subject.choices.forEach(function(choice){
                            if(choice.correct){
                                answer.push(choice.no);
                            }
                        });
                        subject.answer = answer.toString();
                    }
                }
            });
            $scope.sbjs = data;

        });
        //单个添加按钮点击事件
        $scope.load = function(event){
            if(angular.element(event.target).text() == "单个添加题目"){
                $location.path("/addSingleSbj");
            }
            console.log(angular.element(event.target).text());
        };
        /*过滤器方法方法
        $scope.opt = {
            subjectType : {
            },
            subjectLevel : {
            },
            department:{

            },
            topic:{

            }
        };

        $scope.filter = function(event){
                angular.element(event.target).siblings().removeClass("active3");
                angular.element(event.target).addClass("active3");
            var obj = {
                subjectType:angular.element(".active3").eq(0).text(),
                subjectLevel:angular.element(".active3").eq(1).text(),
                subjectDepartment:angular.element(".active3").eq(2).text(),
                subjectTopic:angular.element(".active3").eq(3).text()

            }
            sbjHandlerService.filtrate(obj);

            for (var key in obj){
                if(obj[key] == "全部"){
                    delete obj[key];
                }
                $scope.opt.subjectType.realName = obj.subjectType;
                $scope.opt.subjectLevel.realName = obj.subjectLevel;
                $scope.opt.department.name = obj.subjectDepartment  ;
                $scope.opt.topic.title = obj.subjectTopic;
            }
        }*/
    }])
    .controller("addSingleSbjCtrl",["$scope",function($scope){
        //$scope.pageClass="page-addSgSbj";
    }])

    .service("subjectService",["$http",function($http){
        this.data = "";
        this.getAllSubjectType = function(method){
           // url=url+"?callback=JSON_CALLBACK";
            //$http.get("data/types.json").success(function(data){
            $http.get("http://172.16.0.5:7777/test/exam/manager/getAllSubjectType.action").success(function(data){
                method(data);
            });
        };
        this.getAllLevels = function(method){
            //$http.get("data/levels.json").success(function(data){
                $http.get("http://172.16.0.5:7777/test/exam/manager/getAllSubjectLevel.action").success(function(data){
                method(data);
            });
        };
        this.getAllDpts = function(method){
            //$http.get("data/departmentes.json").success(function(data){
                $http.get("http://172.16.0.5:7777/test/exam/manager/getAllDepartmentes.action").success(function(data){
                method(data);
            });
        };
        this.getAllTopics = function(method){
            //$http.get("data/topics.json").success(function(data){
                $http.get("http://172.16.0.5:7777/test/exam/manager/getAllTopics.action").success(function(data){
                method(data);
            });
        };

    }])
    .service("sbjHandlerService",["$http","$httpParamSerializer",function($http,$httpParamSerializer){
        this.checkSbj = function(id,state,method){
            if(state == 1){
                state = "通过";
            }else{
                state ="不通过"}
            $http.get("http://172.16.0.5:7777/test/exam/manager/checkSubject.action",{
                params:{
                    'subject.id':id,
                    'subject.checkState':state
                }
            }).success(function(data){
                method(data);
            })
        }
        this.delSbj = function(id,method){
            $http.get("http://172.16.0.5:7777/test/exam/manager/delSubject.action",{
                params:{
                    'subject.id':id
                }
            }).success(function(data){
                method(data);
            })
        }
        this.getAllSbj = function(params,method){
            var data = {};
            for (var key in params){
                var val = params[key];
                if(val!=0){
                    switch (key){
                        case 'a':
                            data['subject.subjectType.id'] = val;
                            break;
                        case 'b':
                            data['subject.subjectLevel.id'] = val;
                            break;
                        case 'c':
                            data['subject.department.id'] = val;
                            break;
                        case 'd':
                            data['subject.topic.id'] = val;
                            break;
                    }
                }
            }
            //$http.get("data/subjects.json").success(function(data){
                $http.get("http://172.16.0.5:7777/test/exam/manager/getAllSubjects.action",{
                    params:data
                }).success(function(data) {
                    console.log("success");
                    method(data);
                });
        };
        this.saveSbj = function(params,method){
            var data = {};
            for (var key in params){
                var val = params[key];
                switch (key){
                    case 'typeId':
                        data['subject.subjectType.id'] = val;
                        break;
                    case 'levelId':
                        data['subject.subjectLevel.id'] = val;
                        break;
                    case 'departmentId':
                        data['subject.department.id'] = val;
                        break;
                    case 'topicId':
                        data['subject.topic.id'] = val;
                        break;
                    case 'stem':
                        data['subject.stem'] = val;
                        break;
                    case 'answer':
                        data['subject.answer'] = val;
                        break;
                    case 'analysis':
                        data['subject.analysis'] = val;
                        break;
                    case 'choiceContent':
                        data['choiceContent'] = val;
                        break;
                    case 'choiceCorrect':
                        data['choiceCorrect'] = val;
                        break;
                }
            }
            //对data进行表单格式的序列化
           data = $httpParamSerializer(data);
            $http.post("http://172.16.0.5:7777/test/exam/manager/saveSubject.action",data,{
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded"
                }
            }).success(function(data){
                method(data)
            })
        };
    }])

    .filter("filtrate",function(){
        return function(input,id){
            if(input){

                if(id==0){
                    return input;
                }
                var result = input.filter(function (item) {
                        return item.department.id == id;

                    })
            }
            return result;
        }
    })
    .directive("onChange",function(){
        return {
            link:function(scope,element){
              element.on("change",function(event){
                    var type = $(this).attr("type");
                    var index = $(event.target).val();

                    //alert(index);
                  if(type == "radio") {
                      scope.subject.choiceCorrect = [false, false, false, false];
                      scope.subject.choiceCorrect[index] = true;

                  }else if(type = "checkbox"){
                      scope.subject.choiceCorrect[index] = true;
                  }
                  scope.$digest();
              })

            }
        }
    })
;
