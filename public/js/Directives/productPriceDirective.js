(function(){
	angular.module("app").directive("productPrice", productPrice);
	
	function productPrice(){
		return{
			restrict:"E",
			scope:{
				product:"=",
				addCart:"&addToCart"
			},
			templateUrl:"template/Directives/productPrice.html",
			link:link
		}
		
		function link(scope, el, attr){
			scope.addToCart = scope.addCart;
		}
	}
})();