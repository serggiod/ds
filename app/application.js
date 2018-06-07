angular.module('application',['ngRoute','ngSanitize','angular-md5']);

/* RUTAS */
angular.module('application').config(function($routeProvider){
    $routeProvider

    // Pantalla de logueo.
    .when('/',{redirectTo:'/inicio'})
    .when('/inicio',{
        templateUrl:'view/inicio.html',
        controller:'inicioCtrl'
    })
    .when('/inicio/:esquema',{
        templateUrl:'view/inicio.html',
        controller:'inicioCtrl'
    })
    .when('/historico',{
        templateUrl:'view/historico.html',
        controller:'historicoCtrl'
    })
    .when('/registrarse',{
        templateUrl:'view/registrarse.html',
        controller:'registrarseCtrl'
    })
    .when('/entrar',{
        templateUrl:'view/entrar.html',
        controller:'entrarCtrl'
    })
    .when('/salir',{
        templateUrl:'view/salir.html',
        controller:'salirCtrl'
    })
    .when('/usuario',{
        templateUrl:'view/usuario.html',
        controller:'usuarioCtrl'
    })
    .otherwise({redirectTo:'/'});
});

