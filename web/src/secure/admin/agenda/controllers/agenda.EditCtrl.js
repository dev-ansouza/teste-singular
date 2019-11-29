(function()
{
    'use strict';

    /**
     * Controlador responsável pela edição de cliente.
     *
     * @author Arthur Nunes <arthurnx98@gmail.com>
     */
    angular.module('admin.agenda').controller(
        'agenda.EditCtrl',
        [
            '$scope'
            ,'toastr'
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
     * @param toastr
     * @param $state
     * @param $stateParams
     * @param AgendaService
     * @constructor
     */
    function Controller(
        $scope
        ,toastr
        ,$state
        ,$stateParams
        ,AgendaService
    ) {

        /**
         * Define que o formulário está em processo de edição.
         *
         * @type {boolean}
         */
        $scope.viewState = 'edit';

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

        /**
         * Salva o registro de um novo cliente.
         */
        $scope.save = function() {

            //Marca que o formulário já foi submetido
            $scope.isSubmited = true;

            if (!$scope.forms.cliente.$invalid) {

                $scope.isSaving = true;

                $scope.api.save($scope.record).then(function(response) {

                    $scope.isSaving = false;

                    if (!response.success) {

                        toastr.error('Houve um erro ao salvar');

                    } else {

                        toastr.success('Cliente atualizado com sucesso!');

                        $state.go('app.agenda-list');

                    }

                });

            } else {

                toastr.error('Verifique o preenchimento dos campos destacados!');
            }
        };

        $scope.onInit();
    }

}());