(function()
{
    'use strict';

    /**
     * Controlador responsável pela tela de definição de permissões do sistema.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.menu').controller(
        'menu.MenuCtrl',
        [
             '$scope'
            ,'$uibModal'
            ,'toastr'
            ,'$sngApi'
            ,Controller
        ]
    );

    /**
     * Função de definição do controlador.
     *
     * @param $scope
     * @param $uibModal
     * @param toastr
     * @param $sngApi
     * @constructor
     */
    function Controller(
         $scope
        ,$uibModal
        ,toastr
        ,$sngApi
    ) {
        /**
         * Api de comunicação com o controlador de aplicação.
         *
         * @type {$sngApi}
         */
        $scope.aplicacaoApi = $sngApi('sessao/aplicacao');

        /**
         * Api de comunicação com o controlador de módulo.
         *
         * @type {$sngApi}
         */
        $scope.moduloApi = $sngApi('sessao/modulo');

        /**
         * Objeto de referência da aplicação.
         *
         * @type {Object}
         */
        $scope.aplicacao = null;

        /**
         * Referência a relação de módulos de uma aplicação.
         *
         * @type {Array}
         */
        $scope.listaModulo = [];

        /**
         * Inicialização do controlador.
         */
        $scope.onInit = function() {
            reloadAplicacoes();
        };

        /**
         * Seleciona a aplicação e carrega os módulos vinculados a ela.
         *
         * @param {string} app
         */
        $scope.onSelectAplicacao = function(app){
            $scope.aplicacao = app;
            reloadModulos(app.id);
        };

        /**
         * Abre a modal de criar aplicação.
         */
        $scope.abreModalCriarAplicacao = function () {

            var modal = $uibModal.open({
                templateUrl: 'src/secure/admin/menu/views/aplicacao.modal.html',
                controller: 'menu.ModalAplicacaoCreateCtrl',
                size: 'md',
                scope: $scope
            });

            modal.result.then(function (rec) {
                reloadAplicacoes();
            });

        };

        /**
         * Abre a modal de editar a aplicação.
         */
        $scope.abreModalEditarAplicacao = function () {

            var modal = $uibModal.open({
                templateUrl: 'src/secure/admin/menu/views/aplicacao.modal.html',
                controller: 'menu.ModalAplicacaoEditCtrl',
                size: 'md',
                scope: $scope,
                resolve: {
                    record: function(){
                        var r = angular.copy($scope.aplicacao);
                        r.ordem = parseInt(r.ordem);
                        return r;
                    }
                }
            });

            modal.result.then(function (rec) {
                $scope.aplicacao = rec;
                reloadAplicacoes();
            });

        };

        /**
         * Remove a aplicação selecionada.
         */
        $scope.removerAplicacao = function() {
            $scope.aplicacaoApi.remove($scope.aplicacao.id, function(response){
                reloadAplicacoes();
                $scope.listaModulo = [];
                $scope.aplicacao = null;
            }, 'Atenção','Deseja realmente excluir esta aplicação?');
        };

        /**
         * Abre a modal de criar módulo.
         */
        $scope.abreModalCriarModulo = function () {

            var modal = $uibModal.open({
                templateUrl: 'src/secure/admin/menu/views/modulo.modal.html',
                controller: 'menu.ModalModuloCreateCtrl',
                size: 'md',
                scope: $scope
            });

            modal.result.then(function (rec) {
                reloadModulos($scope.aplicacao.id);
            });

        };

        /**
         * Abre a modal de editar o módulo.
         *
         * @param {object} modulo
         */
        $scope.abreModalEditarModulo = function (modulo) {

            var modal = $uibModal.open({
                templateUrl: 'src/secure/admin/menu/views/modulo.modal.html',
                controller: 'menu.ModalModuloEditCtrl',
                size: 'md',
                scope: $scope,
                resolve: {
                    record: function(){
                        var r = angular.copy(modulo);
                        r.ordem = parseInt(r.ordem);
                        return r;
                    }
                }
            });

            modal.result.then(function (rec) {
                reloadModulos($scope.aplicacao.id);
            });
        };

        /**
         * Remove o módulo selecionado.
         */
        $scope.removerModulo = function(id) {
            $scope.moduloApi.remove(id, function(response){
                reloadModulos($scope.aplicacao.id);
            }, 'Atenção','Deseja realmente excluir este módulo?');
        };

        /**
         * Renderiza o status do módulo.
         *
         * @param status
         * @return {string}
         */
        $scope.renderAtivo = function(status){
            switch (status) {
                case '1':
                    return 'Sim';
                    break;
                case '0':
                    return 'Não';
                    break;
            }
        };

        /**
         * Função que recarrega a lista de aplicações.
         */
        function reloadAplicacoes() {
            $scope.aplicacaoApi.find().then(function(results) {
                $scope.listaAplicacao = results;
            });
        }

        /**
         * Recarrega os módulos vinculados a uma aplicação.
         *
         * @param {string} aplicacaoId
         */
        function reloadModulos(aplicacaoId) {
            console.log('aqui');
            $scope.moduloApi.filter({aplicacao_id: aplicacaoId}).find('t.ordem').then(function(results){
                console.log(results);
                $scope.listaModulo = results;
            });
        }

        $scope.onInit();
    }

}());