(function()
{
    'use strict';

    /**
     * Servico responsável pela listagem de serviços de frontend do builder.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.builder').controller(
        'builder.FrontServicoListCtrl',
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
     * Função de definição do servico.
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
         * Api de comunicação com o servico módulo no backend.
         *
         * @type {$sngApi}
         */
        $scope.moduloApi = $sngApi('builder/modulo');

        /**
         * Api de comunicação com o servico FrontServico no backend.
         *
         * @type {$sngApi}
         */
        $scope.servicoApi = $sngApi('builder/front_servico');

        /**
         * Referência ao serviço do Builder.
         *
         * @type {Object}
         */
        $scope.Builder = Builder;

        /**
         * Inicialização do servico.
         */
        $scope.onInit = function(){
            loadModulos(Builder.selected);
            loadServicos();
        };

        /**
         * Seleciona um nó módulo.
         *
         * @param module
         */
        $scope.selectModulo = function(module){
            loadModulos(module);
        };

        /**
         * Abre a modal de criação de pacote.
         */
        $scope.abreModalServico = function () {

            var modal = $uibModal.open({
                templateUrl: 'src/secure/admin/builder/views/frontend.servico.modal.html',
                controller: 'builder.FrontServicoModalCtrl',
                size: 'md',
                scope: $scope
            });

            modal.result.then(function (rec) {
                loadServicos(Builder.selected);
            });

        };

        /**
         * Carrega os módulos da aplicação.
         *
         * @param {object} modulo
         */
        function loadModulos(modulo) {
            var path = modulo || '';

            if (typeof modulo == 'object') {
                path = modulo.parent + '/' + modulo.name;
            }

            $scope.moduloApi.call('find',{path: path}).then(function(response){
                if (response.results[response.results.length-1].childs) {
                    $scope.modulos = response.results[response.results.length-1].childs;
                } else {
                    $scope.modulos = [];
                }

                Builder.selected = path;
                loadServicos();
                Builder.parents = response.results;
            });
        }

        /**
         * Carrega os servicos de frontend da aplicação.
         */
        function loadServicos() {

            $scope.servicoApi.call('find',{path: Builder.selected}).then(function(response){
                $scope.servicos = response.results;
            });
        }

        $scope.onInit();
    }

}());