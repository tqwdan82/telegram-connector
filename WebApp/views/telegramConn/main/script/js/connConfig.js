var connConfigApp = angular.module('connConfigApp', []);
connConfigApp.controller('connConfigCtrl', function($scope) {
    $scope.data = {
        token:{
            value : "",
            key:"token",
            group:"Telegram"
        },
        selfChat:{

        }
    };
    $scope.botInitialized = false;

    $scope.save = function(){
        document.getElementById("overlay").style.display = "block";
        if(typeof $scope.data.token.id === 'undefined' 
            || typeof $scope.data.token.id === null 
            || typeof $scope.data.token.id === ''){ // update token

            let httpCallback = function(response){
    
                document.getElementById("overlay").style.display = "none";
                window.location.href = '/telegramConn/main?action=connConfig';
            };
            httpPostAsync("../../web/telegram-connector/api/saveTelegramConn", $scope.data.token, httpCallback);

        } else{ // new creation
            

            let httpCallback = function(response){

                document.getElementById("overlay").style.display = "none";
                window.location.href = '/telegramConn/main?action=connConfig';
            };
            httpPutAsync("../../web/telegram-connector/api/saveTelegramConn", $scope.data.token, httpCallback);
        }  
    };

    $scope.test = function(){
        document.getElementById("overlay").style.display = "block";

        let httpCallback = function(response){
            alert("Test message sent.");
            document.getElementById("overlay").style.display = "none";
            
        };
        httpPostAsync("../../web/telegram-connector/api/TestTelegram", {}, httpCallback);
    };

    $scope.init = function(){

        document.getElementById("overlay").style.display = "block";

        let httpCallback = function(response){
            let res = JSON.parse(response);
            $scope.$apply(function(){

                $scope.botInitialized = res.botInitialized;

                if(res.data.length > 0){
                    $scope.data.token = res.data[0];
                }else{
                    $scope.data.token = {
                        value : "",
                        key:"token",
                        group:"Telegram"
                    };
                }
                document.getElementById("overlay").style.display = "none";
            });
        };
        httpGetAsync("../../web/telegram-connector/api/TelegramConfigStatus?group=Telegram&key=token", {}, httpCallback);

    };

    $scope.init();
});