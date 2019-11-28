(function()
{
    'use strict';

    /**
     * Controlador responsável por controlar a aba de stores de backend do build.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.builder').controller(
        'builder.StoreListCtrl',
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
     * @param BuilderService
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
         * Api de comunicação com o controlador de store no backend.
         *
         * @type {$sngApi}
         */
        $scope.storeApi = $sngApi('builder/store');

        /**
         * Lista de stores da aplicação.
         *
         * @type {Array}
         */
        $scope.stores = [];

        /**
         * Referência ao serviço de Builder.
         *
         * @type {Object}
         */
        $scope.Builder = Builder;

        /**
         * Inicialização do controlador.
         */
        $scope.onInit = function(){
            loadServicos();
        };

        /**
         * Abre a modal de criação de pacote.
         */
        $scope.abreModalStore = function () {

            var modal = $uibModal.open({
                templateUrl: 'src/secure/admin/builder/views/backend.store.modal.html',
                controller: 'builder.StoreModalCtrl',
                size: 'md',
                scope: $scope
            });

            modal.result.then(function (rec) {
                loadServicos();
            });

        };

        /**
         * Carrega os stores da aplicação.
         */
        function loadServicos(){
            $scope.storeApi.find().then(function(results){
                $scope.stores = results;
            });
        }

        $scope.onInit();
    }

}());