angular
    .module('application')
    .directive('dspanel',function(){
        return {
            templateUrl : 'dir/resumen/dspanel.html',
            restrict    : 'E',
            replace     : true,
            require     : 'ngModel',
            controller  : 'resumenCtrl',
            scope       : {
                model   : '=ngModel'
            }
        };
    });