(function()
{
    'use strict';

    /**
     * Módulo responsável pela renderização e gerenciamento da interface do sistema.
     *
     * @author Otávio Fernandes <otavio@neton.com.br>
     */
    angular.module(
        'singular.ui',
        [
             'toastr'
            ,'angular-loading-bar'
            ,'localytics.directives'
            ,'ngSweetAlert'
            ,'ngHolder'
            ,'ngJsTree'
            ,'ngMessages'
            ,'ui.router'
            ,'ui.select'
        ]
    )
        // definição de constantes de interface
        .constant('UI', {
            url: "",
            appName: 'Singular',
            appVersion: '2.0',
            navbarHeaderColor: 'deep-orange',
            headerColor: 'bg-white-only',
            navbarColor: 'bg-white',
            headerFixed: true,
            titleBarColor: 'deep-orange',
            primaryButtonColor: 'deep-orange',
            secondaryButtonColor: '',
            asideFixed: true,
            asideFolded: false,
            asideDock: false,
            container: false,
            showFilterModule: true,
            asideCollapsible: true
        })

        // definição de configurações de interface
        .config(
            [
                '$httpProvider',
                '$stateProvider',
                '$urlRouterProvider',
                '$localStorageProvider',
                'chosenProvider',
                configFn
            ]
        )
        .run(
            [
                '$rootScope',
                '$state',
                '$localStorage',
                '$urlRouter',
                '$location',
                'toastr',
                'ui.Session',
                runFn
            ]
        );

    /**
     * Definição da função de configuração do módulo.
     *
     * @param $httpProvider
     * @param $stateProvider
     */
    function configFn(
        $httpProvider,
        $stateProvider,
        $urlRouterProvider,
        $localStorageProvider
    ) {
        var state = '/login';

        $stateProvider.state('app', {
            url: '/app',
            abstract: true,
            controller: 'ui.UiCtrl',
            templateUrl: 'src/ui/views/app.html'
        });

        // if (typeof $localStorageProvider.$get('ngStorage').state != 'undefined' &&
        //     $localStorageProvider.$get('ngStorage').state != '/login') {
        //     var acl = window.APP.acl;
        //
        //     if (acl.indexOf('|' + $attr.acl + '|') == -1) {
        //         $element.remove();
        //     }
        //
        //     state = $localStorageProvider.$get('ngStorage').state;
        // }

        $urlRouterProvider.otherwise(state);
    }

    /**
     * Definição da função de execução do módulo.
     *
     * @param $rootScope
     * @param $state
     * @param $localStorage
     * @param $urlRouter
     * @param $location
     * @param toastr
     * @param Session
     */
    function runFn(
        $rootScope,
        $state,
        $localStorage,
        $urlRouter,
        $location,
        toastr,
        Session
    ) {

        if (window.APP) {
            var acl = window.APP.acl;

            Session.setSession(window.APP.session);
            Session.setMenu(window.APP.menu);

            $rootScope.$on("$locationChangeStart",function(event, next, current){
                var url = next.substring(next.indexOf('#!/app')+6),
                    state = $state.get().filter(function(state){
                        return state.url == url;
                    }).pop();
                if (state){
                    if (state.acl) {
                        if (acl.indexOf('|' + state.acl + '|') == -1) {
                            event.preventDefault();
                        }
                    }
                }
            });


            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
                if (toState.acl) {
                    if (acl.indexOf('|' + toState.acl + '|') == -1) {
                        toastr.clear();
                        toastr.error('ACESSO NEGADO','Seu usuário não tem permissão para executar esta ação!');
                        event.preventDefault();
                    }
                }
            });


            $rootScope.$on('$locationChangeSuccess', function(
                event,
                next
            ){
                var url = next.substring(next.indexOf('#!/app')+6),
                    state = $state.get().filter(function(state){
                        return state.url == url;
                    }).pop(),
                    address = window.location.hash;

                if (!state) {
                    return false;
                }
                
                // if (state.persistent) {
                //     address = address.substring(2);
                //     $localStorage.state = address;
                // }

            });

        }
    }

}());