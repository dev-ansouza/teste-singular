(function()
{
    'use strict';

    /**
     * Controlador responsável pela modal criação de um novo controlador.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.builder').controller(
        'builder.FrontControladorModalCtrl',
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
         * Tipos de controladores.
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
         * Objeto do controlador.
         *
         * @type {object}
         */
        $scope.controlador = {
            dir: Builder.selected,
            modulo: getNomeModulo(Builder.selected)
        };

        $scope.forms = {};

        /**
         * Salva o registro do novo modulo.
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