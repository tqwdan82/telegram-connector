var mgmChatGrpApp = angular.module('mgmChatGrpApp', []);
mgmChatGrpApp.controller('mgmChatGrpCtrl', function($scope) {
    $scope.data = {
        chatGrps:[],
        editChatGrp:{}
    };
    $scope.deletingChatGrpid = '';
    $scope.test = {
        chatGroup : "",
        message : ""
    }

    $scope.setTest = function(cgName){
        console.log(cgName)
        $scope.test.chatGroup = cgName;
    };

    $scope.sendTest = function(){
        console.log($scope.test.chatGroup)
        console.log($scope.test.message)

        document.getElementById("overlay").style.display = "block";
        let httpCallback = function(response){
            $scope.$apply(function(){
                
                $scope.init();
            });
        };

        let data = {
            dest: $scope.test.chatGroup,
            message: $scope.test.message
        }
        
        httpPostAsync("../../web/telegram-connector/api/sendTestTelegram", data, httpCallback);
    };

    $scope.editing = function(id){

        document.getElementById("overlay").style.display = "block";
        for(let idx = 0; idx < $scope.data.chatGrps.length; idx++){
            let chatGrp = $scope.data.chatGrps[idx];
            if(chatGrp.id === id){
                Object.assign($scope.data.editChatGrp, chatGrp);
                break;
            }
        }
        document.getElementById("overlay").style.display = "none";

    }

    $scope.update = function(){
        document.getElementById("overlay").style.display = "block";
        let httpCallback = function(response){
            $scope.$apply(function(){
                $scope.init();
            });
        };
        
        httpPutAsync("../../web/telegram-connector/api/ConfigTelegram", $scope.data.editChatGrp, httpCallback);
    }

    $scope.deleting = function(id){
        $scope.deletingChatGrpid = id;
    }

    $scope.delete = function(){
        document.getElementById("overlay").style.display = "block";
        let httpCallback = function(response){
            $scope.init();
        };
        httpDeleteAsync("../../web/telegram-connector/api/ConfigTelegram", {'id':$scope.deletingChatGrpid}, httpCallback);
    }

    $scope.init = function(){
        document.getElementById("overlay").style.display = "block";

        let httpCallback = function(response){
            let res = JSON.parse(response);

            $scope.$apply(function(){
                $scope.data.editChannel = {};
                $scope.test = {
                    chatGroup : "",
                    message : ""
                }
                
                $scope.data.chatGrps = res;
                document.getElementById("overlay").style.display = "none";
            });
        };
        httpGetAsync("../../web/telegram-connector/api/ConfigTelegram?group=ChatGroup", {}, httpCallback);

    };

    $scope.init();
});