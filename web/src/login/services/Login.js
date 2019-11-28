(function()
{
   'use strict';

    /**
     * Serviço que fornece api para autenticação do usuário.
     *
     * @author Otávio Fernandes <otavio@neton.com.br>
     */
    angular.module('app.login').factory(
        'login.Login',
        [
            '$http',
            'UI',
            LoginService
        ]
    );

    /**
     * Função de definição do serviço.
     *
     * @param $http
     * @param UI
     * @returns {LoginService}
     * @constructor
     */
    function LoginService(
        $http,
        UI
    ) {
        var me = this;

        /**
         * Função que faz o login.
         *
         * @param {Object}   data
         * @param {Function} callback
         */
        me.requestLogin = function(data, callback){
            $http.post('sessao/sessao/login', data).then(function(response){
                callback(response.data);
            })
        };

        return me;
    }


}());