(function()
{
    'use strict';

    /**
     * Módulo de frontend.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.builder', [
        /*@modules*/
    ])
        .config(
            [
                '$stateProvider',
                configFn
            ]
        );

    /**
     * Definição da função de configuração do módulo.
     *
     * @param {$stateProvider} $stateProvider
     */
    function configFn(
        $stateProvider
    ){
        $stateProvider.state('app.builder', {
            url: '/builder',
            acl:'m-builder',
            controller: 'builder.BuilderCtrl',
            templateUrl: getView('builder')
        })
        ;
    }

    /**
     * Retorna o caminho completo de uma view.
     *
     * @param view
     * @returns {string}
     */
    function getView(view) {
        return 'src/secure/admin/builder/views/' + view + '.html';
    }

}());