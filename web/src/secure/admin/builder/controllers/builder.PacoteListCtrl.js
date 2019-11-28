(function()
{
    'use strict';

    /**
     * Controlador responsável por funcionalidade da aplicação.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.builder').controller(
        'builder.PacoteListCtrl',
        [
            '$scope'
            ,'$state'
            ,'$stateParams'
            ,'$uibModal'
            ,'SweetAlert'
            ,'toastr'
            ,'$sngApi'
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
    ) {
        /**
         * Api de comunicação com o controlador pacote no backend.
         *
         * @type {$sngApi}
         */
        $scope.pacoteApi = $sngApi('builder/pacote');

        /**
         * Pacote.
         *
         * @type {Object}
         */
        $scope.pacote = {};

        /**
         * Inicialização do controlador.
         */
        $scope.onInit = function(){
            loadPacotes();
        };

        /**
         * Habilita um pacote.
         *
         * @param {string} pacote
         */
        $scope.enablePacote = function(pacote){
            $scope.pacoteApi.call('enable',{name: pacote}).then(function(){
                toastr.success('Pacote habilitado!');
                loadPacotes();
            });
        };

        /**
         * Desabilita um pacote.
         *
         * @param {string} pacote
         */
        $scope.disablePacote = function(pacote){
            $scope.pacoteApi.call('disable',{name: pacote}).then(function(){
                toastr.success('Pacote desabilitado!');
                loadPacotes();
            });
        };

        /**
         * Abre a modal de criação de pacote.
         */
        $scope.abreModalPacote = function () {

            var modal = $uibModal.open({
                templateUrl: 'src/secure/admin/builder/views/backend.pacote.modal.html',
                controller: 'builder.PacoteModalCtrl',
                size: 'md',
                scope: $scope
            });

            modal.result.then(function (rec) {
                loadPacotes();
            });

        };

        /**
         * Carrega os pacotes da aplicação.
         */
        function loadPacotes(){
            $scope.pacoteApi.find().then(function(results){
                $scope.pacotes = results;
            });
        }

        $scope.onInit();
    }

}());