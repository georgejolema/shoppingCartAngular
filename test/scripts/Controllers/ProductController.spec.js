describe('ProductController', function () {
    var scope, controller;
    var mockApiProduct, mockApiCategories, mockToastr, _cart
    beforeEach(module('app'));
    beforeEach(inject(['cart',function (cart) {
        _cart = cart;
        _cart.cleanUp();
    }]));

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        controller = createController($controller);
    }));

    function createController(builder) {
        mockApiProduct = sinon.stub({
            getProducts:function () {}
        });
        mockApiCategories = sinon.stub({
            getCategories:function () {}
        });
        mockToastr = sinon.stub({
            info: function () {}
        });

        mockApiCategories.getCategories.returns(
            {
                then : function (fn) {
                    fn([{"id":5,"name":"my category1"},{"id":10,"name":"categoy test"}]);
                }
            }
        );

        mockApiProduct.getProducts.returns({
            then: function (fn) {
                fn([
                    {
                        "id": 1,
                        "name": "First Product",
                        "description": "See more snippets like this online store item at Bootsnipp - http://bootsnipp.com.",
                        "rating": 4,
                        "reviews": 15,
                        "price": 24.99,
                        "category": 5
                    },
                    {
                        "id": 2,
                        "name": "Second Product",
                        "description": "This is a short description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                        "rating": 4,
                        "reviews": 12,
                        "price": 64.99,
                        "category": 5
                    },
                    {
                        "id": 4,
                        "name": "Forth Product",
                        "description": "This is a short description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                        "rating": 4,
                        "reviews": 6,
                        "price": 84.99,
                        "category": 5
                    }
                ]);
            }
        });

        return builder('ProductsController',{
            $scope: scope,
            apiProduct: mockApiProduct,
            apiCategories: mockApiCategories,
            toastr: mockToastr,
            cart: _cart
        });
    }
    describe('loading initial data', function () {
        it('should return 2 items from the server', function () {
            expect(scope.categories.length).toBe(2);
        });
    });
    describe('interacting with the shopping cart when clicking on the "add cart button"', function () {
       it('should add 1 item for each different type of product to the cart and count them', function () {
           scope.addToCart(scope.products[0]);
           scope.addToCart(scope.products[0]);
           scope.addToCart(scope.products[1]);
           scope.addToCart(scope.products[2]);
           var items=_cart.getItems();
           var total=0;
           for(var i=0;i<items.length;i++){
               total+=items[i].count;
           }
           expect(items.length).toBe(3);
           expect(total).toBe(4);
       });
        
        it('should call a toastr message after adding an item successfully', function () {
            scope.addToCart(scope.products[0]);
            expect( mockToastr.info.calledWithExactly("product added to cart")).toBe(true);
        })
    });

    describe('changing of category when clicking on the category\'s name', function () {
        it('should request for products that belog to that category', function () {
            scope.getProducts(scope.categories[1]);
            expect(mockApiProduct.getProducts.calledWith(10)).toBe(true);
        })
    })
});