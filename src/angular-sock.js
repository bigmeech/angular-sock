(function(window, document, angular){
    angular
        .module('ng-sock',[])
        .provider('WebSocketConfig', function(){
            this.config = {
                host:"ws://localhost",
                port:8888
            };

            this.$get = function(){
                return this;
            };
            return this;
        })
        .factory("WebSocket", ['$rootScope','WebSocketConfig', function($rootScope, WebSocketConfigProvider){
            var wsConnection = new WebSocket(WebSocketConfigProvider.config.host + ":" + WebSocketConfigProvider.config.port);
            wsConnection.onopen = function(){
                console.log("A websocket connection to " + WebSocketConfigProvider.config.host + " has been opened")
            };

            wsConnection.onerror = function(error){
                console.log("A websocket connection to " + WebSocketConfigProvider.config.host + " errored", error)
            };

            wsConnection.onmessage = function(data){
                $rootScope.$broadcast('ws:receive', data);
            };


            $rootScope.$on('ws:send', function(event, data){
                wsConnection.send(JSON.stringify({ data:data }));
            });
            return {}
        }]);
})(window, document, angular, undefined);