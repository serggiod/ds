angular
	.module('application')
	.directive('sidebarSearch',function() {
		return {
	  		templateUrl:'dir/sidebar/sidebar-search/sidebar-search.html',
	  		restrict: 'E',
	  		replace: true,
	  		scope: {
	  		},
	  		controller:function($scope){
				$scope.selectedMenu = 'home';
	  		}
		};
  	});