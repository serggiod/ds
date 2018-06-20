angular
	.module('application')
	.controller('loginCtrl', function($scope,$http,$session,$rootScope,md5) {

		$scope.init = function(){
			$rootScope.section = 'Login';
			$scope.success = false;
			$scope.danger = false;
			$session.destroy();
		};

		$scope.login = function(){
			let regu = new RegExp('[0-9a-z.@]','gi');
			let regp = new RegExp('[a-z0-9]','gi');
			let url  = '../mdl/index.php/session/dashboard/login';
			let json = new Object();
				json.usuario = $scope.usuario.match(regu).join('');
				json.password = $scope.password.match(regp).join('');
				json.password = md5.createHash(json.password);
				$http.post(url,json).success(function(json){
					$scope.success = false;
					$scope.danger = false;
					if(json.result===true){
						$scope.success = true;
						$session.start(json.rows);
						document.location.href='dashboard.html#/resumen';
					} else $scope.danger = true;
				});
		};

		$scope.login2 = function(event){
			if(event.keyCode===13) $scope.login();
		};

		$scope.clear = function(){
			$scope.usuario  = '';
			$scope.password = '';
			$scope.success  = false;
			$scope.danger   = false;
		};
		$scope.init();
	});