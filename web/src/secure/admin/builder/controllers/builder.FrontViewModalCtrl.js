(function()
{
    'use strict';

    /**
     * View responsável pela modal criação de uma view.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.builder').controller(
        'builder.FrontViewModalCtrl',
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
     * Função de definição do view.
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
         * Api de comunicação com o view de modulo no backend.
         *
         * @type {$sngApi}
         */
        $scope.moduloApi = $sngApi('builder/modulo');

        /**
         * Tipos de views.
         *
         * @type {array}
         */
        $scope.tipos = [
            {id: 'list', display: 'Lista'},
            {id: 'form', display: 'Formulário'},
            {id: 'tab', display: 'Tab'},
            {id: 'modal', display: 'Modal'},
            {id: 'filter', display: 'Filter'}
        ];

        /**
         * Objeto do view.
         *
         * @type {object}
         */
        $scope.view = {
            dir: Builder.selected
        };

        $scope.forms = {};

        /**
         * Salva o registro do novo modulo.
         */
        $scope.createView = function() {
            // marca que o formulário já foi submetido
            $scope.isSubmited = true;

            if (!$scope.forms.view.$invalid) {
                $scope.isSaving = true;
                $scope.viewApi.call('create',$scope.view).then(function(response){
                    $scope.isSaving = false;

                    if (!response.success) {
                        toastr.error('Já existe uma view registrada com este nome!');
                    } else {
                        toastr.success('View criada com sucesso!');
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