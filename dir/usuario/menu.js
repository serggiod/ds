angular
    .module('application')
    .directive('usuariomenu',function(){
        return {
            templateUrl : 'dir/usuario/menu.html',
            restrict    : 'E',
            replace     : true,
            require     : 'ngModel',
            transclude  : true,
            controller  : 'usuarioCtrl',
            require     : 'ngModel',
            scope       : {
                model   : '=ngModel'
            }
        };
    });