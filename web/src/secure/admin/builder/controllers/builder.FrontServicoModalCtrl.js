(function()
{
    'use strict';

    /**
     * Servico responsável pela modal criação de um novo módulo.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.builder').controller(
        'builder.FrontServicoModalCtrl',
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
     * Função de definição do servico.
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
         * Api de comunicação com o servico de modulo no backend.
         *
         * @type {$sngApi}
         */
        $scope.moduloApi = $sngApi('builder/modulo');

        /**
         * Tipos de servicoes.
         *
         * @type {array}
         */
        $scope.tipos = [
            {id: 'common', display: 'Comum'},
            {id: 'list', display: 'Lista'},
            {id: 'form', display: 'Formulário'},
            {id: 'modal', display: 'Modal'}
        ];

        /**
         * Objeto do servico.
         *
         * @type {object}
         */
        $scope.servico = {
            dir: Builder.selected,
            modulo: getNomeModulo(Builder.selected)
        };

        $scope.forms = {};

        /**
         * Salva o registro do novo modulo.
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

        /**
         * Recupera o namespace do módulo.
         *
         * @param path
         */
        function getNomeModulo(path) {
            path = path.split('\\').join('/');
            var parts = path.split('/');

            if (parts.length > 1) {
                var namespace = parts[parts.length -2];

                if (namespace == "") {
                    namespace = "app";
                }

                return  namespace + '.' + parts[parts.length - 1];
            } else {
                return 'app.' + parts[0];
            }
        }
    }

}());