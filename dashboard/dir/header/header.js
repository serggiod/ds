angular
	.module('application')
	.directive('header',function(){
		return {
			templateUrl:'dir/header/header.html',
			restrict: 'E',
			replace: true
    	}
	});