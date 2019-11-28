(function()
{
    'use strict';

    /**
     * Módulo de login da aplicação.
     *
     * @author Otávio Fernandes <otavio@neton.com.br>
     */
    angular.module(
        'app.login',
        [
            ,'ngAnimate'
            ,'ngCookies'
            ,'ngResource'
            ,'ngSanitize'
            ,'ngTouch'
            ,'ngStorage'
            ,'ui.router'
            ,'ui.bootstrap'
            ,'singular.ui'
            ,'ngMaterial'
            ,'ngMessages'
            /*@modules*/
        ]
    )
        .config(
            [
                '$stateProvider',
                '$urlRouterProvider',
                configFn
            ]
        )
        .run(function(){
            $.backstretch("assets/img/bg-triangles.jpg");
        });

    /**
     * Definição da função de configuração do módulo.
     *
     * @param $stateProvider
     * @param $urlRouterProvider
     */
    function configFn(
        $stateProvider,
        $urlRouterProvider
    ) {

        $urlRouterProvider.otherwise('/login');

        $stateProvider.state('login', {
            url: '/login',
            controller: 'login.LoginCtrl',
            templateUrl: getView('login')
        })
            .state('recover', {
                url: '/recuperarSenha',
                controller: 'login.SenhaCtrl',
                templateUrl: getView('senha')
            });

    }

    /**
     * Retorna o caminho completo para um template.
     *
     * @param view
     * @returns {string}
     */
    function getView(view){
        return 'src/login/views/' + view + '.html';
    }


}());