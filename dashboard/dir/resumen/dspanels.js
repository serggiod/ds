angular
    .module('application')
    .directive('dspanels',function(){
        return {
            templateUrl : 'dir/resumen/dspanels.html',
            restric     : 'E',
            replace     : true,
            controller  : 'resumenCtrl'
        };
    });