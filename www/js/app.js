angular.module('ionic-facebook', [
    'ionic',
    'ngOpenFB',
    'ionic-facebook.services', 
    'ionic-facebook.controllers'
])

.constant('$ionicLoadingConfig', {
    template: '<ion-spinner icon="android"></ion-spinner>',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
})

.config(function($httpProvider) {
    $httpProvider.interceptors.push(function($rootScope) {
        return {
            request: function(config) {
                $rootScope.$broadcast('loading:show')
                return config
            },
            response: function(response) {
                $rootScope.$broadcast('loading:hide')
                return response
            }
        }
    })
})

.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider
    
        .state('login', {
            url:'/login',
            controller:'LoginController',
            templateUrl:'app-login.html'
        })
        // .state('novo', {
        //     url:'/novo',
        //     controller:'LoginIncluirController',
        //     templateUrl:'app-login-incluir.html'
        // })
        // .state('recuperarsenha', {
        //     url:'/recuperarsenha',
        //     controller:'RecuperarSenhaController',
        //     templateUrl:'app-recuperar-senha.html'
        // })
        
        .state('perfil', {
            url:'/perfil',
            cache: false,
            controller:'PerfilController',
            templateUrl:'views/perfil.html'
        });

    $urlRouterProvider.otherwise('/login');
})

.run(function($ionicPlatform, $ionicLoading, $rootScope, ngFB) {
    $ionicPlatform.ready(function() {
        document.addEventListener("deviceready", onDeviceReady, false);
        function onDeviceReady() {
            window.open = cordova.InAppBrowser.open;
        }    
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
    
    ngFB.init({appId: '1890076184551414'});
    
    $rootScope.$on('loading:show', function() {
        $ionicLoading.show();
    });

    $rootScope.$on('loading:hide', function() {
        $ionicLoading.hide();
    });    
})