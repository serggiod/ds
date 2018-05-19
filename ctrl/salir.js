angular.module('application').controller('salirCtrl',function($scope,$http,$location,$session,$rootScope){

    $scope.cancelar = function(){
        $location.path('/usuario');
    };

    $scope.aceptar = function(){
        $session.destroy();
        $rootScope.showUserMenu = false;
        $rootScope.isAdmin = false;
        $rootScope.nombre = '';
        $location.path('/inicio');
    };
        
});