module.exports=function (config) {
    config.set({
        basePath:'../public',
        frameworks: ['jasmine'],
        browsers : ['Chrome'],
        files:[
            'lib/jquery/dist/jquery.js',
            'lib/bootstrap/dist/js/bootstrap.js',
            'lib/angular/angular.js',
            'lib/angular-mocks/angular-mocks.js',
            'lib/toastr/toastr.js',
            'lib/angular-route/angular-route.js',
            'js/app/app.js',
            'js/Controllers/*.js',
            'js/Directives/*.js',
            'js/Services/*.js',
            '../test/scripts/**/*.js',
            'template/Directives/*.html'
        ],
        exclude: [],
        preprocessors: {
            '**/*.html':'ng-html2js'
        },
        plugins: ['karma-chrome-launcher', 'karma-jasmine', 'karma-firefox-launcher', 'karma-ie-launcher', 'karma-ng-html2js-preprocessor']
    });
}