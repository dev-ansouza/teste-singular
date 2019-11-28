(function()
{
    'use strict';

    /**
     * Módulo de frontend.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.permissao', [
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
        $stateProvider.state('app.permissao', {
            url: '/admin/permissao',
            acl: 'm-permissoes',
            controller: 'permissao.PermissaoCtrl',
            templateUrl: getView('permissao.list')
        });
    }

    /**
     * Retorna o caminho completo de uma view.
     *
     * @param view
     * @returns {string}
     */
    function getView(view) {
        return 'src/secure/admin/permissao/views/' + view + '.html';
    }

}());