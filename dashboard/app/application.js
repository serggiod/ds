angular
	.module('application', ['ngRoute','angular-md5'])
	.config(function ($routeProvider) {
		$routeProvider.when('/login',{
			templateUrl:'view/login.html',
			controller:'loginCtrl'
		});
		$routeProvider.when('/logout',{
			templateUrl:'view/logout.html',
			controller:'logoutCtrl'
		});
		$routeProvider.when('/resumen',{
			templateUrl:'view/resumen.html',
			controller:'resumenCtrl'
		});
		$routeProvider.otherwise('/login');
	});