(function()
{
    'use strict';

    /**
     * Controlador responsável  pela tela de login do sistema.
     *
     * @author Otávio Fernandes <otavio@neton.com.br>
     */
    angular.module('app.login').controller(
        'login.SenhaCtrl',
        [
            '$scope',
            'toastr',
            'login.Login',
            '$mdToast',
            'UI',
            SenhaCtrl
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
    function SenhaCtrl(
        $scope,
        toastr,
        Login,
        $mdToast,
        UI
    ) {

        $scope.appSettings = UI;
        
    }

}());