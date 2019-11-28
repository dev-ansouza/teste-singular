(function()
{
    'use strict';

    /**
     * Módulo de frontend responsável pelo gerenciamento de menus.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.menu', [
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
        $stateProvider.state('app.menu', {
            url: '/admin/menu',
            acl: 'f-menus-alterar',
            controller: 'menu.MenuCtrl',
            templateUrl: getView('menu.list')
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
        return 'src/secure/admin/menu/views/' + view + '.html';
    }

}());