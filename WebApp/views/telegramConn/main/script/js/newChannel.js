var newChannelApp = angular.module('newChannelApp', []);
newChannelApp.controller('newChannelCtrl', function($scope) {
    $scope.data = {
        value : "",
        key:"ChannelName",
        group:"Channel"
    };

    $scope.init = function(){
        $scope.data = {
            value : "",
            key:"ChannelName",
            group:"Channel"
        }
    };

    $scope.init();

    $scope.create = function(){
        document.getElementById("overlay").style.display = "block";
        let httpCallback = function(response){

            $scope.data = {
                value : "",
                key:"ChannelName",
                group:"Channel"
            }

            document.getElementById("overlay").style.display = "none";
            window.location.href = '/telegramConn/main?action=manageChannels';
        };

        httpPostAsync("../../web/telegram-connector/api/ConfigTelegram", $scope.data, httpCallback);
    };
});