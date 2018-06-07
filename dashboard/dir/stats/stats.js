angular
  .module('application')
  .directive('stats',function() {
    return {
  		templateUrl:'dir/stats/stats.html',
  		restrict:'E',
  		replace:true,
  		scope: {
        'model': '=',
        'comments': '@',
        'number': '@',
        'name': '@',
        'colour': '@',
        'details':'@',
        'type':'@',
        'goto':'@',
        'gototext':'@'
  		}
  		
  	}
  });
