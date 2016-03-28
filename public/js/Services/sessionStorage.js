(function(session){
	angular.module('app').service('sessionStorage', sessionStorage);
	
	function sessionStorage(){
		this.get=function(key){
			return JSON.parse(session.getItem(key));
		};
		
		this.set=function(key, data){
			session.setItem(key, JSON.stringify(data));
		};
		
		this.remove=function(key){
			session.removeItem(key);
		};
	}
})(sessionStorage);