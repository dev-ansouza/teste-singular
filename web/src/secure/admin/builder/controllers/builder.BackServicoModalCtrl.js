(function()
{
    'use strict';

    /**
     * Controlador responsável pela modal criação de um novo serviço.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.builder').controller(
        'builder.BackServicoModalCtrl',
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
         * Api de comunicação com o controlador de serviço no backend.
         *
         * @type {$sngApi}
         */
        $scope.servicoApi = $sngApi('builder/back_servico');

        /**
         * Objeto do serviço.
         *
         * @type {object}
         */
        $scope.servico = {};

        /**
         * Inicializa o controlador.
         */
        $scope.onInit = function(){
            $scope.pacoteApi.find().then(function(results){
                $scope.listaPacotes = results;
            });
        };

        /**
         * Salva o registro do novo serviço.
         */
        $scope.createServico = function() {
            // marca que o formulário já foi submetido
            $scope.isSubmited = true;

            if (!$scope.forms.servico.$invalid) {
                $scope.isSaving = true;
                $scope.servicoApi.call('create',$scope.servico).then(function(response){
                    $scope.isSaving = false;

                    if (!response.success) {
                        toastr.error('Já existe um serviço registrado com este nome!');
                    } else {
                        toastr.success('Serviço criado com sucesso!');
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