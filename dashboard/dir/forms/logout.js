angular
	.module('application')
	.directive('formlogout',function(){
		return {
			templateUrl:'dir/forms/logout.html',
			restrict: 'E',
			replace: true,
			controller:'logoutCtrl'
		};
	});