angular
	.module('application')
	.directive('formlogin',function(){
		return {
			templateUrl:'dir/forms/login.html',
			restrict: 'E',
			replace: true,
			controller:'loginCtrl'
		};
	});