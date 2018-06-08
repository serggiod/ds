angular
    .module('application')
    .controller('logoutCtrl',function($scope,$http,$rootScope,$session,$location){
        $scope.init = function(){
            $rootScope.section = 'Logout';
        };

        $scope.aceptar = function(){
            document.location.href = 'index.html#login';
        };

        $scope.cancelar = function(){
            $location.path('/resumen');
        };

        $scope.init();
    });