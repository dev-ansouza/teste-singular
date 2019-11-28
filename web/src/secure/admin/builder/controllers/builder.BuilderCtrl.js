(function()
{
    'use strict';

    /**
     * Controlador responsável por funcionalidade da aplicação.
     *
     * @author Author <author@email.com>
     */
    angular.module('admin.builder').controller(
        'builder.BuilderCtrl',
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
     * @param $modal
     * @param SweetAlert
     * @param toastr
     * @param $sngApi
     * @constructor
     */
    function Controller(
         $scope
        ,$state
        ,$stateParams
        ,$modal
        ,SweetAlert
        ,toastr
        ,$sngApi
    ) {
        /**
         * Página ativa do builder.
         *
         * @type {string}
         */
        $scope.currentPage = 'backend.pacote';

        /**
         * Inicialização do controlador.
         */
        $scope.onInit = function(){

        };

        $scope.getCurrentView = function(){
            return 'src/secure/admin/builder/views/' + $scope.currentPage + '.html';
        };

        $scope.changePage = function(page){
            $scope.currentPage = page;
        };

        $scope.onInit();
    }

}());