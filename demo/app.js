/**
 * Created by larry Eliemenye
 * the root scope acts as the middle man between your local scopes and the server
 */


angular
    .module("demoApp", ['ng-sock'])
    .config(function(WebSocketConfigProvider){
        WebSocketConfigProvider.config ={
            host:"ws://localhost",
            port:8888
        };
        console.log(WebSocketConfigProvider);
    })
    .controller('DemoController', function($scope, WebSocket){
        $scope.$on('ws:receive', function(data){
            console.log("From server", data)
        });

        $scope.sendMessage = function(){
            $scope.$emit('ws:send', {
                counter:1,
                msg:$scope.messageText
            });

        }
    });