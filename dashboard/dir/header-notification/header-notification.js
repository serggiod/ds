angular
	.module('application')
	.directive('headerNotification',function($session){
		return {
			templateUrl:'dir/header-notification/header-notification.html',
			restrict: 'E',
			replace: true,
			scope:{
			},
			controller:function($scope,$session){
				$scope.usuario = $session.get('nombre');
			}
    	}
	});