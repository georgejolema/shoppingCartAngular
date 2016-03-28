describe('apiCategories', function () {
    var $httpBackend;
    beforeEach(module('app'));
    beforeEach(function () {
        inject(function ($injector) {
            apiCategories=$injector.get('apiCategories');
            $httpBackend=$injector.get('$httpBackend');
        });
    });

    describe('getCategories', function () {
        it('should return the data resulting from the web service call', function () {
            var mockResult=__myCategories,
                result;
            $httpBackend.expect('GET', '/api/categories').respond(mockResult);
            apiCategories.getCategories().then(function (data) {
                result = data;
            });
            $httpBackend.flush();
            expect(result).toEqual(mockResult);
        });
    });
});