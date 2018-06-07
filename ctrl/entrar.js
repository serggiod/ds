angular.module('application').controller('entrarCtrl', function ($scope, $http, $location, $session, $rootScope, md5) {

    $scope.init = function () {
        $scope.email = '';
        $scope.password = '';
        $scope.alertSuccess = false;
        $scope.alertDanger = false;
        $scope.alertWarning = false;
        $rootScope.showUserMenu = false;
        $rootScope.isAdmin = false;
        $session.destroy();

    }

    $scope.cancelar = function () {

        $scope.init();
        $scope.alertWarning = true;

    };

    $scope.entrar = function () {

        let url = 'mdl/index.php/session/login'
        let rege = new RegExp('[A-Z0-9.@]', 'gi');
        let regp = new RegExp('[A-Z0-9]', 'gi');
        let usuario = {
            email: $scope.email.match(rege).join(''),
            password: md5.createHash($scope.password.match(regp).join(''))
        };

        $http
            .post(url, usuario)
            .success(function (json) {
                if (json.result === true) {
                    $scope.alertSuccess = true;
                    $session.start(json.rows);
                    $rootScope.showUserMenu = true;
                    $rootScope.isAdmin = eval(json.rows.isadmin);
                    $rootScope.nombre = $session.get('nombre');
                    $location.path('/usuario');
                } else $scope.alertDanger = true;
            });

    };

    $scope.entrarTambien = function (key) {
        if (key.keyCode === 13) $scope.entrar();
    };

    $scope.init();

});