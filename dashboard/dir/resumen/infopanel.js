angular
    .module('application')
    .directive('infopanel',function(){
        return {
            templateUrl : 'dir/resumen/infopanel.html',
            restric     : 'E',
            replace     : true,
            controller  : 'resumenCtrl'
        };
    });