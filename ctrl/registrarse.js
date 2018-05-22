angular.module('application').controller('registrarseCtrl',function($scope,$http,$location,$session,$rootScope){
    
    $scope.init = function (){

        $scope.nombres    = '';
        $scope.apellidos  = '';
        $scope.email      = '';
        $scope.password   = '';
        $scope.repassword = '';

        $scope.alertSuccess  = false;
        $scope.alertDanger   = false;
        $scope.alertDangerF1 = false;
        $scope.alertWarning  = false;

        $rootScope.showUserMenu = false;
        $rootScope.isAdmin = false;
        $session.destroy();
        
    };

    $scope.cancelar  = function(){

        $scope.init();
        $scope.alertWarning = true;

    };

    $scope.registrar = function(){

        if($scope.password===$scope.repassword){
            let url  = 'mdl/index.php/usuarios/registrar';
            let regn = new RegExp('[A-Z0-9áéíóúÁÉÍÓÚÑñ\ ]','gi');
            let rege = new RegExp('[A-Z0-9.@]','gi');
            let regp = new RegExp('[A-Z0-9]','gi');
            let usuario  = {
                nombre   : $scope.nombres.match(regn).join(''),
                apellido : $scope.apellidos.match(regn).join(''),
                email    : $scope.email.match(rege).join(''),
                password : md5($scope.password.match(regp).join(''))
            };

            $http
                .post(url,usuario)
                .success(function(json){
                    $scope.init();
                    if(json.result===true) $scope.alertSuccess = true;
                    else $scope.alertDanger = true;
                });

        } else $scope.alertDangerF1 = true;

    };

    $scope.init();

});