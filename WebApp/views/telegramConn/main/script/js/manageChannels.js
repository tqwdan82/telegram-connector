var mgmChnnlApp = angular.module('mgmChnnlApp', []);
mgmChnnlApp.controller('mgmChnnlCtrl', function($scope) {
    $scope.data = {
        channels:[],
        editChannel:{}
    };
    $scope.deletingChnlid = '';
    $scope.test = {
        channel : "",
        message : ""
    }

    $scope.setTest = function(channelName){
        $scope.test.channel = channelName;
    };

    $scope.sendTest = function(){

        document.getElementById("overlay").style.display = "block";
        let httpCallback = function(response){
            $scope.$apply(function(){
                
                $scope.init();
            });
        };

        let data = {
            dest: "@"+$scope.test.channel,
            message: $scope.test.message
        }
        
        httpPostAsync("../../web/telegram-connector/api/sendTestTelegram", data, httpCallback);
    };

    $scope.editing = function(id){
        document.getElementById("overlay").style.display = "block";
        for(let idx = 0; idx < $scope.data.channels.length; idx++){
            let chnnl = $scope.data.channels[idx];
            if(chnnl.id === id){
                Object.assign($scope.data.editChannel, chnnl);
                break;
            }
        }
        document.getElementById("overlay").style.display = "none";

    }

    $scope.update = function(){
        document.getElementById("overlay").style.display = "block";
        let httpCallback = function(response){
            $scope.$apply(function(){
                $scope.data.editChannel = {}
                $scope.init();
            });
        };
        
        httpPutAsync("../../web/telegram-connector/api/ConfigTelegram", $scope.data.editChannel, httpCallback);
    }

    $scope.deleting = function(id){
        $scope.deletingChnlid = id;
    }

    $scope.delete = function(){
        document.getElementById("overlay").style.display = "block";
        let httpCallback = function(response){
            $scope.init();
        };
        httpDeleteAsync("../../web/telegram-connector/api/ConfigTelegram", {'id':$scope.deletingChnlid}, httpCallback);
    }

    $scope.init = function(){
        document.getElementById("overlay").style.display = "block";

        let httpCallback = function(response){
            let res = JSON.parse(response);

            $scope.$apply(function(){
                
                $scope.test = {
                    channel : "",
                    message : ""
                }
                $scope.data.channels = res;
                document.getElementById("overlay").style.display = "none";
            });
        };
        httpGetAsync("../../web/telegram-connector/api/ConfigTelegram?group=Channel", {}, httpCallback);

    };

    $scope.init();
});