(function()
{
   'use strict';

    /**
     * Serviço responsável por controlar as funcionalidades da sessão do usuário.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('singular.ui').factory(
        'ui.Session',
        [
            '$http',
            'UI',
            SessionService
        ]
    );

    /**
     * Função de definição do serviço.
     *
     * @param $http
     * @param UI
     * @return {SessionService}
     * @constructor
     */
    function SessionService(
        $http,
        UI
    ) {
        var me = this;
        me.session  = null;
        me.menu = null;

        /**
         * Seta a sessão do usuário no sistema.
         *
         * @param session
         */
        me.setSession = function(session){
            me.session = session;
        };

        /**
         * Recupera a sessão aberta para o usuário.
         *
         * @returns {*}
         */
        me.getSession = function(){
            return me.session;
        };

        /**
         * Seta o menu de navegação principal do sistema.
         *
         * @param menu
         */
        me.setMenu = function(menu){
            me.menu = menu;
        };


        /**
         * Função que encerra a sessão aberta para o usuário.
         *
         * @param {Function} callback
         */
        me.logout = function(callback){
            $http.post(UI.url + 'sessao/sessao/logout', {}).then(function(response){
                if (response.data.success) {
                    callback();
                }
            })
        };

        return me;
    }

}());