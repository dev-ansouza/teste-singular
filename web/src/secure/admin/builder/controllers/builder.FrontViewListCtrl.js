(function()
{
    'use strict';

    /**
     * View responsável pela listagem de views de frontend do builder.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.builder').controller(
        'builder.FrontViewListCtrl',
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
     * Função de definição do view.
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
         * Api de comunicação com o view módulo no backend.
         *
         * @type {$sngApi}
         */
        $scope.moduloApi = $sngApi('builder/modulo');

        /**
         * Api de comunicação com o view FrontView no backend.
         *
         * @type {$sngApi}
         */
        $scope.viewApi = $sngApi('builder/front_view');

        /**
         * Referência ao serviço do Builder.
         *
         * @type {Object}
         */
        $scope.Builder = Builder;

        /**
         * Inicialização do view.
         */
        $scope.onInit = function(){
            loadModulos(Builder.selected);
            loadViews();
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
        $scope.abreModalView = function () {

            var modal = $uibModal.open({
                templateUrl: 'src/secure/admin/builder/views/frontend.view.modal.html',
                controller: 'builder.FrontViewModalCtrl',
                size: 'md',
                scope: $scope
            });

            modal.result.then(function (rec) {
                loadViews(Builder.selected);
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
                loadViews();
                Builder.parents = response.results;
            });
        }

        /**
         * Carrega os views de frontend da aplicação.
         */
        function loadViews() {

            $scope.viewApi.call('find',{path: Builder.selected}).then(function(response){
                $scope.views = response.results;
            });
        }

        $scope.onInit();
    }

}());