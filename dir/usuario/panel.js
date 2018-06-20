angular
    .module('application')
    .directive('panel',function(){
        return {
            templateUrl : 'dir/usuario/panel.html',
            restrict    : 'E',
            replace     : true,
            require     : 'ngModel',
            transclude  : {
                'buttons' : 'buttons'
            },
            controller  : 'usuarioCtrl',
            scope       : {
                model   : '=ngModel'
            }
        };
    });