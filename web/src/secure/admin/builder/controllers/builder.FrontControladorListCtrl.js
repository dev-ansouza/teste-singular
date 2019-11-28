(function()
{
    'use strict';

    /**
     * Controlador responsável pela listagem de controladores de frontend do builder.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.builder').controller(
        'builder.FrontControladorListCtrl',
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
         * Api de comunicação com o controlador módulo no backend.
         *
         * @type {$sngApi}
         */
        $scope.moduloApi = $sngApi('builder/modulo');

        /**
         * Api de comunicação com o controlador FrontControlador no backend.
         *
         * @type {$sngApi}
         */
        $scope.controladorApi = $sngApi('builder/front_controlador');

        /**
         * Referência ao serviço do Builder.
         *
         * @type {Object}
         */
        $scope.Builder = Builder;

        /**
         * Inicialização do controlador.
         */
        $scope.onInit = function(){
            loadModulos(Builder.selected);
            loadControladores();
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
        $scope.abreModalControlador = function () {

            var modal = $uibModal.open({
                templateUrl: 'src/secure/admin/builder/views/frontend.controlador.modal.html',
                controller: 'builder.FrontControladorModalCtrl',
                size: 'md',
                scope: $scope
            });

            modal.result.then(function (rec) {
                loadControladores(Builder.selected);
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
                loadControladores();
                Builder.parents = response.results;
            });
        }

        /**
         * Carrega os controladores de frontend da aplicação.
         */
        function loadControladores() {

            $scope.controladorApi.call('find',{path: Builder.selected}).then(function(response){
                $scope.controladores = response.results;
            });
        }

        $scope.onInit();
    }

}());