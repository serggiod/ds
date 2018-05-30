'use strict';
angular
  .module('application')
  .controller('MainCtrl', function($scope,$position,$session,$rootScope) {

    $scope.init = function(){
      $rootScope.nombre = $session.get('nombre');
    };

    $scope.init();
  });
