(function(){
	angular.module('app').factory('apiCategories', apiCategories);
	
	apiCategories.$inject = ["$q", "$http"];
	
	function apiCategories($q, $http){
		return{
			getCategories: getCategories
		}
		
		function getCategories(){
			var defer = $q.defer();
			$http({
				method:"GET",
				url:"/api/categories"
			}).then(function(response){
				defer.resolve(response.data);
			}, rejectPromise(defer));
			return defer.promise;
		}
		
		function rejectPromise(promise){
			return function(data){
				promise.reject(data);
			}
		}
	}
})();