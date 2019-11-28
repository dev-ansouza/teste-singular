(function()
{
    'use strict';

    /**
     * Controlador responsável pela modal criação de um novo módulo.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.builder').controller(
        'builder.ModuloModalCtrl',
        [
             '$scope'
            ,'$uibModalInstance'
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
     * @param $uibModalInstance
     * @param toastr
     * @param $sngApi
     * @param BuilderService
     * @constructor
     */
    function Controller(
         $scope
        ,$uibModalInstance
        ,toastr
        ,$sngApi
        ,Builder
    ) {

        /**
         * Api de comunicação com o controlador de modulo no backend.
         *
         * @type {$sngApi}
         */
        $scope.moduloApi = $sngApi('builder/modulo');

        /**
         * Objeto do modulo.
         *
         * @type {object}
         */
        $scope.modulo = {
            dir: Builder.selected
        };

        /**
         * Salva o registro do novo modulo.
         */
        $scope.createModulo = function() {
            // marca que o formulário já foi submetido
            $scope.isSubmited = true;

            if (!$scope.forms.modulo.$invalid) {
                $scope.isSaving = true;
                $scope.moduloApi.call('create',$scope.modulo).then(function(response){
                    $scope.isSaving = false;

                    if (!response.success) {
                        toastr.error('Já existe um módulo registrado com este nome!');
                    } else {
                        toastr.success('Módulo criado com sucesso!');
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

    }

}());