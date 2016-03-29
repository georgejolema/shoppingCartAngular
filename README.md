# shoppingCartAngular
simple shopping cart created as a single page application using AngularJS and NodeJS. Includes unit testing and integration with automatic task using gulp.

## Requirements
This is a nodeJS application, so you will need nodeJS installed in your local environment. Below I detail the requirements for the application to run
* NodeJS
* Bower (installed globally)
* Gulp (installed globally0

## How to install
Clone the repository to your local environment with the command:
```
git clone https://github.com/georgejolema/shoppingCartAngular.git
```

Once the project is in your local environment, go to the "ShoppingCartAngular" folder and run the following commands:
```
npm install
bower install
```

Those commands will download both server-side and client-side dependencies.

## How to run

Once all the dependencies are set, you only need to run the following command:
```
gulp
```
That command will run all the automated tasks which includes the startup of the application. The application will run using the port 5000. In order to get it work you need to access the following address: http://localhost:5000
