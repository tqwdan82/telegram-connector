var newChatGrpApp = angular.module('newChatGrpApp', []);
newChatGrpApp.controller('newChatGrpCtrl', function($scope) {
    $scope.data = {
        value : "",
        key:"",
        group:"ChatGroup"
    };

    $scope.init = function(){
        $scope.data = {
            value : "",
            key:"",
            group:"ChatGroup"
        }
    };

    $scope.init();

    $scope.create = function(){
        document.getElementById("overlay").style.display = "block";
        let httpCallback = function(response){

            $scope.data = {
                value : "",
                key:"",
                group:"ChatGroup"
            }

            document.getElementById("overlay").style.display = "none";
            window.location.href = '/telegramConn/main?action=manageChatGroups';
        };

        httpPostAsync("../../web/telegram-connector/api/ConfigTelegram", $scope.data, httpCallback);
    };
});