describe('apiProduct', function () {
    var $httpBackend;
    beforeEach(module('app'));
    beforeEach(function () {
        inject(function ($injector) {
            apiProduct=$injector.get('apiProduct');
            $httpBackend=$injector.get('$httpBackend');
        });
    });

    describe('getProducts', function () {
        it('should return the data resulting from the web service call', function () {
            var mockResult=__myproducts,
                result;
            $httpBackend.expect('GET', '/api/products/list/5').respond(mockResult);
            apiProduct.getProducts(5).then(function (data) {
                result = data;
            });
            $httpBackend.flush();
            expect(result).toEqual(mockResult);
        });
    });
    describe('applyCoupon', function () {
        it('should return the data resulting from the web service call', function () {
            var mockResult=__myproducts,
                result;
            $httpBackend.expect('POST', '/api/products/coupon/',{coupon:'0000'}).respond(mockResult);
            apiProduct.applyCoupon('0000').then(function (data) {
                result = data;
            });
            $httpBackend.flush();
            expect(result).toEqual(mockResult);
        });
    });

});