(function()
{
    'use strict';

    /**
     * Módulo responsável pelo gerenciamento de componentes.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.componente', [])
        .config(
            [
                '$stateProvider',
                '$urlRouterProvider',
                configFn
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
    ) {
        // defina aqui seus states
        $stateProvider.state('app.componente', {
            url: '/admin/componente',
            acl: 'm-componentes',
            controller: 'componente.ComponenteCtrl',
            templateUrl: getView('componente.list')
        });
    }

    /**
     * Função responsável por retornar a view utilizada.
     *
     * @param view
     * @returns {string}
     */
    function getView(view) {
        return 'src/secure/admin/componente/views/' + view + '.html';
    }

}());