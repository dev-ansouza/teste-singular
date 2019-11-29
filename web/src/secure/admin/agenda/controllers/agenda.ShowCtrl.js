(function()
{
    'use strict';

    /**
     * Controlador responsável pela visualização do cliente.
     *
     * @author Arthur Nunes <arthurnx98@gmail.com>
     */
    angular.module('admin.agenda').controller(
        'agenda.ShowCtrl',
        [
            '$scope'
            ,'$state'
            ,'$stateParams'
            ,'agenda.AgendaService'
            ,Controller
        ]
    );

    /**
     * Função de definição do controlador.
     *
     * @param $scope
     * @param $state
     * @param $stateParams
     * @param AgendaService
     * @constructor
     */
    function Controller(
        $scope
        ,$state
        ,$stateParams
        ,AgendaService
    ) {

        /**
         * Define que o formulário está em processo de visualização.
         *
         * @type {boolean}
         */
        $scope.viewState = 'show';

        /**
         * Referência ao serviço de agenda.
         *
         * @type {agenda.AgendaService}
         */
        $scope.api = AgendaService.api;
        
        /**
         * Formulários da view de cliente.
         *
         * @type {object}
         */
        $scope.forms = {
            cliente: {}
        };

        /**
         * Variável de validação da exibição do formulário.
         *
         * @type {boolean}
         */
        $scope.hasRecord = true;

        /**
         * Armazena o ID do cliente
         */
        var id = $stateParams.id;

        /**
         * Inicialização do controlador.
         */
        $scope.onInit = function(){

            getCliente();
        };

        /**
         * Função responsável por buscar o cliente pelo id
         */
        function getCliente() {
            $scope.api.filter({id: $stateParams.id}).call('find').then(function (response) {
                $scope.record = response.results[0];
            })
        }

        $scope.onInit();
    }

}());