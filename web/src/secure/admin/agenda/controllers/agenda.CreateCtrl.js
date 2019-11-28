(function()
{
    'use strict';

    /**
     * Controlador responsável pela criação de cliente para a agenda.
     *
     * @author Arthur Nunes <arthurnx98@gmail.com>
     */
    angular.module('admin.agenda').controller(
        'agenda.CreateCtrl',
        [
            '$scope'
            ,'toastr'
            ,'agenda.AgendaService'
            ,Controller
        ]
    );

    /**
     * Função de definição do controlador.
     *
     * @param $scope
     * @param toastr
     * @param AgendaService
     * @constructor
     */
    function Controller(
         $scope
        ,toastr
        ,AgendaService
    ) {

        /**
         * Define que o formulário está em processo de criação.
         *
         * @type {boolean}
         */
        $scope.viewState = 'create';

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
         * Registro do usuário que está sendo criado.
         *
         * @type {object}
         */
        $scope.record = {};

        /**
         * Inicialização do controlador.
         */
        $scope.onInit = function(){

        };

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

                        toastr.success('Cliente inserido a agenda com sucesso!');

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