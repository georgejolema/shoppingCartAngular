describe('CartController', function () {
    var scope, controller;
    var mockApiProduct, mockToastr, _cart;
    beforeEach(module('app'));
    beforeEach(inject(['cart',function (cart) {
        _cart = cart;
        _cart.cleanUp();
        _cart.add(__myproducts[0]);
        _cart.add(__myproducts[1]);
        _cart.add(__myproducts[0]);
        _cart.add(__myproducts[2]);
        _cart.add(__myproducts[0]);
        _cart.add(__myproducts[1]);
    }]));
    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        controller = createController($controller);
    }));
    function createController(builder) {
        mockApiProduct = sinon.stub({
            applyCoupon:function () {}
        });
    
        mockToastr = sinon.stub({
            success: function () {},
            error: function () {}
        });


        return builder('CartController',{
            $scope: scope,
            cart: _cart,
            toastr: mockToastr,
            apiProduct: mockApiProduct
        });
    }
    
    describe('When page is loaded', function () {
        it('should retrieve the inserted elements to the cart', function () {
            expect(scope.cart).toBe(_cart.getItems());
            expect(scope.cart.length).toBe(3);
        });
        it('should sum the billing amount of all the items added to the cart', function () {
            expect(scope.total).toBe(289.94);
        })
    });
    
    describe('when interacting with the items added to the cart', function () {
        describe('when clicking on delete an item', function () {
            it('should remove the item from the list', function () {
                var items=_cart.getItems();
                expect(_cart.getItems().length).toBe(3);
                scope.removeItem(items[0]);
                expect(_cart.getItems().length).toBe(2);
            });
            it('should decrease the billing amount', function () {
                var items=_cart.getItems();
                var original=scope.total;
                scope.removeItem(items[0]);
                var newValue=scope.total;
                expect(original).toBeGreaterThan(newValue);
            });
        });
    });

    describe('when applying coupons in the form', function () {
        beforeEach(function () {
            mockApiProduct.applyCoupon.returns({
                then: function (fn) {
                    fn({valid:true, disccount:50});
                }
            });
        });
        it('should retrieve data from the server and apply a discount of 50% in this case', function () {

            scope.coupon='0000';
            scope.applyCoupon();
            expect(scope.couponApplied).toBe(true);
            expect(scope.total/2).toBe(scope.total-scope.total*scope.disccount/100);
        });
        it('should show a success message if everything goes well', function () {
            scope.coupon='0000';
            scope.applyCoupon();
            expect( mockToastr.success.calledWithMatch('Coupon applied')).toBe(true);
        });
    });

    describe('when applying an invalid coupon in the form', function () {
        beforeEach(function () {
            mockApiProduct.applyCoupon.returns({
                then: function (fn) {
                    fn({valid:false, disccount:-1});
                }
            });
        });
        it('should retrieve data from the server and not apply a discount', function () {
            scope.coupon='0000';
            scope.applyCoupon();
            expect(scope.couponApplied).toBe(false);
            expect(scope.disccount).toBe(0);
        });
        it('should show an error message if everything goes wrong', function () {
            scope.coupon='0000';
            scope.applyCoupon();
            expect( mockToastr.error.calledWithMatch('Invalid coupon')).toBe(true);
        });
    });
    
    describe('when clicking on checkout', function () {
       it('should show an error if the contract is not agreed', function () {
           scope.checkout();
           expect(mockToastr.error.calledWithMatch('You must agree the terms and conditions to proceed to checkout')).toBe(true);
       });
        
        it('should show a successful message and cleanup the cart if the contract was agreed', function () {
            scope.approve=true;
            scope.checkout();
            expect(mockToastr.success.calledWithMatch('thank you for your purchase')).toBe(true);
            var items=_cart.getItems();
            expect(scope.cart.length).toBe(0);
        });
    });
});