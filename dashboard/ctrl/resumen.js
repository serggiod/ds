angular
	.module('application')
	.controller('ResumenCtrl', function($scope,$session,$rootScope) {

		$scope.init = function(){
			$rootScope.section = 'Resumen';
		};

		$scope.init();
	});