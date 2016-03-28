angular.module('app').service('cart',['sessionStorage', function(sessionStorage){
	var items=[];
	if(sessionStorage.get('cart'))
		items=sessionStorage.get('cart');
	else
		sessionStorage.set('cart', items);

	this.add=function(item){
		try{
			$.each(items, function(i, obj){
				if(obj.id==item.id){
					obj.count++;
					sessionStorage.set('cart', items);
					throw '';
				}
			});
			items.push($.extend({count:1}, item));
			sessionStorage.set('cart', items);
		}
		catch(ex){}
	};
	
	this.getItems=function(){
		return items;
	};
	
	this.remove=function(item){
		var index=items.indexOf(item);
		items.splice(index, 1);
		sessionStorage.set('cart', items);
		return items;
	};

	this.cleanUp=function () {
        sessionStorage.set('cart', null);
        items=[];
    }
}]);