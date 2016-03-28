(function(){
	angular.module('app').controller('CartController', CartController);
	
	CartController.$inject=["$scope", "cart", "toastr", "apiProduct"];
	
	function CartController($scope, cart, toastr, apiProduct){
		$scope.cart=cart.getItems();
		$scope.removeItem=removeItem;
		$scope.total=getTotal();
		$scope.checkout=checkout;
		$scope.applyCoupon=applyCoupon;
		$scope.couponApplied=false;
		$scope.disccount=0;
		
		function removeItem(item){
			$scope.cart=cart.remove(item);
			$scope.total=getTotal();
			toastr.success("item removed");
		}
		
		function getTotal(){
			var total=0;
			for(var i=0;i<$scope.cart.length;i++){
				total+=$scope.cart[i].price*$scope.cart[i].count;
			}
			return total;
		}
		
		function checkout(){
			if(!$scope.approve){
				toastr.error("You must agree the terms and conditions to proceed to checkout");
			}else{
				toastr.success("thank you for your purchase");
				cart.cleanUp();
				$scope.cart=cart.getItems();
			}
		}
		
		function applyCoupon(){
			apiProduct.applyCoupon($scope.coupon).then(function(data){
				if(data.valid){
					$scope.couponApplied=true;
					$scope.disccount=data.disccount;
					toastr.success("Coupon applied");
				}
				else
					toastr.error("Invalid coupon");
			})
		}
		
	}
})();