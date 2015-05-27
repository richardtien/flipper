var app = angular.module('flipApp', ['ngRoute', 'ngResource']).run(function($http, $rootScope){

});

app.config(function($routeProvider){
  $routeProvider
    //the timeline display
    .when('/', {
      templateUrl: 'home.html',
      controller: 'mainController'
    })
    .when('/flip', {
      templateUrl: 'flips.html',
      controller: 'searchController'
    })
});

app.factory('flipService', function($resource){
  return $resource('/api/flips/:id');
});

app.controller('mainController', function($rootScope, $scope, $http, flipService){
	$rootScope.flips = flipService.query();


  	$rootScope.search = function(){
  		console.log($rootScope.query);
  		$http.post('/api/search', {'query':$rootScope.query}).success(function(data){
  			$rootScope.flips = data;
  		});
  	};
});

app.controller('searchController', function($rootScope, $scope, $location, flipService){
	flipService.get({id:$location.search().id},function(data){
		$scope.flip = data;
	});

});
