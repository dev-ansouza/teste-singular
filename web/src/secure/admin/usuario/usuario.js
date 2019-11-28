(function()
{
    'use strict';

    /**
     * Módulo de frontend.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.usuario', [
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
        // state de criação de registro
        $stateProvider.state('app.usuario-create', {
            url: '/admin/usuario/create',
            acl: 'f-usuarios-create',
            controller: 'usuario.CreateCtrl',
            persistent: true,
            templateUrl: getView('usuario.form')
        })
            // state de edição de usuário
            .state('app.usuario-edit', {
                url: '/admin/usuario/edit/:id',
                controller: 'usuario.EditCtrl',
                acl: 'f-usuarios-edit',
                persistent: true,
                templateUrl: getView('usuario.form')
            })
            // state de visualização de usuário
            .state('app.usuario-show', {
                url: '/admin/usuario/show/:id',
                controller: 'usuario.ShowCtrl',
                acl: 'f-usuarios-show',
                persistent: true,
                templateUrl: getView('usuario.form')
            })
            // state de listagem de usuários
            .state('app.usuario-list', {
                url: '/admin/usuario/list',
                controller: 'usuario.ListCtrl',
                acl: 'f-usuarios-list',
                persistent: true,
                templateUrl: getView('usuario.list')
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
        return 'src/secure/admin/usuario/views/' + view + '.html';
    }

}());