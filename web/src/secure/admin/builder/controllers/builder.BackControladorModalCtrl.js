(function()
{
    'use strict';

    /**
     * Controlador responsável pela modal criação de um novo controlador.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.builder').controller(
        'builder.BackControladorModalCtrl',
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
         * Api de comunicação com o controlador de pacote de acesso no backend.
         *
         * @type {$sngApi}
         */
        $scope.pacoteApi = $sngApi('builder/pacote');

        /**
         * Api de comunicação com o controlador de controlador no backend.
         *
         * @type {$sngApi}
         */
        $scope.controladorApi = $sngApi('builder/back_controlador');

        /**
         * Objeto do controlador.
         *
         * @type {object}
         */
        $scope.controlador = {};

        /**
         * Inicializa o controlador.
         */
        $scope.onInit = function(){
            $scope.pacoteApi.find().then(function(results){
                $scope.listaPacotes = results;
            });
        };

        /**
         * Salva o registro do novo controlador.
         */
        $scope.createControlador = function() {
            // marca que o formulário já foi submetido
            $scope.isSubmited = true;

            if (!$scope.forms.controlador.$invalid) {
                $scope.isSaving = true;
                $scope.controladorApi.call('create',$scope.controlador).then(function(response){
                    $scope.isSaving = false;

                    if (!response.success) {
                        toastr.error('Já existe um controlador registrado com este nome!');
                    } else {
                        toastr.success('Controlador criado com sucesso!');
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