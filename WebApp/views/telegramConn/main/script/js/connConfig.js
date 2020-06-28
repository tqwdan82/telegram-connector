var connConfigApp = angular.module('connConfigApp', []);
connConfigApp.controller('connConfigCtrl', function($scope) {
    $scope.data = {
        token:{
            value : "",
            key:"token",
            group:"Telegram"
        },
        selfChat:{
            value:"",
            key:"testChatId",
            group:"Telegram"
        }
    };
    $scope.botInitialized = false;

    $scope.saveToken = function(){
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

    $scope.saveChat = function(){
        document.getElementById("overlay").style.display = "block";
        if(typeof $scope.data.token.id === 'undefined' 
            || typeof $scope.data.token.id === null 
            || typeof $scope.data.token.id === ''){ // update token

            let httpCallback = function(response){
    
                document.getElementById("overlay").style.display = "none";
                window.location.href = '/telegramConn/main?action=connConfig';
            };
            httpPutAsync("../../web/telegram-connector/api/ConfigTelegram", $scope.data.selfChat, httpCallback);

        } else{ // new creation
            
            let httpCallback = function(response){

                document.getElementById("overlay").style.display = "none";
                window.location.href = '/telegramConn/main?action=connConfig';
            };
            httpPostAsync("../../web/telegram-connector/api/ConfigTelegram", $scope.data.selfChat, httpCallback);
        }  
    };

    $scope.testChat = function(){
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
                    res.data.forEach( valPair => {
                        if(valPair.key === 'token'){
                            $scope.data.token = valPair;
                        }
                        else if(valPair.key === 'testChatId'){
                            $scope.data.selfChat = valPair;
                        }
                    });
                }else{
                    $scope.data.token = {
                        value : "",
                        key:"token",
                        group:"Telegram"
                    };

                    $scope.data.selfChat = {
                        value : "",
                        key:"testChatId",
                        group:"Telegram"
                    };
                }

                console.log($scope.data)
                document.getElementById("overlay").style.display = "none";
            });
        };
        httpGetAsync("../../web/telegram-connector/api/TelegramConfigStatus?group=Telegram", {}, httpCallback);

    };

    $scope.init();
});