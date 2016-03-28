(function(){
	angular.module('app').controller('ProductsController', ProductsController);
	
	ProductsController.$inject=["$scope", "apiProduct", "apiCategories", "toastr",  "cart"];
	
	function ProductsController($scope, apiProduct, apiCategories, toastr, cart){
		$scope.products=[];
		$scope.categories=[];
		
		$scope.addToCart=addToCart;
		$scope.getProducts=getProducts;
		
		apiCategories.getCategories().then(function(data){
			if(data.length>0){
				$scope.categories=data;
				getProducts(data[0]);
			}
		});
		
		function getProducts(category){
			apiProduct.getProducts(category.id).then(function(data){
				$scope.products=data;
			});
		}
		
		function addToCart(product){
			cart.add(product);
			toastr.info("product added to cart");
		}
	}
})();