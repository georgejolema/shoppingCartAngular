describe('productPriceDirective', function () {
    var scope, el, childScope, mockTest;
    beforeEach(module('app'));
    beforeEach(module('template/Directives/productPrice.html'));
    beforeEach(inject(function ($compile, $rootScope) {
        scope = $rootScope;
        scope.product = __myproducts[1];
        scope.e='hello!'; //simulates controller scope variable passed out to the directive via markup
        mockTest=sinon.stub({test:function () {}});
        scope.addToCart = function (e) {
            mockTest.test(e); //just a definition of a fake function simulated
        };
        el = angular.element("<product-price  product=\"product\" add-to-cart=\"addToCart(e)\"></product-price>");
        $compile(el)(scope);
        scope.$digest();
        childScope = scope.$$childHead;
    }));
    describe('When the control loads and displays data', function () {
        it('should display name and price in the view', function () {
            var name = el.find('.caption h4:nth-child(2) a').html();
            var price = el.find('.caption h4:nth-child(1)').html();
            expect(name).toEqual(__myproducts[1].name);
            expect(price).toEqual('$'+__myproducts[1].price);
        });
        it('should display four stars filled and one empty', function () {
            var filled=el.find('.glyphicon-star').length;
            var empty=el.find('.glyphicon-star-empty').length;
            expect(filled).toBe(4);
            expect(empty).toBe(1);
        });
    });
    describe('when clicking on add to cart', function () {
        it('should pass out the original parameter defined in the markup of the directive, rather than the explicit parameter', function () {
            childScope.addToCart(scope.product);
            expect(mockTest.test.calledWithMatch('hello')).toBe(true);
        });
        it('should overwrite the parameter by calling it explicitly', function () {
            childScope.addToCart({e:scope.product});
            expect(mockTest.test.calledWithMatch(scope.product)).toBe(true);
        })
    })
});