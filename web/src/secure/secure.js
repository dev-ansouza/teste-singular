(function()
{
    'use strict';

    angular.module(
        'app.secure',
        [
            'ngAnimate'
            ,'ngCookies'
            ,'ngResource'
            ,'ngSanitize'
            // ,'ngTouch'
            ,'ngStorage'
            ,'ui.router'
            ,'ui.bootstrap'
            ,'ngAside'
            ,'mgcrea.ngStrap'
            ,'singular'
            ,'singular.ui'
            ,'upload.button'
            ,'lr.upload'
            ,'rt.select2'
            ,'angularMoment'
            ,'ui.utils.masks'
            ,'ngMaterial'
            ,'md.data.table'
            ,'singular.admin'
            /*@modules*/
        ]
    )
        .config(
            [
                '$stateProvider'
                ,'$urlRouterProvider'
                ,'$localStorageProvider'
                ,configFn
            ]
        )
        .run(
            [
                'ui.Session'
                ,runFn
            ]
        );

    /**
     * Definição da função de configuração do módulo.
     *
     * @param $stateProvider
     * @param $urlRouterProvider
     */
    function configFn(
        $stateProvider,
        $urlRouterProvider
        ,$localStorageProvider
    ) {
        var state = '/app/dashboard';

        $stateProvider.state('app.dashboard', {
            url: '/dashboard',
            menu: 'configuracao'
        });

        if (typeof $localStorageProvider.$get('ngStorage').state != 'undefined' &&
            $localStorageProvider.$get('ngStorage').state != '/login') {
            state = $localStorageProvider.$get('ngStorage').state;
        }

        $urlRouterProvider.otherwise(state);

    }

    /**
     * Definição da função de execução.
     *
     * @param Session
     */
    function runFn(
        Session
    ){
        Session.setSession(window.APP.session);
        Session.setMenu(window.APP.menu);
    }

    /**
     * Retorna a view a ser renderizada para um state na raiz do módulo.
     *
     * @param view
     * @returns {string}
     */
    function getView(view){
        return 'src/secure/views/' + view + '.html';
    }

}());