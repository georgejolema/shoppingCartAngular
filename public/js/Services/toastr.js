( function(tstr){
	angular.module('app').factory('toastr',toastr);
	function toastr(){
		return tstr;
	}
})(toastr);