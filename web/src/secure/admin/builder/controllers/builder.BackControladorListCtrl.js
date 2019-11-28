(function()
{
    'use strict';

    /**
     * Controlador responsável por controlar a aba de controlador de backend do build.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.builder').controller(
        'builder.BackControladorListCtrl',
        [
            '$scope'
            ,'$state'
            ,'$stateParams'
            ,'$uibModal'
            ,'SweetAlert'
            ,'toastr'
            ,'$sngApi'
            ,'builder.BuilderService'
            ,Controller
        ]
    );

    /**
     * Função de definição do controlador.
     *
     * @param $scope
     * @param $state
     * @param $stateParams
     * @param $uibModal
     * @param SweetAlert
     * @param toastr
     * @param $sngApi
     * @param Builder
     * @constructor
     */
    function Controller(
         $scope
        ,$state
        ,$stateParams
        ,$uibModal
        ,SweetAlert
        ,toastr
        ,$sngApi
        ,Builder
    ) {
        /**
         * Api de comunicação com o controlador de controlador no backend.
         *
         * @type {$sngApi}
         */
        $scope.controladorApi = $sngApi('builder/back_controlador');

        /**
         * Lista de controladores da aplicação.
         *
         * @type {Array}
         */
        $scope.controladores = [];

        /**
         * Referência ao serviço de builder.
         *
         * @type {Object}
         */
        $scope.Builder = Builder;

        /**
         * Inicialização do controlador.
         */
        $scope.onInit = function(){
            loadControladores();
        };

        /**
         * Abre a modal de criação de pacote.
         */
        $scope.abreModalControlador = function () {

            var modal = $uibModal.open({
                templateUrl: 'src/secure/admin/builder/views/backend.controlador.modal.html',
                controller: 'builder.BackControladorModalCtrl',
                size: 'md',
                scope: $scope
            });

            modal.result.then(function (rec) {
                loadControladores();
            });

        };

        /**
         * Carrega os controladores da aplicação.
         */
        function loadControladores(){
            $scope.controladorApi.find().then(function(results){
                $scope.controladores = results;
            });
        }

        $scope.onInit();
    }

}());