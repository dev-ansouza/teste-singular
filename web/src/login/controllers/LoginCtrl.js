(function()
{
    'use strict';

    /**
     * Controlador responsável  pela tela de login do sistema.
     *
     * @author Otávio Fernandes <otavio@neton.com.br>
     */
    angular.module('app.login').controller(
        'login.LoginCtrl',
        [
            '$scope',
            'toastr',
            'login.Login',
            '$mdToast',
            'UI',
            LoginCtrl
        ]
    );

    /**
     * Função de definição do controlador.
     *
     * @param $scope
     * @param toastr
     * @param Login
     * @param $mdToast
     * @constructor
     */
    function LoginCtrl(
        $scope,
        toastr,
        Login,
        $mdToast,
        UI
    ) {

        /**
         * Configurações da aplicação.
         *
         * @type {object}
         */
        $scope.appSettings = UI;

        /**
         * Variável utilizada para desabilitar o botão enquanto espera pelo carregamento.
         *
         * @type {boolean}
         */
        $scope.waiting = false;

        /**
         * Efetua a validação da autenticação do usuário.
         */
        $scope.login = function() {

            $scope.waiting = true;

            Login.requestLogin($scope.user, function(response){
                $scope.waiting = false;

                if (response.code == 200) {
                    self.location.reload();
                } else {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Usuário ou senha inválidos!')
                            .position('top right')
                            .hideDelay(3000)
                    );
                }

            })
        }
    }

}());