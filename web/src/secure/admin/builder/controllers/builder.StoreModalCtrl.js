(function()
{
    'use strict';

    /**
     * Controlador responsável pela modal criação de um novo store.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.builder').controller(
        'builder.StoreModalCtrl',
        [
             '$scope'
            ,'$uibModalInstance'
            ,'toastr'
            ,'$sngApi'
            ,Controller
        ]
    );

    /**
     * Função de definição do controlador.
     *
     * @param $scope
     * @param $uibModalInstance
     * @param toastr
     * @param $sngApi
     * @constructor
     */
    function Controller(
         $scope
        ,$uibModalInstance
        ,toastr
        ,$sngApi
    ) {

        /**
         * Api de comunicação com o controlador de pacote no backend.
         *
         * @type {$sngApi}
         */
        $scope.pacoteApi = $sngApi('builder/pacote');

        /**
         * Api de comunicação com o controlador de store no backend.
         *
         * @type {$sngApi}
         */
        $scope.storeApi = $sngApi('builder/store');

        /**
         * Objeto do store.
         *
         * @type {object}
         */
        $scope.store = {};

        /**
         * Inicializa o controlador.
         */
        $scope.onInit = function(){
            $scope.pacoteApi.find().then(function(results){
                $scope.listaPacotes = results;
            });
        };

        /**
         * Salva o registro do novo store.
         */
        $scope.createStore = function() {
            // marca que o formulário já foi submetido
            $scope.isSubmited = true;

            if (!$scope.forms.store.$invalid) {
                $scope.isSaving = true;
                $scope.storeApi.call('create',$scope.store).then(function(response){
                    $scope.isSaving = false;

                    if (!response.success) {
                        toastr.error('Já existe um store registrado com este nome!');
                    } else {
                        toastr.success('Store criado com sucesso!');
                        $scope.close();
                    }
                });
            } else {
                toastr.error('Verifique o preenchimento dos campos destacados!');
            }
        };

        /*
         Fecha o modal em modo de cancelamento
         */
        $scope.cancel = function(){
            $uibModalInstance.dismiss();
        };

        $scope.close = function(){
            $uibModalInstance.close();
        };

        $scope.onInit();
    }

}());