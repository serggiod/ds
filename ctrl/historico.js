angular.module('application').controller('historicoCtrl',function($scope,$http,$location){

    $scope.inicio = () => {
        $rootScope.showUserMenu = false;
        $rootScope.isAdmin = false;
        if($session.get('estado')==='ACTIVO'){
            $rootScope.showUserMenu = true;
            $rootScope.nombre = $session.get('nombre');
        }

        $scope.hisotico = [];
        let url = 'mdl/index.php/historico/select/all';
        $http
            .get(url)
            .success((json) => {
                if(json.result===true) $scope.historico = json.rows;
                else $scope.historico = [];
            });
    };
      
    $scope.inicio();
});