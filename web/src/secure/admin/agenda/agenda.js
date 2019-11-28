(function()
{
    'use strict';

    /**
     * Módulo de frontend.
     *
     * @author Author <Email>
     */
    angular.module('admin.agenda', [
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
        //State da listagem da agenda
        $stateProvider.state('app.agenda-list', {
            url: '/admin/agenda/list',
            acl: 'f-agenda-create',
            controller: 'agenda.ListCtrl',
            templateUrl: getView('agenda.list')
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
        return 'src//secure/admin/agenda/views/' + view + '.html';
    }

}());