angular.module('application')
.controller('inicioCtrl',function($scope,$http,$location,$session,$routeParams,$rootScope){
    
    $scope.init = function(){

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

    $scope.voyATenerSuerte = function(){
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

    $scope.voyATenerSuerteTabien = function(keyb){
        if(keyb.keyCode===13) $scope.voyATenerSuerte();
    };

    // Formulario carrito.
    $scope.formularioCarrito = function(esquema){
        let $element = angular.element('[id="formularioCarrito"]');
        let $scope = $element.scope();
        let $html = $element.html();
            $scope.form = BootstrapDialog.show({
                closable : false,
                title    : '<i class="fa fa-shopping-cart"></i> Comprar esquema',
                message  : $html,
                buttons  : [
                    {cssClass:'btn btn-primary', label:'<i class="fa fa-shopping-cart"></i> Agregar al carrito', action:$scope.formularioCarritoAgregar},
                    {cssClass:'btn btn-info',    label:'<i class="fa fa-credit-card"></i> Pasarela de pago',     action:$scope.formularioCarritoPagar}
                ]
            });
    };
    $scope.formularioCarritoAgregar = function(esquema){
        let $element = angular.element('[id="containerCarrito"]');
        let $Scope = $element.scope();
            $Scope.agregarAlCarrito(esquema);
            $scope.form.close();
    };
    $scope.formularioCarritoPagar = function(){
        $scope.form.close();
        alert('Pasarela de pago');
    };


    // Formulario Session.
    $scope.formularioSession = function(){
        let $element = angular.element('[id="formularioSession"]');
        let $scope = $element.scope();
        let $html = $element.html();
            $scope.form = BootstrapDialog.show({
                closable : false,
                title    : '<i class="glyphicon glyphicon-lock"></i> Session',
                message  : $html,
                buttons  : [
                    {action:$scope.formularioSessionRegistrar, label:'<i class="fa fa-pencil-square-o"></i> Registrarse', cssClass:'btn btn-primary'},
                    {action:$scope.formularioSessionSession,   label:'<i class="fa fa-unlock-alt"></i> Iniciar sesión',   cssClass:'btn btn-info'}
                ]
            });
    };
    $scope.formularioSessionSession = function(){
        $scope.form.close();
        document.location.href='#/entrar';
    };
    $scope.formularioSessionRegistrar = function(){
        $scope.form.close();
        document.location.href='#/registrarse';
    };

    $scope.reset = () => {
        $scope.esquema = '';
        $scope.esquemas = [];
        $scope.alertSuccess = false;
        $scope.alertDanger  = false;  
    };

    $scope.init();
    
});