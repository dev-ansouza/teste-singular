(function()
{
    'use strict';

    /**
     * Módulo de frontend.
     *
     * @author Arthur Nunes <arthurnx98@gmail.com>
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
            acl: 'f-agenda-list',
            controller: 'agenda.ListCtrl',
            templateUrl: getView('agenda.list')
        })

            //State da criação da agenda
            $stateProvider.state('app.agenda-create', {
                url: '/admin/agenda/create',
                acl: 'f-agenda-create',
                controller: 'agenda.CreateCtrl',
                templateUrl: getView('agenda.form')
            })

            //State da edição da agenda
            $stateProvider.state('app.agenda-edit', {
                url: '/admin/agenda/edit/:id',
                acl: 'f-agenda-edit',
                controller: 'agenda.EditCtrl',
                templateUrl: getView('agenda.form')
            })

            //State da visualização da agenda
            $stateProvider.state('app.agenda-show', {
                url: '/admin/agenda/show/:id',
                acl: 'f-agenda-show',
                controller: 'agenda.ShowCtrl',
                templateUrl: getView('agenda.form')
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