(function()
{
    'use strict';

    /**
     * Módulo de frontend.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('singular.admin', [
        ,'admin.usuario'
        ,'admin.permissao'
        ,'admin.componente'
            ,'admin.menu'
            ,'admin.builder'
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
    }

    /**
     * Retorna o caminho completo de uma view.
     *
     * @param view
     * @returns {string}
     */
    function getView(view) {
        return 'src/secure/admin/views/' + view + '.html';
    }

}());