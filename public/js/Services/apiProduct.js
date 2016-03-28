(function(){
	angular.module("app").factory("apiProduct", apiProduct);
	
	apiProduct.$inject = ["$http", "$q"];
	
	function apiProduct($http, $q){		
		return{
			getProducts:getProducts,
			applyCoupon:applyCoupon
		};
		
		function getProducts(category){
			var defer=$q.defer();
			$http({
				method:"GET",
				url:"/api/products/list/"+category
			}).success(function(data){
				defer.resolve(data);
			}).error(function(data){
				defer.reject(data);
			});
			return defer.promise;
		}
		
		function applyCoupon(coupon){
			var defer=$q.defer();
			$http({
				method:"POST",
				url:"/api/products/coupon/",
				data:{
					coupon:coupon
				}
			}).success(function(data){
				defer.resolve(data);
			}).error(function(data){
				defer.reject(data);
			});
			return defer.promise;
		}
	}
})()