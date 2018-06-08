angular
	.module('application')
	.controller('resumenCtrl', function($scope,$http,$location,$session,$rootScope,$interval) {

		$scope.init = function(){
			$rootScope.section = 'Resumen';
			$scope.interval = $interval(function(){
				let url = '../mdl/index.php/session/dashboard/status';
					$http
						.get(url)
						.error(function(){
							$session.destroy();
							document.location.href = 'index.html#login';
						})
						.success(function(json){
							if(json.result===false) document.location.href = 'index.html#login';
						});
			},30000);
		};

		$scope.init();
	});