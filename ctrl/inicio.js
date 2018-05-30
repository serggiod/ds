angular.module('application')
.controller('inicioCtrl',function($scope,$http,$location,$session,$routeParams,$rootScope){
    
    $scope.init = () => {

        $scope.esquemas = new Array();
        $scope.chars    = '[a-z0-9\ \-\_\.\;]';
        $scope.alertSuccess = false;
        $scope.alertDanger  = false;

        $rootScope.showUserMenu = false;
        $rootScope.isAdmin = false;
        $rootScope.section = '/ Buscar';
        if($session.get('estado')==='ACTIVO'){
            $rootScope.showUserMenu = true;
            $rootScope.nombre = $session.get('nombre');
        }

        if($routeParams.esquema){
            $scope.esquema = $routeParams.esquema;
            $scope.voyATenerSuerte();
        } else $scope.esquema  = 'Esquema';
        
    };

    $scope.voyATenerSuerte = () => {
        $scope.eschema = $scope.esquema.match(new RegExp($scope.chars,'gi')).join('');
        let url = 'mdl/index.php/esquemas/buscar/' + $scope.esquema;
        $http
            .get(url)
            .success((json) => {
                if(json.result===true){
                    $scope.esquemas = json.rows;
                    $scope.alertSuccess = true;
                } else $scope.alertDanger = true;
            });
    };

    $scope.voyATenerSuerteTabien = (keyb) => {
        if(keyb.keyCode===13) $scope.voyATenerSuerte();
    };

    $scope.descargarEsquema = (name,file) => {
        file = file.match(new RegExp('[A-Z0-9]','gi')).join('');
        let url = 'mdl/index.php/esquemas/descargar/' + file;
        let a = document.createElement('a');
        document.body.appendChild(a);
        a.download = name + '.pdf';
        a.href = url;
        a.click();
    };

    $scope.reset = () => {
        $scope.esquema = '';
        $scope.esquemas = [];
        $scope.alertSuccess = false;
        $scope.alertDanger  = false;  
    };

    $scope.init();
    
});